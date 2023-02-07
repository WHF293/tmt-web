import { RouteObject } from 'react-router-dom'

export interface PrivRoute {
  code: string
  name: string
  parentCode?: string
}

export type IRoute = RouteObject & { code?: string }
