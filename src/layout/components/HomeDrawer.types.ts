import { ReactNode } from "react"

export interface HomeDrawerProps {
  visible: boolean
  toggleVisible: (type: boolean) => void
}

export interface WrapperItem {
  key: string
  label: string
  link?: string
  children?: WrapperItem[]
  icon?: ReactNode
}
