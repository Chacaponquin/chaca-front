import { Argument } from "./argument"

export interface Schema {
  name: string
  id: string
  options: SubOption[]
  showName: string
}

export interface SubOption {
  id: string
  name: string
  arguments: Argument[]
  showName: string
}
