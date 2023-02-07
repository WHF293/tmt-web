import WithIconPark from '@/components/Hoc/WithIconPark'
import ThemeModal from '@/components/basic/ThemeModal'
import useSystemTheme from '@/hooks/useSystemTheme'
import { Store } from '@/store'
import Token from '@/utils/Token'
import { Left, Moon, SunOne } from '@icon-park/react'
import { Avatar, Dropdown, MenuProps } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { userList } from '../constants'
import './HeaderBar.less'

function HeaderBarRightContent() {
	const store = useContext(Store)
  const navigate = useNavigate()
  const location = useLocation()
  const { theme, toggleTheme } = useSystemTheme()
  const [showThemeModal, setShowThemeModal] = useState(false)

  const onClickUserItem: MenuProps['onClick'] = ({ key }) => {
    switch (key) {
      case 'logout':
        Token.del()
        navigate('/login')
        break
      case 'userCenter':
        navigate('/index/member/userCenter', { state: { a: 1, b: { c: 6 } } })
        break
      case 'systemTheme':
        setShowThemeModal(true)
        break
      default:
        break
    }
  }

  return (
    <>
      <div className="right_area">
        {/* 返回上一级路由 */}
        {location.pathname !== '/index' && (
          <div className="mx-2 text-white cursor-pointer" onClick={() => navigate(-1)}>
            <WithIconPark IconComp={Left} config={{ size: 14 }} />
						<span style={{ color: store.themeStore.theme }}>返回</span>
          </div>
        )}
        {/* 主题切换 */}
        <div onClick={toggleTheme} className="theme_btn" title="使用系统时请关闭其他第三方可以改变主题色的插件">
          {theme === 'dark' ? (
            <WithIconPark IconComp={Moon} config={{ size: 24 }} />
          ) : (
            <WithIconPark IconComp={SunOne} config={{ size: 24 }} />
          )}
        </div>
        {/* 头像 */}
        <div className="mr-3">
          <Dropdown
            menu={{
              items: userList,
              onClick: onClickUserItem,
            }}
          >
            <Avatar src="https://whf-img.oss-cn-hangzhou.aliyuncs.com/img/202211271837082.jpg"></Avatar>
          </Dropdown>
        </div>
      </div>
      <ThemeModal show={showThemeModal} closeModal={() => setShowThemeModal(false)} />
    </>
  )
}

export default observer(HeaderBarRightContent)