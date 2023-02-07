import { GetUserRecentInfoParams, UserRecentInfo } from '@/types/home.types'
import http from '@/utils/http'
import { home } from './api'

export const getUserRecentInfo = (params: GetUserRecentInfoParams): IResData<UserRecentInfo> => {
  //   return http.post(home._getUserRecentInfo, params)
  const res = {
    code: 200,
    status: 'success',
    message: '请求成功',
    data: {
      wait: 10,
      near: 3,
      will: 16,
    },
  } as IData<UserRecentInfo>
  return Promise.resolve(res)
}
