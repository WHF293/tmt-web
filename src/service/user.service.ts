/*
 * @Author: hfWang
 * @Date: 2022-10-12 20:35:43
 * @LastEditTime: 2022-11-25 00:01:52
 * @Description: file content
 * @FilePath: \tmt-web\src\service\user.service.ts
 */
import { GetUserListParams, LoginResponse, LoginParams, UserInfo, UserType, RegisterParams } from '@/types/user.types'
import http from '@/utils/http'
import { Random } from 'mockjs'
import { user } from './api'

export const login = (params: LoginParams): IResData<LoginResponse> => {
  return http.post(user._login, params)
}

export const register = (params: RegisterParams): IResData<LoginResponse> => {
  return http.post(user._register, params)
}

export const getUserList = (params: GetUserListParams): IResData<UserInfo[]> => {
  // return http.post(user._userList, params)
  const data = [] as UserInfo[]
  const type = ['production', 'server', 'front', 'test', 'ui']
  for (let i = 0; i < 100; i++) {
    let obj = {} as UserInfo
    obj.userId = Random.id()
    obj.userName = Random.cname()
    obj.userAvatar = 'sdaas'
    obj.userEmail = Random.email()
    obj.userGroup = ['oms']
    obj.userType = type[Random.integer(0, 4)] as UserType
    data.push(obj)
  }
  const res = {
    code: 200,
    status: 'success',
    message: '成功获取用户列表',
    data,
  } as IData<UserInfo[]>
  return Promise.resolve(res)
}

export const getUserInfoById = (uid: number | string): IResData<UserInfo> => {
  return http.post(user._getUserInfoById, { uid })
}
