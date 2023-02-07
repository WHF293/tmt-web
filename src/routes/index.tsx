/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-11-07 22:43:00
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\router\routes.tsx
 */
import { lazy } from 'react'
import { IRoute } from '@/types/router.types'

import Redirect from '@/components/Hoc/Redirect'

import docsRoutes from './docs.routes'
import memberRoutes from './member.routes'
import taskRoutes from './task.routes'
import projectRoutes from './project.routes'
import micoAppRoutes from './micoApp.routes'
import testRoutes from './test.routes'
import LazyLoad from '@/components/Hoc/LazyLoad'

const AppLayout = lazy(() => import('@/layout'))
const LoginPage = lazy(() => import('@/modules/LoginPage'))
const NotFound = lazy(() => import('@/layout/components/NotFound'))

// 首页模块
const HomePage = lazy(() => import('@/modules/HomePage'))

const routes = [
  { path: '/', element: <Redirect to="/index" /> },
  { path: '/login', element: LazyLoad(<LoginPage />) },
  {
    path: '/index',
    element: LazyLoad(<AppLayout />),
    code: 'INDEX',
    children: [
      { index: true, element: LazyLoad(<HomePage />) },
      taskRoutes,
      docsRoutes,
      memberRoutes,
      projectRoutes,
      micoAppRoutes,
      testRoutes
    ],
  },
  { path: '*', element: LazyLoad(<NotFound />) },
] as IRoute[]

export default routes
