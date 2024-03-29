import { Config, FileConfigOption, SaveSchemaValue } from "../interfaces"
import { Reducer } from "react"
import { CONFIG_ACTIONS } from "../constants"

export type ConfigPayload =
  | {
      type: CONFIG_ACTIONS.CHANGE_FILE_TYPE
      payload: {
        file: string
      }
    }
  | {
      type: CONFIG_ACTIONS.CHANGE_SAVE_SCHEMA
      payload: { value: SaveSchemaValue }
    }
  | {
      type: CONFIG_ACTIONS.SET_INITIAL_CONFIG
      payload: { options: FileConfigOption[] }
    }
  | {
      type: CONFIG_ACTIONS.CHANGE_FILE_ARGUMENTS
      payload: {
        field: string
        value: unknown
      }
    }

export const configReducer: Reducer<Config, ConfigPayload> = (
  config: Config,
  action: ConfigPayload,
): Config => {
  switch (action.type) {
    case CONFIG_ACTIONS.CHANGE_FILE_TYPE: {
      return {
        ...config,
        file: {
          fileType: action.payload.file,
          arguments: {},
        },
      }
    }

    case CONFIG_ACTIONS.CHANGE_SAVE_SCHEMA: {
      return { ...config, saveSchema: action.payload.value }
    }

    case CONFIG_ACTIONS.SET_INITIAL_CONFIG: {
      return {
        file: { fileType: action.payload.options[0].id, arguments: {} },
        saveSchema: null,
      }
    }

    case CONFIG_ACTIONS.CHANGE_FILE_ARGUMENTS: {
      const { file } = config

      file.arguments = {
        ...file.arguments,
        [action.payload.field]: action.payload.value,
      }

      return { ...config, file }
    }

    default: {
      return config
    }
  }
}
