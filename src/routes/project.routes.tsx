/*
 * @Author: hfWang
 * @Date: 2022-11-07 22:41:32
 * @LastEditTime: 2022-11-07 22:42:49
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\router\routes-project.tsx
 */
import LazyLoad from '@/components/Hoc/LazyLoad'
import { lazy } from 'react'

// 成员管理模块
const Project = lazy(() => import('@/modules/Project'))
const CreateProject = lazy(() => import('@/modules/Project/CreateProject'))

/**
 * 项目管理模块路由
 */
const projectRoutes = {
  path: 'project',
  code: 'PROJECT',
  children: [
    { index: true, element: <Project /> },
    { path: 'createProject', element: LazyLoad(<CreateProject />) },
  ],
}

export default projectRoutes
