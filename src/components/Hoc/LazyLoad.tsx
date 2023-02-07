/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-10-24 22:29:05
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\utils\LazyLoadComp.tsx
 */
import { Skeleton } from 'antd'
import { FC, Suspense } from 'react'

const LoadingComp: FC = () => (
  <div className="w-1200px m-auto">
    <Skeleton active></Skeleton>
  </div>
)

const LazyLoad = (children: JSX.Element, loading: JSX.Element = <LoadingComp />) => {
  return <Suspense fallback={loading}>{children}</Suspense>
}

export default LazyLoad
