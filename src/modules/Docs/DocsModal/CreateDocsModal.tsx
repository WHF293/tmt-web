import { CreateNewDocsModalProps, EditorType, NewDocsInfo } from '@/types/docs.types'
import { Button, Form, Input, Modal, Select } from 'antd'
import { useEffect, useState } from 'react'

export default function CreateDocsModal(props: CreateNewDocsModalProps) {
  const [docsName, setDocsName] = useState('')
  const [docsType, setDocsType] = useState<EditorType>('md')

  const [form] = Form.useForm()

  useEffect(() => {
    if (props.open) {
      onReset()
    }
  }, [props.open])

  const onReset = () => {
    form.resetFields()
    setDocsName('')
    setDocsType('md')
  }

  const selectDocsType = (value: EditorType) => {
    console.log(value)
    setDocsType(value)
  }

  const onConfirm = () => {
    const newDocsInfo = {
      docsGroup: props.docsGroup,
      docsName,
      docsType,
      docsInfo: ''
    } as NewDocsInfo
    props.onConfirm(newDocsInfo)
  }

  return (
    <Modal title="新建文档" open={props.open} footer={null} onOk={onConfirm} onCancel={props.closeModal}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onConfirm}>
        <Form.Item label="所属分类">
          <Input defaultValue={props.docsGroup} disabled />
        </Form.Item>
        <Form.Item name="docsName" label="文档名称" rules={[{ required: true, message: '标题不能为空' }]}>
          <Input placeholder="请填写文档标题" onChange={e => setDocsName(e.target.value)} />
        </Form.Item>
        <Form.Item name="docsType" label="文档编辑器" rules={[{ required: true, message: '编辑器不能为空' }]}>
          <Select placeholder="请选择文斌编辑器" onChange={value => selectDocsType(value as EditorType)} allowClear>
            <Select.Option value="md">markdown编辑器</Select.Option>
            <Select.Option value="txt">富文本编辑器</Select.Option>
          </Select>
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
