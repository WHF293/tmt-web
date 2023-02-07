/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-17 11:08:39
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\lfComps\ctrlBar-tools.tsx
 */
import { Back, HamburgerButton, Next, Stretching, SwitchButton, ZoomIn, ZoomOut } from '@icon-park/react'
import { MenuProps } from 'antd'
import { CtrlItem } from '../types'

export const getCtrlItemList = (theme: string = '#b96dfc', size: number = 18) => [
  {
    icon: <Stretching theme="outline" size={size} fill={theme} strokeLinejoin="miter" />,
    type: 'openMiniMap',
    title: '开启缩略图',
  },
  {
    icon: <Back theme="outline" size={size} fill={theme} strokeLinejoin="miter" />,
    type: 'lfUndo',
    title: '上一步',
  },
  {
    icon: <Next theme="outline" size={size} fill={theme} strokeLinejoin="miter" />,
    type: 'lfRedo',
    title: '下一步',
  },
  {
    icon: <ZoomIn theme="outline" size={size} fill={theme} strokeLinejoin="miter" />,
    type: 'lfZoomIn',
    title: '放大',
  },
  {
    icon: <ZoomOut theme="outline" size={size} fill={theme} strokeLinejoin="miter" />,
    type: 'lfZoomOut',
    title: '缩小',
  },
] as CtrlItem[]

export const items: MenuProps['items'] = [
  { label: '保存为图片', key: 'image' },
  { label: '保存为JSON', key: 'json' },
  { label: '保存为XML', key: 'xml' },
]
