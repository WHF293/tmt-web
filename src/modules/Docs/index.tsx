/*
 * @Author: hfWang
 * @Date: 2022-11-09 22:03:09
 * @LastEditTime: 2022-11-10 19:56:46
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\Docs\index.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { BookOpen, Left, Notebook, Right } from '@icon-park/react'
import { Button, Menu, MenuProps } from 'antd'
import { useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import './Docs.less'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon: icon || <WithIconPark IconComp={Notebook} config={{ size: 14, strokeLinejoin: 'miter' }} />,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem('前端知识库', 'front', <WithIconPark IconComp={BookOpen} config={{ size: 14, strokeLinejoin: 'miter' }} />, [
    getItem('oms', 'oms'),
    getItem('t^2', 't^2'),
    getItem('wms', 'wms'),
    getItem('cac', 'cac'),
  ]),
  getItem('后端知识库', 'server', <WithIconPark IconComp={BookOpen} config={{ size: 14, strokeLinejoin: 'miter' }} />, [
    getItem('spring', 'spring'),
    getItem('api', 'api'),
    getItem('sql', 'sql'),
  ]),
]

export default function DocsLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [collapsed, setCollapsed] = useState(false)

  const handleClickMenu = (key: any) => {
    const routeArr = location.pathname.split('/')
    if (routeArr[routeArr.length - 1] === key) {
      return
    } else {
      navigate(`/index/docs/detail/${key}`, {
        state: { editorType: 'md' },
      })
    }
  }
  const toggleCollapsed = () => {
    setCollapsed(!collapsed)
  }

  return (
    <div className="docs_page">
      <div className="docs_page_left">
        <Menu
          mode="inline"
          theme="light"
          style={{ width: 200 }}
          onClick={({ key }) => handleClickMenu(key)}
          inlineCollapsed={collapsed}
          items={items}
          className="docs_menu"
        ></Menu>
        <Button
          ghost
          type="primary"
          shape="circle"
          size="small"
          onClick={toggleCollapsed}
          className="docs_page_header_btn"
        >
          {collapsed ? (
            <WithIconPark IconComp={Left} config={{ size: 12, strokeLinejoin: 'miter' }} />
          ) : (
            <WithIconPark IconComp={Right} config={{ size: 12, strokeLinejoin: 'miter' }} />
          )}
        </Button>
      </div>
      <div className="w-full h-900px py-3 overflow-y-auto">
        <SwitchTransition mode="out-in">
          <CSSTransition key={location.key} timeout={600} classNames="docsAnimate" nodeRef={null}>
            <Outlet />
          </CSSTransition>
        </SwitchTransition>
      </div>
    </div>
  )
}
