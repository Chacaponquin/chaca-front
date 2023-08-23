import { useContext, useEffect, useState, useMemo } from "react"
import { SOCKET_EVENTS } from "../constants"
import { DatasetsContext } from "@modules/datasets/context"
import { useConfigServices } from "@modules/config/services"
import io from "socket.io-client"
import { ModalContext } from "@modules/modal/context"
import { MODAL_ACTIONS } from "@modules/modal/constants"
import { userServices } from "@modules/user/services"
import { useLanguage } from "@modules/app/modules/language/hooks"
import { useToastServices } from "@modules/app/modules/toast/services"
import { useEnvServices } from "@modules/app/modules/env/services"

export const useHome = () => {
  const { datasets, config, selectedDataset } = useContext(DatasetsContext)
  const { resetConfig } = useConfigServices()
  const { getTokenCookie } = userServices()
  const { handleOpenModal } = useContext(ModalContext)
  const { toastError } = useToastServices()
  const { API_ROUTE } = useEnvServices()

  const { NETWORK_ERROR, CREATION_ERROR } = useLanguage({
    NETWORK_ERROR: { en: "Network connect error", es: "Error en la conexion" },
    CREATION_ERROR: { en: "Creation error", es: "Hubo un error en la creación de los datasets" },
  })

  const [createDataLoading, setCreateDataLoading] = useState(false)

  const socket = useMemo(
    () =>
      io(API_ROUTE, {
        auth: {
          token: `Bearer ${getTokenCookie()}`,
        },
      }),
    [],
  )

  useEffect(() => {
    socket.on(SOCKET_EVENTS.CONNECT_ERROR, () => {
      setTimeout(() => socket.connect(), 5000)
    })

    // evento cuando se termine la creacion de los datasets
    socket.on(SOCKET_EVENTS.GET_FILE_URL, (downUrl) => {
      // abrir el link de descarga
      window.open(`${API_ROUTE}/${downUrl}`)
      // cerrar el modal de creation loading
      setCreateDataLoading(false)
      // resetear la configuracion de exportacion
      resetConfig()
    })

    socket.on(SOCKET_EVENTS.CREATION_ERROR, () => {
      toastError(CREATION_ERROR)
      setCreateDataLoading(false)
    })

    return () => {
      socket.off(SOCKET_EVENTS.GET_FILE_URL)
      socket.off(SOCKET_EVENTS.CREATION_ERROR)
      socket.off(SOCKET_EVENTS.CONNECT)
      socket.off(SOCKET_EVENTS.DISCONNECT)
    }
  }, [socket])

  const handleExportAllDatasets = async () => {
    if (socket.connected) {
      setCreateDataLoading(true)

      socket.emit(SOCKET_EVENTS.CREATE_DATASETS, {
        datasets: datasets.map((d) => d.getDatasetObject()),
        config,
      })
    } else {
      toastError(NETWORK_ERROR)
      setCreateDataLoading(false)
    }
  }

  const handleExportSelectDataset = () => {
    if (socket.connected) {
      setCreateDataLoading(true)

      socket.emit(SOCKET_EVENTS.CREATE_DATASETS, {
        datasets: [selectedDataset.getDatasetObject()],
        config,
      })
    } else {
      toastError(NETWORK_ERROR)
      setCreateDataLoading(false)
    }
  }

  const handleCreateAllDatasets = () => {
    handleOpenModal({
      type: MODAL_ACTIONS.EXPORT_ALL_DATASETS,
      handleCreateAllDatasets: handleExportAllDatasets,
    })
  }

  const handleCreateSelectDataset = () => {
    handleOpenModal({
      type: MODAL_ACTIONS.EXPORT_SELECT_DATASET,
      handleCreateSelectDataset: handleExportSelectDataset,
    })
  }

  return {
    handleCreateSelectDataset,
    handleCreateAllDatasets,
    createDataLoading,
  }
}
