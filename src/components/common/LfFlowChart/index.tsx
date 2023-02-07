/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-21 13:21:25
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\index.tsx
 */
import LogicFlow from '@logicflow/core'
import '@logicflow/core/dist/style/index.css'
import '@logicflow/extension/lib/style/index.css'
import { ConfigProvider } from 'antd'
import { FC, useEffect, useRef, useState } from 'react'
import './lf.less'
import CtrlBar from './lfComps/CtrlBar'
import EditBar from './lfComps/EditBar'
import SideBar from './lfComps/SideBar'
import baseNodesAndEdges from './node'
import { LfFlowChartExport, LfFlowChartProps } from './types'
import { lf_box_style } from './utils/contants'
import { baseNodesAndEdgesList, extensionList } from './utils/extensionList'
import { useFlowChart } from './utils/useFlowChart'

const FlowChart: FC<LfFlowChartProps> = props => {
  const lfRef = useRef<HTMLDivElement | null>(null)
  const lfBoxRef = useRef<HTMLDivElement | null>(null)
  const lf = useRef<LogicFlow | null>(null)
  const { ctrlBar = true } = props

  const [showSideBar, setShowSideBar] = useState<boolean>(ctrlBar) // 是否显示拖拽面板

  const {
    saveFlowChartInfo,
    lfZoomInOrOut,
    openMiniMap,
    openSelectMore,
    dragInNode,
    getLfConfig,
    theme,
    registerCustomNode,
    lfUndoOrRedo,
    selectMoreNode,
    stylesChange,
    setZIndex,
    onChangeUndoOrRedo,
    activeEdges,
    activeNodes,
    properties,
    getSelectNodeOrEdgeStyles,
  } = useFlowChart(props, {
    lf,
    lfBoxRef,
  })

  useEffect(() => {
    // 注册插件
    extensionList.forEach(extension => {
      LogicFlow.use(extension)
    })

    lf.current = new LogicFlow({
      container: lfRef.current as HTMLDivElement,
      ...getLfConfig(props.config),
    })

    // 注册自定义节点
    const allNodeList = props.nodeList ? [...baseNodesAndEdgesList, ...props.nodeList] : baseNodesAndEdgesList
    registerCustomNode(allNodeList)

    const { data = {} } = props
    // 流程图渲染
    lf.current.render(data)

    // 监听操作变化
    lf.current.on('history:change', onChangeUndoOrRedo)

    // 监听 画布框选、节点点击，空白处点击，节点连线点击
    lf.current.on('selection:selected,node:click,blank:click,edge:click', getSelectNodeOrEdgeStyles)

    return () => {
      if (lf.current !== null) {
        lf.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (lf.current) {
      const { editConfigModel } = (lf.current as LogicFlow).graphModel
      editConfigModel.updateEditConfig({
        // 设置是否为静默模式
        isSilentMode: props.disable || false,
      });
    }
  }, [props.disable])

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: theme,
        },
      }}
    >
      <div className={`lf_flow_chart ${props?.className}`} style={lf_box_style} ref={lfBoxRef}>
        <div ref={lfRef}></div>
        {
          !props.disable && (
            <>
              {/* 拖拽面板 */}
              {showSideBar && (
                <SideBar dragInNode={dragInNode} height={props.config.height} style={props.styleConf?.sideBarCss} />
              )}
              {/* 编辑面板 */}
              {(activeNodes.length > 0 || activeEdges.length > 0) && (
                <EditBar
                  height={props.config.height}
                  style={props.styleConf?.editBarCss}
                  elementsStyle={properties}
                  setZIndex={setZIndex}
                  onlyEdge={activeNodes.length === 0 && activeEdges.length > 0}
                  onChange={stylesChange}
                ></EditBar>
              )}
              {/* 控制面板 */}
              {ctrlBar && (
                <CtrlBar
                  style={props.styleConf?.ctrlBarCss}
                  showSideBar={showSideBar}
                  selectMore={openSelectMore}
                  openMiniMap={openMiniMap}
                  toggleSidebar={() => setShowSideBar(!showSideBar)}
                  selectMoreNode={selectMoreNode}
                  lfZoomInOrOut={lfZoomInOrOut}
                  lfUndoOrRedo={lfUndoOrRedo}
                  saveFlowChartInfo={saveFlowChartInfo}
                ></CtrlBar>
              )}
            </>
          )
        }
      </div>
    </ConfigProvider>
  )
}

export default {
  FlowChart,
  baseNodesAndEdges,
} as LfFlowChartExport


