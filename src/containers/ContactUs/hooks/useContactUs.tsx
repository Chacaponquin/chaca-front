import { useState } from "react"
import { CreateMessageDTO } from "@modules/user-message/dto/user_message"
import { usePost } from "@modules/app/modules/http/hooks"
import { API_ROUTES } from "@modules/app/constants/ROUTES"
import { useLanguage } from "@modules/app/modules/language/hooks"
import { SaveUserMessage } from "@modules/user-message/domain"
import { useToastServices } from "@modules/app/modules/toast/services"

export function useContactUs() {
  const [contactForm, setContactForm] = useState<CreateMessageDTO>({
    title: "",
    email: "",
    message: "",
  })
  const [modalOpen, setModalOpen] = useState(false)

  const { POST_ERROR } = useLanguage({
    POST_ERROR: {
      en: "There was an error sending the message",
      es: "Hubo un error al enviar el mensaje",
    },
  })

  const { toastError } = useToastServices()

  const [createMessage, { loading }] = usePost<void, SaveUserMessage>({
    url: API_ROUTES.CREATE_USER_MESSAGE,
    onCompleted: () => {
      setModalOpen(true)
    },
    onError: () => {
      toastError(POST_ERROR)
    },
  })

  const handleChange = (key: keyof CreateMessageDTO, value: string) => {
    setContactForm({ ...contactForm, [key]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const saveMessage = new SaveUserMessage(contactForm)
    createMessage({ body: saveMessage })
  }

  return { modalOpen, handleChange, handleSubmit, loading, contactForm }
}
