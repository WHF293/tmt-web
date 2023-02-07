/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-11-25 00:16:38
 * @Description: file content
 * @FilePath: \tmt-web\src\layout\AppLayout\index.tsx
 */
import { noNeedBaseRouterAnimateArr } from '@/utils/constant'
import FooterBar from '@/layout/components/FooterBar'
import WithRoute from '@/components/Hoc/WithRoute'
import { Layout } from 'antd'
import { useContext, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import HeaderBar from './components/HeaderBar'
import { getUserInfoById } from '@/service/user.service'
import { observer } from 'mobx-react-lite'
import { Store } from '@/store'
import { UserInfo } from '@/types/user.types'
import './AppLayout.less'
import BallStar from './components/BallStar'

function AppLayout() {
  const location = useLocation()
  const [showFooter, setShowFooter] = useState(true)
  const needAnimate = useRef<boolean>(true) // 是否有路由切换动画

  const store = useContext(Store)

  useEffect(() => {
    let needBaseRouterAnimateArr = true // 是否需要基础的路由过度动画
    // 路由集合
    const pathNameArr = location.pathname.split('/').filter(Boolean)
    // 路由层级
    const routerLevel = pathNameArr.length
    // 路由层级大于 2， 且拥有自定义过度动画的路由不需要基础的过度动画
    noNeedBaseRouterAnimateArr.forEach(item => {
      if (pathNameArr.includes(item) && routerLevel > 2) needBaseRouterAnimateArr = false
    })
    needAnimate.current = needBaseRouterAnimateArr
    setShowFooter(pathNameArr.includes('docs') ? false : true)
  }, [location])

  useEffect(() => {
    if (location?.state?.uid) {
      setUserInfoToGlobal()
    }
    const systemTheme = localStorage.getItem('systemTheme')
    if (!systemTheme) {
      localStorage.setItem('systemTheme', 'default')
    }
  }, [])

  const setUserInfoToGlobal = async () => {
    const userInfo = await getUserInfoById(location.state.uid)
    if (userInfo) {
      const info = {} as UserInfo
      store.userStore.setUserInfo(info)
    }
  }

  return (
    <WithRoute>
      <Layout className="w-full bg-gray-100 h-full">
        {/* 头部 */}
        <Layout.Header className="!p-0 !h-12">
          <HeaderBar />
        </Layout.Header>
        {/* 内容 */}
        <Layout.Content>
          <div className="layout_content w-full ">
            {needAnimate.current ? (
              <SwitchTransition mode="out-in">
                <CSSTransition key={location.key} timeout={800} classNames="baseAnimate" nodeRef={null}>
                  <Outlet />
                </CSSTransition>
              </SwitchTransition>
            ) : (
              <Outlet />
            )}
            {showFooter && <FooterBar />}
          </div>
        </Layout.Content>
      </Layout>
      {/* 左上方动来动去的球 */}
      <BallStar />
    </WithRoute>
  )
}

export default observer(AppLayout)
