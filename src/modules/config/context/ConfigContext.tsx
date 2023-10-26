import { Dispatch, createContext, useReducer, useState, useEffect } from "react"
import { Config, FileConfigOption } from "../interfaces/config.iterface"
import { configReducer } from "../reducer"
import { ConfigPayload } from "../reducer/config_reducer"
import { useErrorBoundary } from "react-error-boundary"
import { useConfigServices } from "../services"

interface Props {
  fileConfig: Array<FileConfigOption>
  config: Config
  configDispatch: Dispatch<ConfigPayload>
  loading: boolean
}

const ConfigContext = createContext<Props>({} as Props)

const ConfigProvider = ({ children }: { children: React.ReactElement }) => {
  const [fileConfig, setFileConfig] = useState<Array<FileConfigOption>>([])
  const [loading, setLoading] = useState(false)

  const { getFileOptions } = useConfigServices()
  const { showBoundary } = useErrorBoundary()

  const [config, configDispatch] = useReducer(configReducer, {
    file: { fileType: "", arguments: {} },
    saveSchema: null,
  })

  useEffect(() => {
    setLoading(true)

    getFileOptions({
      onSuccess: (data) => {
        setFileConfig(data)
      },
      onError: (error) => {
        showBoundary(error)
      },
      onFinally: () => {
        setLoading(false)
      },
    })
  }, [])

  const data: Props = { fileConfig, config, configDispatch, loading }

  return <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
}

export { ConfigContext, ConfigProvider }
