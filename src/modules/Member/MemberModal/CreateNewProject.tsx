import SelectUser from '@/components/basic/SelectComp/SelectUser'
import { Store } from '@/store'
import { CreateNewProjectParams, CreateNewProjectProps, SyncCreateDocs } from '@/types/menber.types'
import { Button, Form, Input, Modal, Radio } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useState } from 'react'

function CreateNewProject(props: CreateNewProjectProps) {
  const [form] = Form.useForm()
  const store = useContext(Store)

  const [newProjectName, setNewProjectName] = useState('')
  const [newProjectDesc, setNewProjectDesc] = useState('')
  const [memberIds, setMemberIds] = useState<number[]>([])
  const [syncCreateDocs, setSyncCreateDocs] = useState<SyncCreateDocs>('Y')

  useEffect(() => {
    if (props.open) {
      form.resetFields()
      setSyncCreateDocs('Y')
    }
  }, [props.open])

  const onConfirm = () => {
    const params = {
      newProjectName,
      newProjectDesc,
      memberIds,
      syncCreateDocs,
      createUserId: store.userStore.userInfo.userId,
    } as CreateNewProjectParams
    props.onConfirm(params)
  }

  const handleSelectMembers = (data: number[]) => {
    setMemberIds(data)
  }

  return (
    <Modal title="新建项目" open={props.open} onCancel={props.closeModal} width={props.width || 500} footer={null}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 16 }} onFinish={onConfirm}>
        <Form.Item name="newProjectName" label="新项目名称" rules={[{ required: true, message: '新项目名称不能为空' }]}>
          <Input placeholder="新项目名称" onChange={e => setNewProjectName(e.target.value)} />
        </Form.Item>
        <Form.Item name="newProjectName" label="添加项目成员">
          <SelectUser type="" onSelected={handleSelectMembers} width={435}></SelectUser>
        </Form.Item>
        <Form.Item name="syncCreateDocs" label="是否同步创建文档库">
          <Radio.Group defaultValue="Y" onChange={e => setSyncCreateDocs(e.target.value)} value={syncCreateDocs}>
            <Radio value="Y">是</Radio>
            <Radio value="N">否</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="newProjectDesc" label="项目描述">
          <Input.TextArea rows={3} placeholder="项目描述" onChange={e => setNewProjectDesc(e.target.value)} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
          <div className="flex justify-end">
            <Button ghost type="primary" onClick={props.closeModal} className="mx-2">
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              创建
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default observer(CreateNewProject)
