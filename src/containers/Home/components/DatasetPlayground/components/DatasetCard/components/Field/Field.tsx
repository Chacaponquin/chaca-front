import { FieldNode } from "@modules/datasets/domain/tree"
import { FieldKeyIcon, FieldName, FieldType } from "./components"
import { useSchemaServices } from "@modules/schemas/services"

export default function Field({
  field,
  datasetHasKeys,
}: {
  field: FieldNode
  selectFieldPoint: null | string
  datasetHasKeys: boolean
}) {
  const { findParent, findType } = useSchemaServices()

  return (
    <div
      className="flex w-full text-base items-center gap-x-6 py-2 px-5 justify-between"
      id={field.id}
    >
      <div className="flex items-center gap-x-3">
        {datasetHasKeys && <FieldKeyIcon isKey={field.isKey} />}
        <FieldName name={field.name} />
      </div>

      <FieldType type={field.stringInf({ findOption: findType, findParent: findParent })} />
    </div>
  )
}
