import { FieldDataType } from "../../interfaces/datasets.interface"
import { DATASETS_ACTIONS } from "../../constants"
import { Reducer } from "react"
import { DatasetTree, FieldNode } from "@modules/shared/classes"
import { NodeInfo } from "@modules/shared/interfaces/tree.interface"
import { FieldInfoDTO } from "@modules/datasets/dto/fieldInfo.dto"

export type DatasetPayload =
  | { type: DATASETS_ACTIONS.DELETE_DATASET; payload: { datasetID: string } }
  | {
      type: DATASETS_ACTIONS.SET_INIT_DATASETS
      payload: { datasets: DatasetTree[] }
    }
  | {
      type: DATASETS_ACTIONS.ADD_NEW_FIELD
      payload: {
        parentFieldID: string
        fieldInfo: NodeInfo<FieldDataType>
        datasetID: string
      }
    }
  | {
      type: DATASETS_ACTIONS.CREATE_NEW_DATASET
      payload: { datasetName: string }
    }
  | {
      type: DATASETS_ACTIONS.EDIT_FIELD
      payload: {
        field: FieldInfoDTO
        datasetID: string
      }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_FIELD_NAME
      payload: { datasetID: string; fieldID: string; newName: string }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_FIELD_DATATYPE
      payload: {
        datasetID: string
        fieldID: string
        dataType: FieldDataType
      }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_DATASET_LIMIT
      payload: { datasetID: string; newLimit: number }
    }
  | {
      type: DATASETS_ACTIONS.DELETE_FIELD
      payload: { datasetID: string; fieldID: string }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_POSIBLE_NULL
      payload: {
        datasetID: string
        fieldID: string
        value: number
      }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_TO_ARRAY_TYPE
      payload: {
        datasetID: string
        fieldID: string
        isArray: boolean
      }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_ARRAY_LIMITS
      payload: {
        datasetID: string
        fieldID: string
        min: number
        max: number
      }
    }
  | {
      type: DATASETS_ACTIONS.CHANGE_DATASET_NAME
      payload: {
        datasetID: string
        newName: string
      }
    }

export const datasetsReducer: Reducer<DatasetTree[], DatasetPayload> = (
  datasets: DatasetTree[],
  action: DatasetPayload,
): DatasetTree[] => {
  switch (action.type) {
    case DATASETS_ACTIONS.EDIT_FIELD: {
      const newDatasets = datasets.map((d) => {
        if (d.id === action.payload.datasetID) {
          const findField = d.findFieldByID(action.payload.field.id)

          if (findField) {
            findField.setName(action.payload.field.name)
            findField.info.isArray = action.payload.field.isArray
            findField.info.isPosibleNull = action.payload.field.isPosibleNull
          }
        }

        return d
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.DELETE_DATASET: {
      return datasets.filter((d) => d.id !== action.payload.datasetID)
    }

    case DATASETS_ACTIONS.SET_INIT_DATASETS: {
      return action.payload.datasets
    }

    case DATASETS_ACTIONS.ADD_NEW_FIELD: {
      // crear nuevo field node
      const newNode = new FieldNode(action.payload.fieldInfo.name, action.payload.fieldInfo)

      const newDatasets = datasets.map((d) => {
        if (d.id === action.payload.datasetID) {
          // si el id del dataset y del parent son iguales significa que se tiene que insertar en el root
          if (action.payload.datasetID === action.payload.parentFieldID) {
            d.insertField(newNode)
          }

          // se busca el parent field y si se encuentra se inserta en nuevo nodo en el
          else {
            const findParent = d.findFieldByID(action.payload.parentFieldID)

            if (findParent) {
              findParent.insertNode(newNode)
            }
          }
        }

        return d
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.CREATE_NEW_DATASET: {
      const dataset = new DatasetTree(action.payload.datasetName, 50)
      return [...datasets, dataset]
    }

    case DATASETS_ACTIONS.CHANGE_FIELD_NAME: {
      const newDatasets = datasets.map((d) => {
        if (d.id === action.payload.datasetID) {
          const foundField = d.findFieldByID(action.payload.fieldID)

          // cambiar nombre del field
          if (foundField) {
            foundField.setName(action.payload.newName)
          }
        }

        return d
      })

      return newDatasets
    }
    case DATASETS_ACTIONS.CHANGE_FIELD_DATATYPE: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          const foundField = dat.findFieldByID(action.payload.fieldID)

          // cambiar dataType del field
          if (foundField) {
            foundField.info.dataType = action.payload.dataType
          }
        }

        return dat
      })

      return newDatasets
    }
    case DATASETS_ACTIONS.CHANGE_DATASET_LIMIT: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          dat.setLimit(action.payload.newLimit)
        }

        return dat
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.DELETE_FIELD: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          // borrar el field
          dat.deleteField(action.payload.fieldID)
        }

        return dat
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.CHANGE_POSIBLE_NULL: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          const foundField = dat.findFieldByID(action.payload.fieldID)

          if (foundField) {
            foundField.info.isPosibleNull = action.payload.value
          }
        }

        return dat
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.CHANGE_TO_ARRAY_TYPE: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          const foundField = dat.findFieldByID(action.payload.fieldID)

          if (foundField) {
            if (action.payload.isArray) foundField.info.isArray = { min: 0, max: 10 }
            else foundField.info.isArray = null
          }
        }

        return dat
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.CHANGE_ARRAY_LIMITS: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          const foundField = dat.findFieldByID(action.payload.fieldID)

          if (foundField) {
            foundField.info.isArray = {
              min: action.payload.min,
              max: action.payload.max,
            }
          }
        }

        return dat
      })

      return newDatasets
    }

    case DATASETS_ACTIONS.CHANGE_DATASET_NAME: {
      const newDatasets = datasets.map((dat) => {
        if (dat.id === action.payload.datasetID) {
          dat.setName(action.payload.newName)
        }

        return dat
      })

      return newDatasets
    }
    default:
      return datasets
  }
}
