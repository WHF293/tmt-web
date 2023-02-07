/*
 * @Author: hfWang
 * @Date: 2022-11-23 21:14:04
 * @LastEditTime: 2022-11-24 22:21:00
 * @Description: file content
 * @FilePath: \tmt-web\src\components\basic\TableHeaderDrawer\index.tsx
 */
import { Column, TableHeaderDrawerProps } from '@/types/task.types'
import { Drawer } from 'antd'
import { cloneDeep } from 'lodash-es'
import { useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import FooterButton from '../FooterButton'
import DropDragItem from './DropDragItem'
import './TableHeaderDrawer.less'

export default function TableHeaderDrawer(props: TableHeaderDrawerProps) {
  const { title = '表头调整' } = props

  const [thConfig, setThConfig] = useState<Column[]>([])

  useEffect(() => {
    setThConfig(cloneDeep(props.tableHeaderList))
  }, [props.tableHeaderList])

  const confirmThConfig = () => {
    const resList = thConfig.map(item => item.key)
    props.onConfirm(resList)
  }

  /**
   * @desc 拖动排序
   * @param dragIndex 拖动元素的下标
   * @param hoverIndex 放置位置之前元素的下标
   */
  const changePosition = (dragIndex: number, hoverIndex: number) => {
    const dragItem = thConfig[dragIndex]
    const _tableHeaderList = [...thConfig]
    _tableHeaderList.splice(dragIndex, 1)
    _tableHeaderList.splice(hoverIndex, 0, dragItem)
    setThConfig(_tableHeaderList)
  }

  const handleLockItem = (lockIndex: number) => {
    const fixedItems: Column[] = [],
      noFixedItems: Column[] = []
    thConfig.forEach((item, index) => {
      if (index === lockIndex) {
        if (item.fixed) {
          delete item.fixed
        } else {
          item.fixed = 'left'
        }
      }
      if (item.fixed) fixedItems.push(item)
      else noFixedItems.push(item)
    })
    setThConfig([...fixedItems, ...noFixedItems])
  }

  const footer = <FooterButton onCancel={props.onClose} onConfirm={confirmThConfig} />

  return (
    <Drawer
      title={title}
      closable={false}
      onClose={props.onClose}
      open={props.isOpen}
      footer={footer}
    >
      <DndProvider backend={HTML5Backend}>
        <div className="drag_drop_list">
          {thConfig.map((item, index) => (
            <DropDragItem
              key={item.key}
              id={item.key}
              text={item.title}
              index={index}
              style={props.itemStyle}
              isLock={!!item.fixed}
              handleLockItem={() => handleLockItem(index)}
              changePosition={(i, t) => changePosition(i, t)}
            ></DropDragItem>
          ))}
        </div>
      </DndProvider>
    </Drawer>
  )
}
