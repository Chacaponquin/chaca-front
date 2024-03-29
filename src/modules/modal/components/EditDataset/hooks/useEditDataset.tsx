import { useTranslation } from "@modules/app/modules/language/hooks"
import { useToast } from "@modules/app/modules/toast/hooks"
import { Dataset } from "@modules/datasets/domain/tree"
import { EmptyDatasetNameError, RepeatDatasetNameError } from "@modules/datasets/errors"
import { useDatasets } from "@modules/datasets/hooks"
import { DatasetName } from "@modules/datasets/value-object"
import { useModal } from "@modules/modal/hooks"
import { useState } from "react"

export default function useEditDataset({ dataset }: { dataset: Dataset }) {
  const { handleEditDataset: handleEditDatasetService } = useDatasets()
  const { handleCloseModal } = useModal()
  const { toastError } = useToast()

  const [datasetName, setDatasetName] = useState(dataset.name)
  const [datasetLimit, setDatasetLimit] = useState(dataset.limit)

  function handleDatasetName(name: string) {
    setDatasetName(name)
  }

  function handleChangeLimit(limit: number) {
    setDatasetLimit(limit)
  }

  const { EMPTY_NAME, REPEAT_NAME } = useTranslation({
    REPEAT_NAME: {
      en: "Aldready exists a dataset with that name",
      es: "Ya existe un dataset con ese nombre",
    },
    EMPTY_NAME: {
      en: "The dataset name can not be an empty string",
      es: "El nombre del nuevo dataset no puede estar vacío",
    },
  })

  function handleEditDataset() {
    try {
      handleEditDatasetService({
        datasetId: dataset.id,
        name: new DatasetName(datasetName),
        limit: datasetLimit,
      })

      handleCloseModal()
    } catch (error) {
      if (error instanceof EmptyDatasetNameError) {
        toastError({ message: EMPTY_NAME, id: "empty-dataset-name" })
      } else if (error instanceof RepeatDatasetNameError) {
        toastError({ message: REPEAT_NAME, id: "repeat-dataset-name" })
      }
    }
  }

  return { datasetName, handleDatasetName, handleEditDataset, handleChangeLimit, datasetLimit }
}
