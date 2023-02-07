/*
 * @Author: hfWang
 * @Date: 2022-10-12 20:41:28
 * @LastEditTime: 2022-11-17 22:30:24
 * @Description: file content
 * @FilePath: \tmt-web\src\types\user\index.ts
 */

/**
 * 登录接口返回值 token
 */
export interface LoginResponse {
  token: string
  uid: number
}

export interface LoginParams {
  email: string
  password: string
}

export interface RegisterParams extends LoginParams {
  confirm_password: string
  userName: string
}

/**
 * 登录状态
 */
export type IType = 'login' | 'register'

/**
 * 登录类型
 */
export type ActiveTab = 'email' | 'DingTalk'

/**
 * 用户类型
 */
export type UserType = 'production' | 'server' | 'front' | 'test' | 'ui' | ''

/**
 * 用户信息
 */
export interface UserInfo {
  userId: number | string // 用户id
  userName: string // 用户昵称
  userEmail: string // 用户邮箱
  userAvatar: string // 用户头像
  userGroup: string[] // 用户所属项目组
  userType: UserType // 用户类型
  pCodes?: string[] // 页面查看权限
  fCodes?: string[] // 功能查看权限
}

/**
 * 获取用户列表接口入参
 */
export interface GetUserListParams {
  type: UserType[]
}
