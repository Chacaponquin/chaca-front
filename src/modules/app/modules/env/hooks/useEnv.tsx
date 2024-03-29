export default function useEnv() {
  const API_ROUTE = import.meta.env.VITE_API_URL as string
  const SOCKET_URL = import.meta.env.VITE_SOCKET_URL as string

  return { API_ROUTE, SOCKET_URL }
}
