import LogicFlow, { EdgeConfig, NodeConfig, RegisterConfig } from '@logicflow/core'
import { lfJson2Xml } from '@logicflow/extension'
import { MutableRefObject, useCallback, useEffect, useState } from 'react'
import { ISaveType, LfFlowChartProps } from '../types'
import { defaultTheme } from './contants'

export const useFlowChart = (
  props: LfFlowChartProps,
  conf: {
    lf: MutableRefObject<LogicFlow | null>
    lfBoxRef: MutableRefObject<HTMLDivElement | null>
  }
) => {
  const { lf, lfBoxRef } = conf
  const [theme, setTheme] = useState<string>(defaultTheme) // 主题
  const [openSelectMore, setOpenSelectMore] = useState(false) // 是否开启框选
  const [isUndoAble, setIsUndoAble] = useState(false) // 是否有上一步
  const [isRedoAble, setIsRedoAble] = useState(false) // 是否有下一步
  const [activeNodes, setActiveNodes] = useState<NodeConfig[]>([]) // 选中的节点
  const [activeEdges, setEdgeNodes] = useState<EdgeConfig[]>([]) // 选中的边
  const [properties, setProperties] = useState<Record<string, unknown>>({}) // 选中的元素（节点/边）的属性集合

  useEffect(() => {
    // 主题更改
    if (props.theme) {
      lfBoxRef.current?.style.setProperty('--themeColor', props.theme)
      lfBoxRef.current?.style.setProperty('--activeColor', props.styleConf?.iconActiveColor || '#8b5df6')
      setTheme(props.theme)
    }
  }, [props?.theme])

  const getSelectNodeOrEdgeStyles = () => {
    setTimeout(() => {
      const { nodes, edges } = (lf.current as LogicFlow).getSelectElements()

      // 标记那些是选中的节点/边
      setActiveNodes(nodes)
      setEdgeNodes(edges)

      // 记录选中节点/边的属性
      let _properties = {}
      if (nodes?.length) {
        nodes.forEach(node => {
          _properties = { ...properties, ...node.properties }
        })
      }
      if (edges?.length) {
        edges.forEach(edge => {
          _properties = { ...properties, ...edge.properties }
        })
      }
      setProperties(_properties)
    }, 50)
  }

  /**
   * 回退到上一步/下一步
   */
  const onChangeUndoOrRedo = (info: any) => {
    const {
      data: { undoAble = false, redoAble = false },
    } = info
    setIsUndoAble(undoAble)
    setIsRedoAble(redoAble)
  }

  /**
   * @desc 注册自定义节点
   * @param lf LogicFlow 实例
   * @param nodeList 自定义的节点列表
   */
  const registerCustomNode = (nodeList: RegisterConfig[]) =>
    nodeList.forEach(node => (lf.current as LogicFlow).register(node))

  /**
   * 开启/关闭 框选
   */
  const selectMoreNode = () => {
    if (openSelectMore) (lf.current as LogicFlow).extension.selectionSelect.closeSelectionSelect()
    else (lf.current as LogicFlow).extension.selectionSelect.openSelectionSelect()
    setOpenSelectMore(!openSelectMore)
  }

  /**
   * @param config 用户自定义配置
   * @returns 流程图配置
   */
  const getLfConfig = (config: any = {}) => {
    return {
      overlapMode: 1,
      autoWrap: true,
      metaKeyMultipleSelected: true,
      keyboard: {
        enabled: true,
      },
      grid: {
        visible: true,
        size: 10,
      },
      stopScrollGraph: true,
      background: {
        backgroundImage: '#ccc',
        backgroundRepeat: 'repeat',
      },
      ...config,
    }
  }

  /**
   *  回退上一步、下一步
   */
  const lfUndoOrRedo = (type: boolean) => {
    if (type && isUndoAble) {
      ;(lf.current as LogicFlow).undo()
    } else if (!type && isRedoAble) {
      ;(lf.current as LogicFlow).redo()
    }
  }

  /**
   * 画布放大或缩小
   */
  const lfZoomInOrOut = useCallback((type: boolean) => (lf.current as LogicFlow).zoom(type), [lf])

  /**
   * 报错流程图数据
   */
  const saveFlowChartInfo = useCallback(
    (type: ISaveType) => {
      if (!lf.current) return

      switch (type) {
        case 'image':
          lf.current.getSnapshot()
          break
        case 'json':
          const data = lf.current.getGraphData()
          console.log('JSON 数据', data)
          props.saveInfo?.(data, 'json')
          // 将获取到的数据保存到服务器或者本地都可以
          break
        case 'xml':
          const xml = lfJson2Xml(lf.current.getGraphData())
          console.log('XML 数据', xml)
          props.saveInfo?.(data, 'xml')
          // 将获取到的数据保存到服务器或者本地都可以
          break
        default:
          return new Error('类型不对')
      }
    },
    [lf]
  )

  /**
   * 开启缩略图
   */
  const openMiniMap = () => {
    const x = props.styleConf?.miniMapPosition?.x || 1000
    const y = props.styleConf?.miniMapPosition?.y || 10
    ;(lf.current as LogicFlow).extension.miniMap.show(x, y)
  }

  /**
   * 添加节点
   */
  const dragInNode = useCallback(
    (type: string) => {
      ;(lf.current as LogicFlow).dnd.startDrag({
        type,
      })
    },
    [lf]
  )

  /**
   * 修改选中节点的样式
   */
  const stylesChange = (styles: Record<string, unknown>) => {
    activeNodes.forEach(({ id }) => {
      ;(lf.current as LogicFlow).setProperties(id as string, styles)
    })
    activeEdges.forEach(({ id }) => {
      ;(lf.current as LogicFlow).setProperties(id as string, styles)
    })
    getSelectNodeOrEdgeStyles()
  }

  /**
   * 设置选中节点的层级
   */
  const setZIndex = (type: 'top' | 'bottom') => {
    activeNodes.forEach(({ id }) => {
      ;(lf.current as LogicFlow).setElementZIndex(id as string, type)
    })
    activeNodes.forEach(({ id }) => {
      ;(lf.current as LogicFlow).setElementZIndex(id as string, type)
    })
  }

  return {
    registerCustomNode,
    getLfConfig,
    lfZoomInOrOut,
    saveFlowChartInfo,
    openMiniMap,
    dragInNode,
    lfUndoOrRedo,
    selectMoreNode,
    stylesChange,
    setZIndex,
    onChangeUndoOrRedo,
    getSelectNodeOrEdgeStyles,
    properties,
    openSelectMore,
    activeEdges,
    activeNodes,
    theme,
  }
}
