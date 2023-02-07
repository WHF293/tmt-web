/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-11-25 00:10:23
 * @Description: file content
 * @FilePath: \tmt-web\src\layout\LoginPage\index.tsx
 */
import { ActiveTab } from '@/types/user.types'
import Token from '@/utils/Token'
import { Tabs } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import DingTalkLogin from './DingTalkLogin'
import EmailLogin from './EmailLogin'
import './LoginPage.less'

const loginTypeList = [
  { key: 'email', label: '邮箱登录' },
  { key: 'DingTalk', label: '钉钉登录' },
]

function LoginPage() {
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname.includes('login')) {
      if (Token.get()) {
        navigate('/index')
      }
    }
  }, [location])

  const [activeTab, setActiveTab] = useState<ActiveTab>('email')

  return (
    <div className="login_page" id="login-page">
      <div className="login_box">
        <div className="login_form">
          <Tabs
            activeKey={activeTab}
            onTabClick={value => setActiveTab(value as ActiveTab)}
            className="!pl-4"
            items={loginTypeList}
          ></Tabs>
          {activeTab === 'email' ? <EmailLogin /> : <DingTalkLogin />}
        </div>
        <div className="login_img"></div>
      </div>
    </div>
  )
}

export default LoginPage
