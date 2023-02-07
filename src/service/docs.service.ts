import {
  CreateNewDocsResult,
  DocsDetailByIdParams,
  DocsListByTypeParams,
  IDocsItem,
  NewDocsInfo,
} from '@/types/docs.types'
import http from '@/utils/http'
import { Random } from 'mockjs'
import { docs } from './api'

/**
 * 获得文档详情
 */
export const getDocsDetailById = (params: DocsDetailByIdParams): IResData<string> => {
  //   return http.post(docs._getDocsDetailById, params)
  let res = {
    code: 200,
    status: 'success',
    message: '请求成功',
    data: Random.cparagraph(),
  } as IData<string>
  return Promise.resolve(res)
}

export const getAllDocsListByType = (params: DocsListByTypeParams): IResData<IDocsItem[]> => {
  // return http.post(docs._getAllDocsListByType, params)
  let arr = [] as IDocsItem[]

  const timer = Random.integer(0, 30)

  for (let i = 0; i < timer; i++) {
    arr.push({
      title: Random.ctitle(),
      code: Random.id(),
      id: i + 1,
      docsType: i % 3 === 0 ? 'md' : 'txt',
    })
  }
  let res = {
    code: 200,
    status: 'success',
    message: '请求成功',
    data: arr,
  } as IData<IDocsItem[]>
  return Promise.resolve(res)
}

export const createNewDocs = (params: NewDocsInfo): IResData<CreateNewDocsResult> => {
  return http.post(docs._createNewDocs, params)
}
