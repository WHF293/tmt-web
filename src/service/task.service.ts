import http from '@/utils/http'
import { DataType, SearchData, getTaskDetailProps, ITaskDetail, CreateTaskParams, CreateTaskRes } from '@/types/task.types'
import { task } from './api'
import {Random} from 'mockjs'

/**
 * @desc 获取任务列表
 */
export const getTaskList = (params: SearchData): IResData<DataType[]> => {
  // return http.post(task._getTaskList, params)
  const _dataSource: DataType[] = []

  for (let i = 1; i < 100; i++) {
    _dataSource.push({
      key: i,
      index: i,
      level: Random.integer(0, 3),
      taskId: Random.integer(5000, 6000),
      frontUserName: Random.cname(),
      serverUserName: Random.cname(),
      productUserName: Random.cname(),
      testUserName: Random.cname(),
      commissionTime: Random.date("yyyy-MM-dd"),
      testTime: Random.date("yyyy-MM-dd"),
      createTime: Random.date("yyyy-MM-dd"),
      onlineTime: Random.date("yyyy-MM-dd"),
      taskProject: 'oms',
      flowchart: '3121',
      canEdit: parseInt((Math.random() * 10 % 3).toFixed()) === 0 ? true : false,
    })
  }
  const res = {
    code: 200,
    status: 'success',
    message: '请求成功',
    data: _dataSource,
  } as IData<DataType[]>
  return Promise.resolve(res)
}


/**
 * @desc 获取任务详情
 */
export const getTaskDetailById = (params: getTaskDetailProps): IResData<ITaskDetail> => {
  return http.post(task._getTaskDetail, params)
}

/**
 * @desc 新建任务
 */
export const createTask = (params: CreateTaskParams): IResData<CreateTaskRes> => {
  return http.post(task._createTask, params)
}