/**
 * 获取用户最近需求信息接口入参
 */
export interface GetUserRecentInfoParams {
  userId: number
}

/**
 * 获取用户最近需求信息接口返回值
 */
export interface UserRecentInfo {
  wait: number
  near: number
  will: number
}

/**
 * 获取用户最近需求信息接口
 */
export interface RecentCardInfo {
  code: string
  title: string
  num: number
}
