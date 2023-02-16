import { Private } from "@modules/shared/assets/icons"
import { useLanguage } from "@modules/shared/hooks"
import { useContext } from "react"
import { ChacaSwitchButton } from "@form"
import { configServices } from "@modules/config/services"
import { DatasetsContext } from "@modules/datasets/context"
import { UserContext } from "@modules/user/context"

export default function SaveModelInput() {
  const { actualUser } = useContext(UserContext)
  const { config } = useContext(DatasetsContext)

  const { SAVE_SCHEMA_TEXT } = useLanguage({
    SAVE_SCHEMA_TEXT: { en: "Save Model", es: "Guardar Modelo" },
  })

  const { changeSaveSchema } = configServices()

  return (
    <div className='flex items-center gap-2 justify-between w-full'>
      <label htmlFor='' className='font-fontBold text-lg'>
        {SAVE_SCHEMA_TEXT}:
      </label>
      {actualUser ? (
        <ChacaSwitchButton
          value={config.saveSchema !== null}
          onChange={(value) => {
            changeSaveSchema(value)
          }}
        />
      ) : (
        <Private size={20} />
      )}
    </div>
  )
}