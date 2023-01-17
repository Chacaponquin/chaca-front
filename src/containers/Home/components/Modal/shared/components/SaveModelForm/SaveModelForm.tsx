import { DatasetsContext } from "@shared/context"
import { useContext } from "react"
import { FormContent, SaveModelInput } from "./components"

export default function SaveModelForm() {
  const { config } = useContext(DatasetsContext)

  return (
    <div className='flex items-center flex-col'>
      <SaveModelInput />
      {config.saveSchema && <FormContent />}
    </div>
  )
}
