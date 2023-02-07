import { TH_ITEM } from '@/utils/constant'
import { LockOne, Unlock } from '@icon-park/react'
import { CSSProperties, useRef } from 'react'
import { DragSourceMonitor, useDrag, useDrop, XYCoord } from 'react-dnd'
import './TableHeaderDrawer.less'

interface DropItemProps {
  id: number | string
  text: string
  isLock?: boolean
  index: number
  className?: string
  style?: CSSProperties
  changePosition: (dragIndex: number, hoverIndex: number) => void
  handleLockItem?: () => void
}

interface IItem {
  isLock: boolean
  index: number
}

function DropDragItem(props: DropItemProps) {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag({
    type: TH_ITEM,
    item: {
      index: props.index,
      isLock: props.isLock,
    },
    canDrag: !props.isLock,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  const [, drop] = useDrop({
    accept: TH_ITEM,
    canDrop: () => !!props.isLock,
    hover: (item: IItem, monitor) => {
      if (item.isLock || props.isLock) {
        return
      }
      if (!ref.current) return
      let dragIndex = item.index
      let hoverIndex = props.index

      // 如果回到自己的坑，那就什么都不做
      if (dragIndex === hoverIndex) return 
      // 获取当前块的位置
      const hoverBoundingRect = ref.current!.getBoundingClientRect()
      // 获取当前块的一半高度，用于后续处理
      const itemMiddlePosition = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // 获取鼠标位置
      const mousePosition = monitor.getClientOffset()
      // 鼠标相对于当前块顶部的距离 = 鼠标距离浏览器顶部距离 - 当前块顶部距离浏览器顶部距离
      const hoverClientY = (mousePosition as XYCoord).y - hoverBoundingRect.top

      // 从上往下拖，超过当前块高度一半才开始替换
      if (dragIndex < hoverIndex && hoverClientY < itemMiddlePosition) return
      // 从下往上拖，超过当前块高度一半才开始替换
      if (dragIndex > hoverIndex && hoverClientY > itemMiddlePosition) return

      // 超过一半高度，符合互换位置条件， 调用传入的方法完成交换
      props.changePosition(dragIndex, hoverIndex)
      // 改变当前块的 index （不然会出现两个盒子疯狂抖动）
      item.index = hoverIndex
    },
  })

  const handleLockItem = () => {
    if (props.handleLockItem) {
      props.handleLockItem()
    }
  }

  drag(ref)
  drop(ref)

  const classes = `drag_drop_item ${props.className} ${props.isLock ? 'disabled': ''}`

  return (
    <div
      ref={ref}
      style={{ ...props.style, opacity: isDragging ? 0.9 : 1 }}
      className={classes}
    >
      {props.text}
      <div onClick={handleLockItem}>
        {props?.isLock ? (
          <LockOne theme="filled" size="14" fill="#8b5df6" strokeLinecap="butt" />
        ) : (
          <Unlock theme="filled" size="14" fill="#8b5df6" strokeLinecap="butt" />
        )}
      </div>
    </div>
  )
}

export default DropDragItem

// https://zhuanlan.zhihu.com/p/265138683
