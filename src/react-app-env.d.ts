/*
 * @Author: hfWang
 * @Date: 2022-10-24 20:15:28
 * @LastEditTime: 2022-10-24 20:36:16
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\react-app-env.d.ts
 */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

interface IData<T> {
  code: number
  status: 'success' | 'error'
  message: string
  data: T
}

type IResData<T> = Promise<IData<T>>

interface BaseEnv {
  FAST_REFRESH: boolean
  PUBLIC_URL: string
  WDS_SOCKET_HOST: undefined
  WDS_SOCKET_PATH: undefined
  WDS_SOCKET_PORT: undefined
}

interface IEnv extends BaseEnv {
  NODE_ENV: 'production' | 'development'
  REACT_APP_PROXY_URL: string
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test'
    readonly PUBLIC_URL: string
  }
}

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>

  const src: string
  export default src
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}
