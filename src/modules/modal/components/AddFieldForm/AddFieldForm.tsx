import { ModalAddFieldProps } from "@modules/modal/interfaces"
import { FieldForm, ModalContainer } from "../../shared/components"
import { useTranslation } from "@modules/app/modules/language/hooks"
import { useAddFieldForm } from "./hooks"

interface Props {
  modalProps: ModalAddFieldProps
}

export default function AddFieldForm({ modalProps }: Props) {
  const { NEW_FIELD_TEXT, SUBMIT_TEXT } = useTranslation({
    NEW_FIELD_TEXT: { en: "New Field", es: "Nuevo Campo" },
    SUBMIT_TEXT: { en: "Add Field", es: "Añadir Campo" },
  })

  const { handleAddField, fieldActions, datasetId } = useAddFieldForm({
    parentfieldId: modalProps.parentfieldId,
    datasetId: modalProps.datasetId,
  })

  return (
    <ModalContainer
      title={NEW_FIELD_TEXT}
      type="edit"
      nextText={SUBMIT_TEXT}
      handleNext={handleAddField}
      name="add-field"
    >
      <FieldForm {...fieldActions} datasetId={datasetId} />
    </ModalContainer>
  )
}
