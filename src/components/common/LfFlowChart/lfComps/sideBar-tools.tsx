/*
 * @Author: hfWang
 * @Date: 2022-12-17 10:45:00
 * @LastEditTime: 2022-12-21 13:28:13
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\lfComps\sideBar-tools.tsx
 */
import { AddText, DiamondTwo, DownTwo, LeftTwo, OvalOne, RectangleOne, RightTwo, Round, UpTwo } from '@icon-park/react'
import { NodeGroup } from '../types'

interface IconConf {
  fillColor?: string
  size?: number
}

const getBaseNodeGroup = (conf: IconConf = { fillColor: '#b96dfc', size: 18 }): NodeGroup[] => {
  return [
    {
      groupName: '基础节点',
      groupKey: 'base',
      expand: true,
      nodeList: [
        {
          icon: <RectangleOne theme="outline" size={conf.size} fill={conf.fillColor} strokeLinejoin="miter" />,
          type: 'pro-rect',
          name: '矩形',
        },
        {
          icon: <Round theme="outline" size={conf.size} fill={conf.fillColor} strokeLinejoin="miter" />,
          type: 'pro-circle',
          name: '圆形',
        },
        {
          icon: <OvalOne theme="outline" size={conf.size} fill={conf.fillColor} />,
          type: 'pro-ellipse',
          name: '椭圆',
        },
        {
          icon: <DiamondTwo theme="outline" size={conf.size} fill={conf.fillColor} />,
          type: "pro-diamond",
          name: '菱形',
        },
        {
          icon: <RectangleOne theme="outline" size={conf.size} fill={conf.fillColor} />,
          type: "pro-rect-radius",
          name: '圆角矩形',
        },
        {
          icon: <AddText theme="outline" size={conf.size} fill={conf.fillColor} />,
          type: "pro-text",
          name: '文本',
        },
        {
          icon: <UpTwo theme="outline" size={conf.size} fill={conf.fillColor}/>,
          type: "pro-up",
          name: '向上箭头',
        },
        {
          icon: <DownTwo theme="outline" size={conf.size} fill={conf.fillColor}/>,
          type: "pro-down",
          name: '向下箭头',
        },
        {
          icon: <LeftTwo theme="outline" size={conf.size} fill={conf.fillColor}/>,
          type: "pro-left",
          name: '向左箭头',
        },
        {
          icon: <RightTwo theme="outline" size={conf.size} fill={conf.fillColor}/>,
          type: "pro-right",
          name: '向右箭头',
        },
      ],
    },
  ]
}

export default getBaseNodeGroup
