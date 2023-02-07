/*
 * @Author: hfWang
 * @Date: 2022-10-24 20:15:28
 * @LastEditTime: 2022-10-24 23:03:05
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\Tasks\TaskList\taskListSearchDrawer.tsx
 */
import SearchContent from '@/components/basic/SearchBox/SearchContent'
import SearchItem from '@/components/basic/SearchBox/SearchItem'
import SelectProject from '@/components/basic/SelectComp/SelectProject'
import SelectTaskLevel from '@/components/basic/SelectComp/SelectTaskLevel'
import SelectTaskStatus from '@/components/basic/SelectComp/SelectTaskStatus'
import SelectUser from '@/components/basic/SelectComp/SelectUser'
import { IDateType } from '@/types/common.types'
import { TaskListSearchModalProps } from '@/types/task.types'
import { UserType } from '@/types/user.types'
import { rangePresets, taskProjectList } from '@/utils/constant'
import { Button, DatePicker, Drawer } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'

const defaultCreateTime: IDateType = [dayjs().subtract(7, 'd'), dayjs()]

const itemWidth = 200
const doubleWidth = 496

const { RangePicker } = DatePicker

export default function TaskListSearchDrawer(props: TaskListSearchModalProps) {
  const [projects, setProjects] = useState<string[]>(taskProjectList)
  const [createTime, setCreateTime] = useState<(Dayjs | null)[]>(defaultCreateTime)
  const [frontUserId, setFrontUserId] = useState<number[]>([])
  const [serverUserId, setServerUserId] = useState<number[]>([])
  const [testUserId, setTestUserId] = useState<number[]>([])
  const [productUserId, setProductUserId] = useState<number[]>([])
  const [uiUserId, setUiUserId] = useState<number[]>([])
  const [taskLevel, setTaskLevel] = useState<number[] | string[]>([])
  const [taskStatus, setTaskStatus] = useState<string[]>([])

  const [reset, setReset] = useState(false)

  useEffect(() => {
    if (props.isOpen) {
      initAllData()
    }
  }, [props.isOpen])

  const initAllData = () => {
    setProjects(taskProjectList)
    setCreateTime(defaultCreateTime)
    setFrontUserId([])
    setServerUserId([])
    setTestUserId([])
    setUiUserId([])
    setProductUserId([])
    setTaskLevel([])
  }

  const onSearch = () => {
    const searchData = {
      projects,
      createTime,
      frontUserId,
      serverUserId,
      testUserId,
      productUserId,
      uiUserId,
      taskLevel,
      taskStatus,
    }
    props.onSearch(searchData)
  }

  const footerStyle = {
    display: 'flex',
    justifyContent: 'end',
  }

  const handleSelectFrontUsers = (data: number[], type: UserType) => {
    switch (type) {
      case 'front':
        setFrontUserId(data)
        break
      case 'production':
        setProductUserId(data)
        break
      case 'server':
        setServerUserId(data)
        break
      case 'test':
        setTestUserId(data)
        break
      case 'ui':
        setUiUserId(data)
        break
      default:
        return new Error('类型错误')
    }
  }

  const handleSelectTaskStatus = (data: string[]) => {
    setTaskStatus(data)
  }

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      setCreateTime(dates)
    } else {
      setCreateTime([null, null])
    }
  }

  const handleResetSearchOptions = () => {
    setReset(!reset)
    setCreateTime(defaultCreateTime)
  }

  const drawerFooter = [
    <Button key="submit" type="primary" onClick={onSearch} className="mx-1">
      查询
    </Button>,
    <Button key="link" type="primary" onClick={handleResetSearchOptions} className="mx-1">
      重置
    </Button>,
    <Button key="back" onClick={props.onClose} className="mx-1">
      关闭
    </Button>,
  ]

  return (
    <Drawer
      width={300}
      height={500}
      title="更多查询"
      placement="top"
      open={props.isOpen}
      closable={false}
      onClose={props.onClose}
      footer={drawerFooter}
      footerStyle={footerStyle}
    >
      <SearchContent className="w-1200px m-auto flex">
        <div className="w-full p-3 mb-2 text-sm">基础信息</div>
        <SearchItem label="项目">
          <SelectProject
            reset={reset}
            width={itemWidth}
            defaultValue={projects}
            onSelect={value => setProjects(value)}
          ></SelectProject>
        </SearchItem>
        <SearchItem label="项目优先级">
          <SelectTaskLevel
            reset={reset}
            width={itemWidth}
            defaultValue={projects}
            onSelect={value => setTaskLevel(value)}
          ></SelectTaskLevel>
        </SearchItem>
        <SearchItem label="创建时间" doubleWidth>
          <RangePicker
            className="w-496px"
            format="YYYY-MM-DD"
            defaultValue={defaultCreateTime}
            presets={rangePresets}
            onChange={onRangeChange}
          />
        </SearchItem>
        <SearchItem label="任务状态">
          <SelectTaskStatus width={itemWidth} onSelect={handleSelectTaskStatus}></SelectTaskStatus>
        </SearchItem>
        <div className="w-full p-3 mb-2 text-sm">人员信息</div>
        <SearchItem label="后端">
          <SelectUser
            reset={reset}
            type="server"
            width={itemWidth}
            onSelected={data => handleSelectFrontUsers(data, 'server')}
          />
        </SearchItem>
        <SearchItem label="前端">
          <SelectUser
            reset={reset}
            type="front"
            width={itemWidth}
            onSelected={data => handleSelectFrontUsers(data, 'front')}
          />
        </SearchItem>
        <SearchItem label="测试">
          <SelectUser
            reset={reset}
            type="test"
            width={itemWidth}
            onSelected={data => handleSelectFrontUsers(data, 'test')}
          />
        </SearchItem>
        <SearchItem label="产品">
          <SelectUser
            reset={reset}
            type="production"
            width={itemWidth}
            onSelected={data => handleSelectFrontUsers(data, 'production')}
          />
        </SearchItem>
        <SearchItem label="UI">
          <SelectUser
            reset={reset}
            type="ui"
            width={itemWidth}
            onSelected={data => handleSelectFrontUsers(data, 'ui')}
          />
        </SearchItem>
      </SearchContent>
    </Drawer>
  )
}
