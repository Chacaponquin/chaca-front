import { useTranslation } from "@modules/app/modules/language/hooks"
import { ModalEditField } from "@modules/modal/interfaces"
import { FieldForm, ModalContainer } from "../../shared/components"
import { useEditFieldForm } from "./hooks"

interface Props {
  modalProps: ModalEditField
}

export default function EditFieldForm({ modalProps }: Props) {
  const { EDIT_FIELD_TEXT, SUBMIT_TEXT } = useTranslation({
    EDIT_FIELD_TEXT: { en: "Edit Field", es: "Editar Campo" },
    SUBMIT_TEXT: { en: "Edit", es: "Editar" },
  })

  const { handleEditField, fieldActions, datasetId } = useEditFieldForm({
    field: modalProps.field,
    parentfieldId: modalProps.parentfieldId,
    datasetId: modalProps.datasetId,
  })

  return (
    <ModalContainer
      title={EDIT_FIELD_TEXT}
      handleNext={handleEditField}
      nextText={SUBMIT_TEXT}
      type="edit"
      name="edit-field"
    >
      <FieldForm {...fieldActions} datasetId={datasetId} />
    </ModalContainer>
  )
}
