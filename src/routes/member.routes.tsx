/*
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-07 23:23:52
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\router\routes-member.tsx
 */
import LazyLoad from '@/components/Hoc/LazyLoad'
import { lazy } from 'react'

// 成员管理模块
const Member = lazy(() => import('@/modules/Member'))
const UserCenter = lazy(() => import('@/modules/Member/UserCenter'))
const MemberProject = lazy(() => import("@/modules/Member/MemberProject"))

/**
 * 成员管理模块路由
 */
const memberRoutes = {
  path: 'member',
  code: 'MEMBER',
  children: [
    { index: true, element: LazyLoad(<Member />) },
    { path: 'userCenter', element: <UserCenter />, code: 'USER_CENTER' },
    { path: 'memberProject/:pid', element: <MemberProject />, code: 'MEMBER_PROJECT' },
  ],
}

export default memberRoutes
