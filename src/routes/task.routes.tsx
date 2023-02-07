/*
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-07 23:23:40
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\router\routes-task.tsx
 */
import LazyLoad from '@/components/Hoc/LazyLoad'
import { lazy } from 'react'

// 任务模块
const Tasks = lazy(() => import('@/modules/Tasks'))
const TaskList = lazy(() => import('@/modules/Tasks/TaskList'))
const TaskDetailPage = lazy(() => import('@/modules/Tasks/TaskDetailPage'))
const TaskStatistics = lazy(() => import('@/modules/Tasks/TaskStatistics'))

/**
 * 需求任务模块路由
 */
const taskRoutes = {
  path: 'task',
  code: 'TASK',
  element: <Tasks />,
  children: [
    { index: true, element: LazyLoad(<TaskList />) },
    { path: 'taskDetail/:tid', element: LazyLoad(<TaskDetailPage />), code: 'TASK_DETAIL' },
    { path: 'taskStatistics', element: LazyLoad(<TaskStatistics />), code: 'TASK_STATISTICS' },
  ],
}

export default taskRoutes
