import LazyLoad from '@/components/Hoc/LazyLoad'
import { lazy } from 'react'

const TestFlowChart = lazy(() => import('@/modules/TestModule/TestFlowChart'))
const TestXgVideoPlayer = lazy(() => import('@/modules/TestModule/TestXgVideoPlayer'))

/**
 * 组件测试模块路由
 */
const testRoutes = {
    path: 'test',
    children: [
        { path: 'flowChart', element: LazyLoad(<TestFlowChart />) },
        { path: 'xgVideoPlayer', element: LazyLoad(<TestXgVideoPlayer />) },
    ],
}

export default testRoutes