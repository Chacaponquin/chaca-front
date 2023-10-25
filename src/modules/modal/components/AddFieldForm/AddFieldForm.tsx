import { ModalAddFieldProps } from "@modules/modal/interfaces/modal.interface"
import { FieldForm, ModalContainer } from "../../shared/components"
import { useLanguage } from "@modules/app/modules/language/hooks"
import { useAddFieldForm } from "./hooks"

const AddFieldForm = ({ modalProps }: { modalProps: ModalAddFieldProps }) => {
  const { NEW_FIELD_TEXT, SUBMIT_TEXT } = useLanguage({
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
    >
      <FieldForm {...fieldActions} datasetId={datasetId} />
    </ModalContainer>
  )
}

export default AddFieldForm