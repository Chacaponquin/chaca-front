import { useDatasetServices } from "@modules/datasets/services"
import { ModalContext } from "@modules/modal/context"
import { useContext } from "react"
import { toast } from "react-toastify"
import { useFieldForm } from "../../../shared/hooks"
import { v4 as uuid } from "uuid"
import { EmptyFieldNameError, RepeatSameLevelFieldNameError } from "@modules/datasets/errors"
import { useLanguage } from "@modules/app/modules/language/hooks"
import { useDatatypes } from "@modules/datasets/hooks"

export function useAddFieldForm(parentFieldID: string) {
  const { DEFAULT_SCHEMA_VALUE_DATA_TYPE } = useDatatypes()

  const { REPEAT_NAME, EMPTY_NAME } = useLanguage({
    REPEAT_NAME: {
      en: `Aldready exists an field with that name`,
      es: "Ya existe un campo con este nombre",
    },
    EMPTY_NAME: {
      en: `The field name can not be an empty string`,
      es: "El nombre del nuevo campo no puede estar vacío",
    },
  })

  const { handleCloseModal } = useContext(ModalContext)
  const { addField } = useDatasetServices()

  const fieldActions = useFieldForm({
    field: {
      id: uuid(),
      name: "",
      isArray: null,
      isPosibleNull: 0,
      dataType: DEFAULT_SCHEMA_VALUE_DATA_TYPE,
      isKey: false,
    },
  })

  const handleAddField = () => {
    try {
      addField(fieldActions.field, parentFieldID)
      handleCloseModal()
    } catch (error) {
      if (error instanceof EmptyFieldNameError) {
        toast.error(EMPTY_NAME)
      } else if (error instanceof RepeatSameLevelFieldNameError) {
        toast.error(REPEAT_NAME)
      }
    }
  }

  return { handleAddField, fieldActions }
}
