import { useConfig } from "@modules/app/hooks"
import { ChacaHttpError } from "../../interfaces/error"
import { handleResponseError } from "../../utils"
import { useState } from "react"

interface DeleteProps {
  url: string
  onCompleted: () => void
  onError?: (error: ChacaHttpError) => void
}

export function useDelete(): [(p: DeleteProps) => void, { loading: boolean; error: boolean }] {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  const { axiosInstance } = useConfig()

  const request = ({ onCompleted, url, onError }: DeleteProps) => {
    setLoading(true)
    setError(false)

    axiosInstance
      .delete(url)
      .then(() => onCompleted())
      .catch((error) => {
        setError(true)
        if (onError) onError(handleResponseError(error))
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return [request, { loading, error }]
}
