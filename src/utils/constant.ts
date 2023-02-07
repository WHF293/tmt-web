import { RangePreset } from '@/types/common.types'
import dayjs from 'dayjs'
import { ToolbarNames } from 'md-editor-rt'
/*
 * @Author: hfWang
 * @Date: 2022-10-16 22:45:01
 * @LastEditTime: 2022-11-07 20:31:52
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\assets\constant\index.ts
 */

export const noNeedBaseRouterAnimateArr = ['docs']
/**
 * 日期格式化
 */
export const DATE_FORMAT_TYPE = 'YYYY-MM-DD'

export const taskProjectList = ['oms', 'wms', 'et', 'cac']

/**
 * 表头调整类型
 */
export const TH_ITEM = 'TH_ITEM'

/**
 * @desc 需求状态
 */
export const DemandStatusMap = {
  init: '需求待确认',
  confirm: '需求确认',
  technicalReviewing: '技术评审中',
  technicalReviewed: '技术评审通过',
  isDevelopment: '开发中',
  jointCommissioning: '联调中',
  isTest: '测试中',
  grayTest: '灰度测试',
  online: '已上线',
}

export type IDemandStatusMap = keyof typeof DemandStatusMap

/**
 * 需求紧急程度
 */
export const taskLevel = [
  { level: 0, text: '紧急' },
  { level: 1, text: '高' },
  { level: 2, text: '中' },
  { level: 3, text: '低' },
]

let obj = {} as Record<string, string>
export const taskLevelMap = taskLevel.map(item => (obj[String(item.level)] = item.text))

export const RecentCardMap = {
  wait: '待办数量',
  near: '最近更新',
  will: '即将上线',
}

// MdEditor markdown 工具栏配置
export const MdEditorToolbars = [
  'bold', // 加粗
  'underline', // 下划线
  'italic', // 斜体
  '-',
  'strikeThrough', // 删除线
  'sub', // 下标
  'sup', //上标
  'quote', //引用
  'unorderedList', // 无序列表
  'orderedList', // 有序列表
  '-',
  'codeRow', // 行内代码
  'code', // 块级代码
  'link', // 链接
  'image', // 图片
  'table', //表格
  'mermaid', // 公式
  'katex', // 可视化 - 流程图/柱状图等图表
  '=',
  'revoke', // 后退一步
  'next', // 前进一步
  '-',
  'preview', // 内容预览
  'htmlPreview', // html代码预览
  'catalog', // 目录
  '-',
  'pageFullscreen', // 页面内全屏
  'fullscreen', // 屏幕全屏
  '-',
  'save', // 保存
] as ToolbarNames[]

// 富文本编辑器工具栏配置
export const WangEditorToolbars = []

/**
 * rangePicker 快速选择默认项
 */
export const rangePresets: RangePreset[] = [
  { label: '最近一周', value: [dayjs().add(-7, 'd'), dayjs()] },
  { label: '最近两周', value: [dayjs().add(-14, 'd'), dayjs()] },
  { label: '最近一个月', value: [dayjs().add(-30, 'd'), dayjs()] },
  { label: '最近三个月', value: [dayjs().add(-90, 'd'), dayjs()] },
]
