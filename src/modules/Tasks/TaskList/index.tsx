/*
 * @Author: hfWang
 * @Date: 2022-10-16 08:47:10
 * @LastEditTime: 2022-11-27 18:33:47
 * @Description: file content
 * @FilePath: \tmt-web\src\modules\Tasks\TaskList\index.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import TableHeaderDrawer from '@/components/basic/TableHeaderDrawer'
import { getTaskList } from '@/service/task.service'
import { Store } from '@/store'
import { DataType, SearchData } from '@/types/task.types'
import { DATE_FORMAT_TYPE } from '@/utils/constant'
import { Config, FullScreen, OffScreen } from '@icon-park/react'
import { useDebounceFn, useFullscreen } from 'ahooks'
import { Button } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { CSSProperties, useContext, useEffect, useRef, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import EditTaskDetailModal from '../TaskModal/EditTaskDetailModal'
import './TaskList.less'
import TaskListSearchDrawer from './TaskListSearchDrawer'
import TaskTable from './TaskTable'
import useTaskTableConfig from './useTaskTableConfig'

const defaultCreateTime = [dayjs().subtract(7, 'day').format(DATE_FORMAT_TYPE), dayjs().format(DATE_FORMAT_TYPE)]

const _searchData = {
  projects: [] as string[],
  createTime: defaultCreateTime,
  frontUserId: -1,
  serverUserId: -1,
  testUserId: -1,
  productUserId: -1,
  taskLevel: -1,
} as SearchData

function TaskList() {
  const store = useContext(Store)
  const navigate = useNavigate()
  const fullScreenRef = useRef<HTMLDivElement | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isOpenThConfig, setIsOpenThConfig] = useState(false)

  const [isFullscreen, { toggleFullscreen }] = useFullscreen(fullScreenRef)
  const [dataSource, setDateSource] = useState<DataType[]>([])
  const [openEditModal, setOpenEditModal] = useState(false)
  const [editItem, setEditItem] = useState<DataType | null>(null)
  const [searchOptions, setSearchOptions] = useState(_searchData)

  useEffect(() => {
    getTableList(searchOptions)
  }, [])

  const { run: getTableList } = useDebounceFn(
    async (searchData: SearchData) => {
      const res = await getTaskList(searchData)
      setDateSource(res.data)
      setIsOpen(false)
    },
    { wait: 800 }
  )

  const onConfirm = (newColumn: string[]) => {
    editThConfig(newColumn)
    setIsOpenThConfig(false)
  }

  const createTask = () => {
    navigate('/index/task/taskDetail/-1')
  }

  const handleEditItem = (record: DataType) => {
    setOpenEditModal(true)
    setEditItem(record)
  }

  const { columns, editThConfig } = useTaskTableConfig(handleEditItem)

  const exportTaskList = () => {
    console.log('导出excel')
  }

  const changeSearchOptions = (data: SearchData) => {
    setSearchOptions(data)
    getTableList(searchOptions)
  }

  const updateRecord = (updateRecord: DataType) => {
    setOpenEditModal(false)
    getTableList(searchOptions)
  }
  const themeColor = useMemo(() => (store.themeStore.theme
  ), [store.themeStore.theme])

  const drawerItemStyle: CSSProperties = useMemo(() => ({
    backgroundColor: themeColor
  }), [themeColor])

  return (
    <div className="common-page task_list_page p-2 bg-light-200" ref={fullScreenRef}>
      {/* 搜索 */}
      <div className="task_list_option ">
        <div className="task_list_option_title">
          <span className="text-slate-700" style={{ color: themeColor }}>寻找你的声音</span>
          <div className="flex items-center cursor-pointer">
            <Button ghost type="primary" onClick={createTask}>
              新建任务
            </Button>
            {/* 全屏切换 */}
            <div onClick={toggleFullscreen} title={!isFullscreen ? '全屏' : '退出全屏'}>
              {isFullscreen ? (
                <WithIconPark IconComp={FullScreen} config={{ size: 16 }} className="mx-1"></WithIconPark>
              ) : (
                <WithIconPark IconComp={OffScreen} config={{ size: 16 }} className="mx-1"></WithIconPark>
              )}
            </div>
          </div>
        </div>
        {/* 下拉查询表单 */}
        <div className="task_list_option_content">
          <TaskListSearchDrawer
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
            onSearch={(data: SearchData) => changeSearchOptions(data)}
          />
        </div>
      </div>
      {/* 表格 */}
      <div className="task_list_table ">
        <div className="flex justify-end pb-2">
          {/* 查询 */}
          <Button type="primary" onClick={() => setIsOpen(true)} ghost>
            更多查询
          </Button>
          {/* 表头修改 */}
          <Button ghost type="primary" className="mx-2" onClick={exportTaskList} disabled={dataSource.length === 0}>
            导出
          </Button>
          <Button
            ghost
            type="primary"
            className="px-2"
            onClick={() => setIsOpenThConfig(true)}
            title="表头调整"
            disabled={dataSource.length === 0}
          >
            <WithIconPark IconComp={Config} config={{ size: 16 }}></WithIconPark>
          </Button>
        </div>
        <TaskTable dataSource={dataSource} columns={columns} />
      </div>
      {/* 白哦头调整 */}
      <TableHeaderDrawer
        itemStyle={drawerItemStyle}
        isOpen={isOpenThConfig}
        tableHeaderList={columns}
        onClose={() => setIsOpenThConfig(false)}
        onConfirm={newColumn => onConfirm(newColumn)}
      ></TableHeaderDrawer>
      <EditTaskDetailModal
        open={openEditModal}
        record={editItem}
        onCancel={() => setOpenEditModal(false)}
        onConfirm={data => updateRecord(data)}
      ></EditTaskDetailModal>
    </div>
  )
}

export default observer(TaskList)
