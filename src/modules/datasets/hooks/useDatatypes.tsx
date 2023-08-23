import { DATA_TYPES } from "@modules/schemas/constants"
import {
  CustomDataType,
  EnumDataType,
  MixedDataType,
  RefDataType,
  SequenceDataType,
  SequentialDataType,
  SingleValueDataType,
} from "../interfaces/dataset_field.interface"
import { useSchemaServices } from "@modules/schemas/services"
import { DataTypeInf } from "../dto/field"

export default function useDatatypes() {
  const { schemas } = useSchemaServices()

  const DEFAULT_CUSTOM_DATA_TYPE: CustomDataType = {
    type: DATA_TYPES.CUSTOM,
    code: "function getValue(fields, utils){\n\t// logic of your function\n}",
  }

  const DEFAULT_MIXED_DATA_TYPE: MixedDataType = {
    type: DATA_TYPES.MIXED,
    object: [],
  }

  const DEFAULT_SCHEMA_VALUE_DATA_TYPE: SingleValueDataType = {
    type: DATA_TYPES.SINGLE_VALUE,
    fieldType: { args: {}, parent: schemas[0].name, type: schemas[0].options[0].name },
  }

  const DEFAULT_REF_DATA_TYPE: RefDataType = {
    type: DATA_TYPES.REF,
    ref: [],
  }

  const DEFAULT_SEQUENCE_DATA_TYPE: SequenceDataType = {
    type: DATA_TYPES.SEQUENCE,
    startsWith: 1,
    step: 1,
  }

  const DEFAULT_SEQUENTIAL_DATA_TYPE: SequentialDataType = {
    type: DATA_TYPES.SEQUENTIAL,
    values: [],
  }

  const DEFAULT_ENUM_DATA_TYPE: EnumDataType = { type: DATA_TYPES.ENUM, values: [] }

  const DATA_TYPES_ARRAY: Array<DataTypeInf> = [
    {
      dataType: DATA_TYPES.SINGLE_VALUE,
      title: "Schema Value",
      id: 7,
      default: DEFAULT_SCHEMA_VALUE_DATA_TYPE,
    },
    { dataType: DATA_TYPES.CUSTOM, title: "Custom", id: 1, default: DEFAULT_CUSTOM_DATA_TYPE },
    { dataType: DATA_TYPES.ENUM, title: "Enum", id: 2, default: DEFAULT_ENUM_DATA_TYPE },
    { dataType: DATA_TYPES.MIXED, title: "Object", id: 3, default: DEFAULT_MIXED_DATA_TYPE },
    { dataType: DATA_TYPES.REF, title: "Reference", id: 4, default: DEFAULT_REF_DATA_TYPE },
    {
      dataType: DATA_TYPES.SEQUENCE,
      title: "Sequence",
      id: 5,
      default: DEFAULT_SEQUENCE_DATA_TYPE,
    },
    {
      dataType: DATA_TYPES.SEQUENTIAL,
      title: "Sequential",
      id: 6,
      default: DEFAULT_SEQUENTIAL_DATA_TYPE,
    },
  ]

  function foundDataTypeByName(dataType: DATA_TYPES): DataTypeInf {
    const found = DATA_TYPES_ARRAY.find((d) => d.dataType === dataType) as DataTypeInf
    return found
  }

  return {
    DEFAULT_CUSTOM_DATA_TYPE,
    DEFAULT_ENUM_DATA_TYPE,
    DEFAULT_MIXED_DATA_TYPE,
    DEFAULT_REF_DATA_TYPE,
    DEFAULT_SCHEMA_VALUE_DATA_TYPE,
    DEFAULT_SEQUENCE_DATA_TYPE,
    DEFAULT_SEQUENTIAL_DATA_TYPE,
    DATA_TYPES_ARRAY,
    foundDataTypeByName,
  }
}