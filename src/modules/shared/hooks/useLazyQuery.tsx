import { useState } from "react"
import { useConfig } from "./useConfig"

interface LazyQueryProps<T> {
  onCompleted: (data: T) => void
  onError?: (error: Error) => void
  url: string
  query?: { [key: string]: unknown }
}

export function useLazyQuery<T>(): [
  (query: LazyQueryProps<T>) => void,
  { loading: boolean; error: boolean },
] {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { axiosInstance } = useConfig()

  const request = ({ url, onCompleted, onError, query = {} }: LazyQueryProps<T>) => {
    setLoading(true)
    setError(false)

    axiosInstance
      .get<T>(url, { params: query })
      .then(({ data }) => onCompleted(data))
      .catch((err) => {
        setError(true)
        if (onError) onError(err)
      })
      .finally(() => setLoading(false))
  }

  return [request, { loading, error }]
}
