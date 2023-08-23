import { Send } from "@modules/app/modules/icon/components"
import { ChacaIconButton } from "@form/components"
import { useLanguage } from "@modules/app/modules/language/hooks"

export default function RequestSection({
  url,
  handleSubmit,
}: {
  url: string
  handleSubmit: () => void
}) {
  const { SEND_MESSAGE } = useLanguage({ SEND_MESSAGE: { en: "Send", es: "Enviar" } })

  return (
    <div className="flex items-center text-base mb-3">
      <div className="flex items-center">
        <div className="bg-principalColor text-white px-4 py-1 font-fontBold border-2 border-principalColor uppercase">
          GET
        </div>
        <div className="overflow-x-auto no-scroll border-r-2 border-t-2 border-b-2 py-1 border-b-grayColor border-r-grayColor border-t-grayColor px-4 whitespace-nowrap min-w-[400px]">
          {url}
        </div>
      </div>

      <div className="ml-2">
        <ChacaIconButton
          icon={<Send size={18} />}
          color="primary"
          size="medium"
          text={SEND_MESSAGE}
          className="border-2 border-principalColor"
          onClick={handleSubmit}
        />
      </div>
    </div>
  )
}
