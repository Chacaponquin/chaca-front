import { useContext, useCallback } from "react"
import { Schema, SubOption } from "../interfaces/schema"
import { useEnv } from "@modules/app/modules/env/hooks"
import { SchemasContext } from "../context"

export function useSchemas() {
  const { schemas, loading } = useContext(SchemasContext)
  const { API_ROUTE } = useEnv()

  const optionApiRoute = (route: string): string => {
    return `${API_ROUTE}${route}`
  }

  const findParent = useCallback(
    (p: string): Schema => {
      return schemas.find((el) => el.id === p) as Schema
    },
    [schemas],
  )

  const findType = useCallback(
    (p: string, t: string): SubOption => {
      const foundParent = findParent(p)
      return foundParent.options.find((el) => el.id === t) as SubOption
    },
    [findParent],
  )

  const findParentOptions = useCallback(
    (parent: string): Array<SubOption> => {
      const found = findParent(parent).options
      return found
    },
    [findParent],
  )

  return { findParent, findType, findParentOptions, optionApiRoute, schemas, loading }
}
