/*
 * @Author: hfWang
 * @Date: 2022-10-16 08:47:10
 * @LastEditTime: 2022-10-16 23:44:33
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\components\basic\HomeDrawer\index.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { BookmarkOne } from '@icon-park/react'
import { useDebounce } from 'ahooks'
import { Drawer, Input } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { quickAddress, quickAddressMap } from '../constants'
import './HomeDrawer.less'
import { HomeDrawerProps, WrapperItem } from './HomeDrawer.types'

const _quickModuleMapping = quickAddressMap()

export default function HomeDrawer(props: HomeDrawerProps) {
  const navigate = useNavigate()

  const [searchModule, setSearchModule] = useState('')

  const handleClickItem = (url: string) => {
    props.toggleVisible(false)
    navigate(url)
  }

  const targetModuleText = useDebounce(searchModule, { wait: 500 })

  const showSubItemModule = (label: string) =>
    targetModuleText === '' || label.toLowerCase().includes(targetModuleText.toLowerCase())

  const showItemModule = (key: string) => {
    let showItem = false
    _quickModuleMapping[key]?.children?.forEach(item => {
      if (showSubItemModule(item.label)) {
        showItem = true
      }
    })
    return showItem
  }

  const renderModule = (item: WrapperItem, index: number) => {
    const styles = {
      display: showItemModule(item.key) ? 'block' : 'none',
    }

    return (
      <div className="wrapper_item" key={`${item.key + index}`} style={styles}>
        <div className="wrapper_sub_title">
          {item.icon || <WithIconPark IconComp={BookmarkOne} config={{ size: 16 }}></WithIconPark>}
          {item.label}
        </div>
        {item.children && item.children.map((child, index) => renderSubModule(child, index))}
      </div>
    )
  }

  const renderSubModule = (child: WrapperItem, index: number) => {
    const styles = {
      display: showSubItemModule(child.label) ? 'block' : 'none',
    }

    return (
      <div
        key={`${child.key + index}`}
        className="wrapper_sub_item"
        style={styles}
        onClick={() => handleClickItem(child.link!)}
      >
        {child.label}
      </div>
    )
  }

  return (
    <Drawer
      placement="left"
      width={600}
      closable={false} // 关闭按钮
      title={null} // 标题
      footer={null} // 底部栏
      open={props.visible}
      className="!bg-gray-900 no-filter"
      onClose={() => props.toggleVisible(false)}
    >
      <div className="wrapper_box">
        <Input
          placeholder="搜索模块"
          allowClear
          className="w-120 ml-3"
          onChange={e => setSearchModule(e.target.value)}
        />
        {quickAddress.map((item, index) => renderModule(item, index))}
      </div>
    </Drawer>
  )
}
