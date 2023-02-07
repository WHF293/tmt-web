/*
 * @Author: hfWang
 * @Date: 2022-10-22 09:18:05
 * @LastEditTime: 2022-10-24 20:24:44
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\store\index.ts
 */
import { createContext } from 'react'
import { ThemeStore } from './ThemeStore'
import { UserStore } from './UserStore'

export const stores = {
  userStore: new UserStore(),
  themeStore: new ThemeStore()
}

export type IStores = typeof stores

export const Store = createContext<IStores>(stores)
