/*
 * @Author: hfWang
 * @Date: 2022-11-07 22:52:22
 * @LastEditTime: 2022-11-07 23:10:12
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\HomePage\HomePageConf.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { DocumentFolder, List, Newlybuild, TurnAround } from '@icon-park/react'

export const projectEnterLists = [
  {
    code: 'taskList',
    title: '我的任务',
    link: '/index/task',
    icon: <WithIconPark IconComp={List} config={{ size: 24, strokeLinecap: 'butt' }}></WithIconPark>,
  },
  {
    code: 'docs',
    title: '资料库',
    link: '/index/docs',
    icon: <WithIconPark IconComp={DocumentFolder} config={{ size: 24, strokeLinecap: 'butt' }}></WithIconPark>,
  },
  {
    code: 'taskManage',
    title: '成员管理',
    link: '/index/member',
    icon: <WithIconPark IconComp={TurnAround} config={{ size: 24, strokeLinecap: 'butt' }}></WithIconPark>,
  },
  {
    code: 'createNewProject',
    title: '新建项目',
    link: '/index/project',
    icon: <WithIconPark IconComp={Newlybuild} config={{ size: 24, strokeLinecap: 'butt' }}></WithIconPark>,
  },
]
