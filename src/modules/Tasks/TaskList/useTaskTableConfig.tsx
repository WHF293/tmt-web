/*
 * @Author: hfWang
 * @Date: 2022-10-17 20:12:08
 * @LastEditTime: 2022-10-17 20:12:59
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\pages\TaskList\useTaskTableConfig.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { Store } from '@/store'
import { Column, DataType, levelColorMap, LevelColorMapLey } from '@/types/task.types'
import { EditTwo, Level } from '@icon-park/react'
import { Image } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

type TaskTableAction = (record: DataType) => void
interface ITaskLinkProps {
  record: DataType
}

const TaskLink = observer((props: ITaskLinkProps) => {
  const { record } = props
  const store = useContext(Store)
  const themeColor = useMemo(() => store.themeStore.theme, [store.themeStore.theme])
  return (
    <Link to={`/index/task/taskDetail/${record.taskId}`} style={{ color: themeColor }}>
      {record.taskId}
    </Link>
  )
})

export default function useTaskTableConfig(handleEditItem: TaskTableAction) {
  let _columns: Column[] = [
    { title: '#', dataIndex: 'index', key: 'index', width: 50, fixed: 'left' },
    {
      title: '任务编号',
      dataIndex: 'taskId',
      key: 'taskId',
      width: 130,
      fixed: 'left',
      render: (_: any, record: DataType) => <TaskLink record={record}/>,
    },
    {
      title: '所属项目组',
      dataIndex: 'taskProject',
      key: 'taskProject',
      width: 120,
    },
    {
      title: '优先级',
      dataIndex: 'level',
      key: 'level',
      width: 80,
      render: (_: any, record: DataType) => (
        <WithIconPark
          IconComp={Level}
          config={{ size: 16, fill: levelColorMap[record.level.toString() as LevelColorMapLey], strokeLinecap: 'butt' }}
          onClick={() => handleEditItem(record)}
        ></WithIconPark>
      ),
    },
    {
      title: '需求流程图',
      dataIndex: 'flowchart',
      key: 'flowchart',
      width: 120,
      render: (_: any, record: DataType) =>
        record.flowchart ? (
          <Image
            width={30}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/blur,r_50,s_50/quality,q_1/resize,m_mfit,h_200,w_200"
            preview={{
              src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            }}
          />
        ) : (
          <></>
        ),
    },
    { title: '上线时间', dataIndex: 'onlineTime', key: 'onlineTime', width: 200 },
    { title: '产品', dataIndex: 'productUserName', key: 'productUserName', width: 140 },
    { title: '后端', dataIndex: 'serverUserName', key: 'serverUserName', width: 140 },
    { title: '前端', dataIndex: 'frontUserName', key: 'frontUserName', width: 140 },
    { title: '测试', dataIndex: 'testUserName', key: 'testUserName', width: 140 },
    { title: '创建时间', dataIndex: 'createTime', key: 'createTime', width: 200 },
    { title: '联调时间', dataIndex: 'commissionTime', key: 'commissionTime', width: 200 },
    { title: '提测时间', dataIndex: 'testTime', key: 'testTime', width: 200 },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      width: 100,
      fixed: 'right',
      render: (_: any, record: DataType) =>
        record.canEdit && (
          <WithIconPark
            className="hover-svg"
            IconComp={EditTwo}
            config={{ size: 16 }}
            onClick={() => handleEditItem(record)}
          ></WithIconPark>
        ),
    },
  ]

  const editThConfig = (resList: string[]) => {
    let arr = [] as Column[]
    resList.forEach(item => {
      _columns.forEach(column => {
        if (column.key === item) {
          arr.push(column)
        }
      })
    })
    setColumns(arr)
  }

  const [columns, setColumns] = useState(_columns)

  return {
    columns,
    editThConfig,
  }
}
