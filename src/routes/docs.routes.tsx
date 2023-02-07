/*
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-09 22:05:22
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\router\routes-docs.tsx
 */
import LazyLoad from '@/components/Hoc/LazyLoad'
import { lazy } from 'react'

// 文档模块
const Docs = lazy(() => import('@/modules/Docs'))
const DocsIndexPage = lazy(() => import('@/modules/Docs/DocsIndexPage'))
const DocsDetail = lazy(() => import('@/modules/Docs/DocsDetail'))

/**
 * 文档资料模块路由
 */
const docsRoutes = {
  path: 'docs',
  code: 'DOCS',
  element: LazyLoad(<Docs />),
  children: [
    { index: true, element: LazyLoad(<DocsIndexPage />) },
    { path: 'detail/:pid', element: LazyLoad(<DocsDetail />), code: 'DOCS_DETAIL' },
  ],
}

export default docsRoutes
