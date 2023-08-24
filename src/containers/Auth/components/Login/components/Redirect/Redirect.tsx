import { APP_ROUTES } from "@modules/app/constants"
import { useLanguage } from "@modules/app/modules/language/hooks"
import { Link } from "react-router-dom"

export default function Redirect() {
  const { NEW_USER_TEXT, SIGN_UP_TEXT } = useLanguage({
    NEW_USER_TEXT: { en: "New User?", es: "Eres nuevo?" },
    SIGN_UP_TEXT: { es: "Regístrate", en: "Sign Up" },
  })

  return (
    <section className="flex justify-end w-full text-lg">
      <p className="inline mb-0">{NEW_USER_TEXT}</p>
      <Link to={APP_ROUTES.AUTH_ROUTES.SIGN_UP}>
        <p className="inline mb-0 ml-2 text-secondColor">{SIGN_UP_TEXT}</p>
      </Link>
    </section>
  )
}
