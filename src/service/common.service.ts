/*
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-23 23:46:42
 * @Description: file content
 * @FilePath: \tmt-web\src\service\common.service.ts
 */
import http from '@/utils/http'
import { common } from './api'
import { PrivRoute } from '@/types/router.types'
import { GetCaptchaRes, ValidateParams, ValidateRes } from '@/types/captcha.types'

export const recordInfo = (params: any): IResData<any> => {
  return http.post(common._recordInfo, params)
}

/**
 * @desc 获取路由权限
 */
export const getPrivRouteCodes = (): IResData<PrivRoute[]> => {
  // return http.post(common._privRoutes)

  const data = [
    { code: 'INDEX', name: '首页' },
    // 任务模块
    { code: 'TASK', name: '任务列表', parentCode: 'INDEX' },
    { code: 'CREATE_TASK', name: '新建任务', parentCode: 'TASK' },
    { code: 'TASK_DETAIL', name: '任务详情', parentCode: 'TASK' },
    { code: 'TASK_STATISTICS', name: '任务统计分析', parentCode: 'TASK' },
    { code: 'CREATE_TASK', name: '创建任务', parentCode: 'INDEX' },
    // 文档模块
    { code: 'DOCS', name: '文档中心', parentCode: 'INDEX' },
    { code: 'DOCS_DETAIL', name: '文档详情', parentCode: 'DOCS_DETAIL' },
    // 成员模块
    { code: 'MEMBER', name: '成员管理', parentCode: 'INDEX' },
    { code: 'USER_CENTER', name: '用户中心', parentCode: 'MEMBER' },
    { code: 'MEMBER_PROJECT', name: '项目成员管理', parentCode: 'MEMBER' },
    // 项目管理模块
    { code: 'CREATE_PROJECT', name: '新建项目', parentCode: 'INDEX' },
  ] as PrivRoute[]

  const res = {
    code: 200,
    message: 'success',
    status: 'success',
    data,
  } as IData<PrivRoute[]>

  return Promise.resolve(res)
}

/**
 * @desc 文件下载
 * @param {url} 文件下载地址
 * @param {params} 请求参数
 * @param {fileName} 下载后的文件名
 */
export const downloadFile = <T>(url: string, params: T, fileName: string): void => {
  http.post(url, params).then(res => {
    const blob = new Blob(res.data)
    const blobURL = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.style.display = 'none'
    link.href = blobURL
    link.setAttribute('download', decodeURI(fileName))
    document.body.appendChild(link) // 挂载a标签
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(blobURL) // 释放blob URL地址
  })
}

/**
 * @desc 文件上传
 */
export const uploadFile = async (url: string, params: FormData) => {
  const config = {
    headers: { 'Content-Type': 'multipart/form-data' },
  }
  return http.post(url, params, config)
}

/**
 * 获取验证码
 */
export const getCaptcha = (): IResData<GetCaptchaRes> => {
  return http.post(common._getCaptcha)
}

/**
 * 校验验证码
 */
export const validateCaptcha = (params: ValidateParams): IResData<ValidateRes> => {
  return http.post(common._checkCaptcha, params)
}
