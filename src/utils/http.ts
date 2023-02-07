/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-11-23 23:29:49
 * @Description: file content
 * @FilePath: \tmt-web\src\utils\http.ts
 */
import type { AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'
import Qs from 'qs'
import { isFormData } from '@/utils/helper'
import { UserInfo } from '@/types/user.types'
import { getRandomId, showHttpStatusMessage } from './http-helper'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Token from './Token'
import { message } from 'antd'

const instance = axios.create({
  timeout: 60 * 1000,
  baseURL: '/api',
})

let httpNum = 0

const addHttp = () => {
  if (httpNum === 0) {
    NProgress.start()
  }
  httpNum++
}

const finishHttp = () => {
  httpNum--
  if (httpNum <= 0) {
    NProgress.done()
  }
}

// instance request 拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig<any>) => {
    addHttp()
    if (config.url) {
      const reqId = getRandomId()
      const userInfo = localStorage.getItem('userInfo')

      // 添加请求id
      config.url = config.url.includes('?')
        ? `${config.url}&reqId=${reqId}`
        : `${config.url}?reqId=${reqId}`
      // 添加当前用户id
      if (userInfo) {
        const { userId } = JSON.parse(userInfo) as UserInfo
        config.url = `${config.url}&uid=${userId + ''}`
      }
      console.log('url: ', config.url)
    }

    const token = Token.get()
    if (token) {
      config.headers!.Authorization = `Bearer ${token}`
    }

    // 除入参是 fromData 之外的 post 请求，请求参数都需要序列化
    if (config.method === 'post' && !isFormData(config.data)) {
      config.data = Qs.stringify(config.data)
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

// instance response 拦截器
instance.interceptors.response.use(
  (res: AxiosResponse<any, any>) => {
    finishHttp()
    const { code, message: msg } = res.data
    if (code > 300 || code < 200) {
      if (msg) message.error(msg)
      else showHttpStatusMessage(code)
    }
    return res.data
  },
  error => {
    const { response } = error
    showHttpStatusMessage(response.status)
    return Promise.reject(error)
  }
)

export default instance
