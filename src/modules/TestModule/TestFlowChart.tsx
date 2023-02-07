/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-21 09:16:27
 * @Description: file content
 * @FilePath: \tmt-web\src\modules\TestFlowChart\index.tsx
 */
import LfFlowChart from '@/components/common/LfFlowChart'
import lfMockData from '@/mock/flowChart'
import { useState } from 'react'

const { FlowChart, baseNodesAndEdges } = LfFlowChart

console.log('baseNodesAndEdges', baseNodesAndEdges)

const config = {
  width: 1200,
  height: 800,
}

export default function TestFlowChart() {
  const [theme, setTheme] = useState('#0ea5e9')
  
  const changeTheme = () => {
    setTheme(theme === '#0ea5e9' ? '#e879f9' : '#0ea5e9')
  }

  return (
    <div className="w-300 m-auto mt-10">
      <div onClick={changeTheme} className="mt-5">
        更改主题
      </div>
      <FlowChart config={config} ctrlBar data={lfMockData}></FlowChart>
    </div>
  )
}
