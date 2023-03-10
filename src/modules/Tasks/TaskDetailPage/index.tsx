import WithIconPark from '@/components/Hoc/WithIconPark'
import SearchContent from '@/components/basic/SearchBox/SearchContent'
import SearchItem from '@/components/basic/SearchBox/SearchItem'
import SelectUser from '@/components/basic/SelectComp/SelectUser'
import SingleSelectProject from '@/components/basic/SelectComp/SingleSelectProject'
import SingleSelectTaskLevel from '@/components/basic/SelectComp/SingleSelectTaskLevel'
import LfFlowChart from '@/components/common/LfFlowChart'
import WangEditor from '@/components/common/WangEditor'
import { WangEditorDataType } from '@/components/common/WangEditor/types'
import lfMockData from '@/mock/flowChart'
import { createTask, getTaskDetailById } from '@/service/task.service'
import { Store } from '@/store'
import { CreateTaskParams } from '@/types/task.types'
import { DATE_FORMAT_TYPE } from '@/utils/constant'
import { to } from '@/utils/helper'
import { LinkThree } from '@icon-park/react'
import { Button, DatePicker, Input, message, Tabs } from 'antd'
import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './TaskDetailPage.less'

const lfConfig = {
  width: 1100,
  height: 600,
}

const { FlowChart } = LfFlowChart

function CreateTaskPage() {
  const navigate = useNavigate()
  const { tid } = useParams()
  const [taskName, setTaskName] = useState<string>('')
  const [project, setProject] = useState<string>('')
  const [level, setLevel] = useState<number | ''>('')
  const [onlineTime, setOnlineTime] = useState<string>('')
  const [prdLink, setPrdLink] = useState('')
  const [uiLink, setUiLink] = useState('')
  const [tempTestLink, setTempTestLink] = useState('')
  const [testLink, setTestLink] = useState('')
  const [apiLink, setApiLink] = useState('')
  const [html, setHtml] = useState('')
  const [disabled, setDisabled] = useState(false)

  const store = useContext(Store)

  useEffect(() => {
    if (tid === '-1') return
    else {
      getTaskDetail()
      setDisabled(true)
    }
  }, [tid])

  const handleSelectLevel = (data: string) => {
    if (Number(data)) {
      setLevel(Number(data))
    }
  }

  const saveHtml = (data: WangEditorDataType) => {
    const { html: _html } = data
    setHtml(_html)
  }

  const handleSelectDate = (val: dayjs.Dayjs | null) => {
    const date = val ? dayjs(val).format(DATE_FORMAT_TYPE) : ''
    setOnlineTime(date)
  }

  const getTaskDetail = async () => {
    if (!tid) return
    const params = {
      id: Number(tid),
    }
    const [, res] = await to(getTaskDetailById(params))
  }

  const editTaskInfo = () => {
    setDisabled(false)
  }

  const createNewTask = async () => {
    // ????????????
    const validateResult = validate()
    if (validateResult) {
      message.warning(`${validateResult} ????????????`)
      return
    }

    const taskInfoParams = {
      // ????????????
      taskName,
      project,
      level,
      onlineTime,
      // ???????????????
      prdLink,
      uiLink,
      tempTestLink,
      testLink,
      apiLink,
      // ????????????(?????????)
      html,
      // ???????????????
      // lfInfo: ''
    } as CreateTaskParams

    const res = await createTask(taskInfoParams)
    if (res) {
      const taskId = res.data.taskId
      if (taskId) {
        message.success('??????????????????, 3??????????????????')
        setTimeout(() => {
          navigate(`index/task/taskDetail/${taskId}`)
        }, 3000)
      }
    }
  }

  const updateTask = () => {
    setDisabled(true)
  }

  const cancelCreate = () => {
    if (tid === '-1') {
      navigate('/index/task')
    } else {
      getTaskDetail()
      setDisabled(true)
    }
  }

  const validate = (): string => {
    let msg = ''
    if (!project) msg += '???????????? '
    if (!taskName) msg += '???????????? '
    if (level === '') msg += '??????????????? '
    return msg
  }

  const BaseInfo = () => (
    <>
      <div className="create_module">
        <div className="create_task_title">????????????</div>
        <SearchContent>
          <SearchItem label="???????????????" required labelWidth="w-24">
            <SingleSelectProject
              disabled={disabled}
              onSelect={data => setProject(data)}
              width={174}
            ></SingleSelectProject>
          </SearchItem>
          <SearchItem label="????????????" required>
            <Input
              value={taskName}
              disabled={disabled}
              onChange={e => setTaskName(e.target.value)}
              placeholder="?????????????????????"
            />
          </SearchItem>
          <SearchItem label="?????????" required>
            <SingleSelectTaskLevel
              disabled={disabled}
              onSelect={data => handleSelectLevel(data)}
              width={180}
            ></SingleSelectTaskLevel>
          </SearchItem>
          <SearchItem label="????????????">
            <DatePicker disabled={disabled} onChange={handleSelectDate} allowClear style={{ width: 184 }} />
          </SearchItem>
        </SearchContent>
      </div>
      <div className="create_module module_border">
        <div className="create_task_title">????????????</div>
        <SearchContent>
          <SearchItem label="??????">
            <SelectUser
              disabled={disabled}
              width={180}
              type="production"
              onSelected={ids => selectUsers(ids, 'production')}
            ></SelectUser>
          </SearchItem>
          <SearchItem label="??????">
            <SelectUser
              disabled={disabled}
              width={180}
              type="production"
              onSelected={ids => selectUsers(ids, 'server')}
            ></SelectUser>
          </SearchItem>
          <SearchItem label="??????">
            <SelectUser
              disabled={disabled}
              width={180}
              type="production"
              onSelected={ids => selectUsers(ids, 'front')}
            ></SelectUser>
          </SearchItem>
          <SearchItem label="??????">
            <SelectUser
              disabled={disabled}
              width={180}
              type="production"
              onSelected={ids => selectUsers(ids, 'test')}
            ></SelectUser>
          </SearchItem>
          <SearchItem label="UI">
            <SelectUser
              disabled={disabled}
              width={180}
              type="production"
              onSelected={ids => selectUsers(ids, 'ui')}
            ></SelectUser>
          </SearchItem>
        </SearchContent>
      </div>
      <div className="create_module module_border">
        <div className="create_task_title">????????????</div>
        <SearchContent>
          <SearchItem label="????????????" doubleWidth>
            {disabled ? (
              <a rel="noreferrer" href={prdLink} target="_blank">
                <WithIconPark IconComp={LinkThree} config={{ size: 14 }} />
              </a>
            ) : (
              <Input
                value={prdLink}
                className="w-114"
                onChange={e => setPrdLink(e.target.value)}
                placeholder="???????????????????????????"
              />
            )}
          </SearchItem>
          <SearchItem label="UI ?????????" doubleWidth>
            {disabled ? (
              <a rel="noreferrer" href={uiLink} target="_blank">
                <WithIconPark IconComp={LinkThree} config={{ size: 14 }} />
              </a>
            ) : (
              <Input
                value={uiLink}
                className="w-114"
                onChange={e => setUiLink(e.target.value)}
                placeholder="?????????UI???????????????"
              />
            )}
          </SearchItem>
          <SearchItem label="????????????" doubleWidth>
            {disabled ? (
              <a rel="noreferrer" href={apiLink} target="_blank">
                <WithIconPark IconComp={LinkThree} config={{ size: 14 }} />
              </a>
            ) : (
              <Input
                value={apiLink}
                className="w-114"
                onChange={e => setApiLink(e.target.value)}
                placeholder="???????????????????????????"
              />
            )}
          </SearchItem>
          <SearchItem label="????????????" doubleWidth>
            {disabled ? (
              <a rel="noreferrer" href={tempTestLink} target="_blank">
                <WithIconPark IconComp={LinkThree} config={{ size: 14 }} />
              </a>
            ) : (
              <Input
                value={tempTestLink}
                className="w-114"
                onChange={e => setTempTestLink(e.target.value)}
                placeholder="???????????????????????????"
              />
            )}
          </SearchItem>
          <SearchItem label="????????????" doubleWidth>
            {disabled ? (
              <a rel="noreferrer" href={testLink} target="_blank">
                <WithIconPark IconComp={LinkThree} config={{ size: 14 }} />
              </a>
            ) : (
              <Input
                value={testLink}
                className="w-114"
                onChange={e => setTestLink(e.target.value)}
                placeholder="???????????????????????????"
              />
            )}
          </SearchItem>
        </SearchContent>
      </div>
    </>
  )

  const createTaskTabsItem = [
    {
      label: '????????????',
      key: 'other-info',
      children: <BaseInfo />,
    },
    {
      label: '????????????',
      key: 'task-desc',
      children: <WangEditor editorId="create-task" saveWEInfo={saveHtml} getText={false} readOnly={disabled} />,
    },
    {
      label: '????????????',
      key: 'task-flow',
      children: (
        <FlowChart
          config={lfConfig}
          ctrlBar
          data={lfMockData}
          disable={disabled}
          theme={store.themeStore.theme}
        ></FlowChart>
      ),
    },
  ]
  
  const ActionButton = () => (
    <div>
      <Button ghost type="primary" onClick={cancelCreate} className="mx-2">
        ??????
      </Button>
      {tid === '-1' && (
        <Button ghost type="primary" onClick={createNewTask}>
          ??????
        </Button>
      )}
      {tid !== '-1' && (
        <>
          {disabled ? (
            <Button ghost type="primary" onClick={editTaskInfo}>
              ??????
            </Button>
          ) : (
            <Button ghost type="primary" onClick={updateTask}>
              ??????
            </Button>
          )}
        </>
      )}
    </div>
  )

  const selectUsers = (ids: number[], type: string) => { }

  return (
    <div className="common-page create_task_page">
      <div className="flex justify-between mb-3">
        <div className="py-1 mx-2 text-lg">????????????</div>
        <ActionButton />
      </div>
      <div className="create_module module_border overflow-auto">
        <Tabs items={createTaskTabsItem} />
      </div>
    </div>
  )
}

export default observer(CreateTaskPage)
