/*
 * @Author: hfWang
 * @Date: 2022-10-22 09:18:05
 * @LastEditTime: 2022-11-07 20:21:25
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\types\task\index.ts
 */
import { IDemandStatusMap } from '@/utils/constant'
import { CSSProperties, ReactNode } from 'react'
import { UserInfo } from './user.types'

/**
 * 查询任务列表接口返回值
 */
export interface DataType {
  key: number
  index: number
  level: number
  taskId: string | number
  frontUserName: string
  serverUserName: string
  productUserName: string
  testUserName: string
  commissionTime: string
  testTime: string
  createTime: string
  onlineTime: string
  taskProject: string
  flowchart: string
  canEdit: boolean
}

/**
 * 查询任务列表接口入参
 */
export interface SearchData {
  projects: string[] // 项目
  createTime: [string, string] // 创建时间
  frontUserId: number // 前端开发人员
  serverUserId: number // 后端开发人员
  testUserId: number // 测试人员
  productUserId: number // 产品
  taskLevel: number // 任务等级
}

/**
 * 任务列表表格组件 props
 */
export interface TaskTableProps {
  columns: Column[]
  dataSource: DataType[]
}

/**
 * 任务列表查询抽屉组件 props
 */
export interface TaskSearchFormProps {
  onSearch: (searchData: SearchData) => void
}

export interface TaskListSearchModalProps {
  isOpen: boolean
  onSearch: (searchData: any) => void
  onClose: () => void
}

/**
 * 任务列表表头
 */
export interface Column {
  title: string
  dataIndex: string
  key: string
  width?: number
  fixed?: 'left' | 'right'
  render?: (_: any, record: DataType) => ReactNode
}

/**
 * 任务列表表头调整组件 props
 */
export interface TableHeaderDrawerProps {
  isOpen: boolean
  tableHeaderList: Column[]
  itemStyle?: CSSProperties
  title?: ReactNode
  onConfirm: (resList: string[]) => void
  onClose: () => void
}

/**
 * 获取任务详情组件 props
 */
export interface getTaskDetailProps {
  id: string | number // 任务id
}

/**
 * 任务详情接口返回值
 */
export interface ITaskDetail {
  taskId: number | string
  detail: {
    createTime: Date // 创建时间
    createUser: UserInfo // 创建人
    frontUser?: UserInfo // 前端
    serverUser?: UserInfo // 后端
    productionUser?: UserInfo // 产品
    testUser?: UserInfo //测试
    uiUser?: UserInfo //ui
    testTime?: Date //提测时间
    onlineTime?: Date //上线时间
    currentTaskStatus: IDemandStatusMap //任务当前状态
    project: string // 所属项目组
    level: number //任务紧急程度
    desc: string //任务描述
  }
}

/**
 * 任务优先级标签颜色映射
 */
export const levelColorMap = {
  '0': '#f11630',
  '1': '#9bf340',
  '2': '#4a90e2',
  '3': '#9b9b9b',
}

export type LevelColorMapLey = keyof typeof levelColorMap

/**
 * 新建任务接口入参
 */
export interface CreateTaskParams {
  taskName: string
  project: string
  level: string
  onlineTime: string

  prdLink: string
  uiLink: string
  tempTestLink: string
  testLink: string
  apiLink: string

  html: string
  lfInfo?: string
}

/**
 * 新建任务接口返回值
 */
export interface CreateTaskRes {
  taskId: string | number
}
