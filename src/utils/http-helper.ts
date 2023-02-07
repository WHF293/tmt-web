/*
 * @Author: hfWang
 * @Date: 2022-10-12 20:56:18
 * @LastEditTime: 2022-10-12 21:04:33
 * @Description: file content
 * @FilePath: \vite-react-template\src\utils\showHttpStatusMessage.ts
 */
import { message } from 'antd'
import Token from './Token'

export const showHttpStatusMessage = (status: number) => {
  switch (status) {
    case 403:
      message.error('登录时间已到期，请重新登录')
      Token.del()
      break
    case 404:
      message.error('请求资源不存在')
      break
    case 500:
    case 501:
    case 503:
      message.error('请求资源不存在')
      break
    default:
      message.error('出现异常，请联系管理员处理')
      break
  }
}

/**
 * @desc 获取随机 Id
 * @returns 时间戳-随机字符串
 */
// 36 => [a-z] + [0-9]
export const getRandomId = (): string => Date.now().toString() + '-' + Math.random().toString(36).substring(2)
