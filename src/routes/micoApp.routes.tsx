import { lazy } from 'react'
import { IRoute } from '@/types/router.types'
import LazyLoad from '@/components/Hoc/LazyLoad'

const Vue3App = lazy(() => import('@/components/common/MicoAppBox/Vue3App'))

/**
 * 微前端模块
 */
const micoAppRoutes = [
  {
    path: 'micoApp',
    code: 'MICOAPP',
    children: [{ index: true, element: LazyLoad(<Vue3App />) }],
  },
] as IRoute[]

export default micoAppRoutes
