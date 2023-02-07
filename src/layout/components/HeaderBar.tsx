/*
 * @Author: hfWang
 * @Date: 2022-10-12 19:15:22
 * @LastEditTime: 2023-01-10 22:58:32
 * @Description: file content
 * @FilePath: \tmt-web\src\layout\AppLayout\components\HeaderBar.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { HomeTwo, MoreApp } from '@icon-park/react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './HeaderBar.less'
import HeaderBarRightContent from './HeaderBarRightContent'
import HomeDrawer from './HomeDrawer'

export default function HeaderBar() {
  const [visible, setVisible] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  const toggleVisible = (type: boolean) => setVisible(type)

  const goHome = () => {
    if (location.pathname === '/index') return
    navigate('/index')
  }

  return (
    <>
      <div className="header_bar no-filter">
        <div className="left_area">
          {/* 系统logo */}
          <div className="home_logo"></div>
          <WithIconPark
            IconComp={MoreApp}
            config={{ size: 24 }}
            className="mr-3 cursor-pointer"
            onClick={() => setVisible(!visible)}
          />
          <WithIconPark IconComp={HomeTwo} config={{ size: 24 }} onClick={goHome} />
        </div>
        <HeaderBarRightContent />
      </div>
      <HomeDrawer visible={visible} toggleVisible={toggleVisible} />
    </>
  )
}
