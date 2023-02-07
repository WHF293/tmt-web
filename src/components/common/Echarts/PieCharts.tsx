/*
 * @Author: hfWang
 * @Date: 2022-11-14 21:54:03
 * @LastEditTime: 2022-11-14 21:54:07
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\components\common\echarts\bieCharts.tsx
 */
import { PieChart } from 'echarts/charts';
import { LegendComponent, ToolboxComponent } from 'echarts/components';
import * as echarts from 'echarts/core';
import { LabelLayout } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { memo, useEffect, useRef } from 'react';
import { ChartsProps } from './types';
import './eChart.less'

echarts.use([
  ToolboxComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout
]);


function PieCharts(props: ChartsProps) {
  const chartRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const echartsInstance = echarts.init((chartRef.current as HTMLDivElement))
    echartsInstance.setOption(props.options)
  }, [])


  return <div className="pie_chart">
    {props.title}
    <div ref={chartRef} style={props.style || {}}></div>
    {props.bottom}
  </div>
}

export default memo(PieCharts)