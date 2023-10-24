import axios from "axios"
import { useEffect, useMemo } from "react"
import { handleRequestSuccess } from "./utils"
import { useUser } from "@modules/user/hooks"
import { useLanguageService } from "@modules/app/modules/language/services"
import { useEnvServices } from "@modules/app/modules/env/services"

export const useConfig = () => {
  const { language } = useLanguageService()
  const { getToken } = useUser()
  const { API_ROUTE } = useEnvServices()

  const axiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: API_ROUTE,
      }),
    [],
  )

  useEffect(() => {
    axiosInstance.interceptors.request.use(
      (req) => handleRequestSuccess(req, getToken(), language),
      (error) => {
        Promise.reject(error)
      },
    )
  }, [language])

  return { axiosInstance }
}
