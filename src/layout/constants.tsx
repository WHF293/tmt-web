import WithIconPark from '@/components/Hoc/WithIconPark'
import { BookmarkOne, BookOpen, EveryUser, ExperimentOne, OpenDoor } from '@icon-park/react'
import { MenuProps } from 'antd'
import { WrapperItem } from './components/HomeDrawer.types'

export const quickAddress = [
  {
    label: '任务模块',
    key: 'taskModule',
    icon: <WithIconPark IconComp={BookmarkOne} config={{ size: 16 }} />,
    children: [
      { label: '任务管理', key: 'taskManage', link: 'task' },
      { label: '新建任务', key: 'createTask', link: 'task/taskDetail/-1' },
    ],
  },
  {
    label: '文档模块',
    key: 'docsModule',
    icon: <WithIconPark IconComp={BookOpen} config={{ size: 16 }} />,
    children: [{ label: '文档管理', key: 'docsManage', link: 'docs' }],
  },
  {
    label: '微前端模块',
    key: 'micoApp',
    icon: <WithIconPark IconComp={OpenDoor} config={{ size: 16 }} />,
    children: [
      { label: 'vue3', key: 'vue3MicoApp', link: 'micoApp' },
    ],
  },
  {
    label: '人事模块',
    key: 'memberModule',
    icon: <WithIconPark IconComp={EveryUser} config={{ size: 16 }} />,
    children: [
      { label: '成员管理', key: 'memberManage', link: 'member' },
      { label: '用户中心', key: 'userCenter', link: 'member/userCenter' },
      { label: '系统主题设置', key: 'systemTheme', link: 'member/systemTheme' },
    ],
  },
  {
    label: '组件测试模块',
    key: 'testModule',
    icon: <WithIconPark IconComp={ExperimentOne} config={{ size: 16 }} />,
    children: [
      { label: '流程图组件', key: 'flowchart', link: 'test/flowchart' },
      { label: '视频播放器组件', key: 'xgVideoPlayer', link: 'test/xgVideoPlayer' },
    ],
  },
] as WrapperItem[]

export const quickAddressMap = () => {
  let map = {} as Record<string, WrapperItem>
  quickAddress.forEach(item => {
    map[item.key] = item
  })
  return map
}

export const themeColors = [{ label: '幽兰紫', key: '#8b5df6' }]

export const userList = [
  { key: 'userCenter', label: '个人中心' },
  { key: 'systemTheme', label: '主题色切换' },
  { key: 'logout', label: '退出登录' },
] as MenuProps['items']