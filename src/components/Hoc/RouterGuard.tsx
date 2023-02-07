import allRoutes from '@/routes'
import { getPrivRouteCodes } from '@/service/common.service'
import { IRoute, PrivRoute } from '@/types/router.types'
import { useEffect, useState } from 'react'
import { useRoutes } from 'react-router-dom'

/**
 * 用户拥有的路由权限
 */
type IRouterCodes = string[]

/**
 * @desc 路由守卫
 */
export default function RouterGuard() {
  const [routes, setRoutes] = useState<IRoute[]>([])

  useEffect(() => {
    getPrivRouter().then(res => {
      setRoutes(res)
    })
  }, [])

  return <>{useRoutes(routes)}</>
}

/**
 * 路由权限判断
 */
const getPrivRouter = async () => {
  const res = await getPrivRouteCodes()
  const codes: IRouterCodes = res.data.map((item: PrivRoute) => item.code)
  return allRoutes.filter(item => filterRoute(codes, item))
}

/**
 * 返回用户有权限的路由
 */
const filterRoute = (codes: IRouterCodes, route: IRoute): IRoute | null => {
  const hasRoutePriv = !route.code || codes.includes(route.code!)

  if (!hasRoutePriv) {
    return null
  } else {
    if (route.children) {
      route.children = route.children.filter(item => filterRoute(codes, item))
    }
    return route
  }
}
