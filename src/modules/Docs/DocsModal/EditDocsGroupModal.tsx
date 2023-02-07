import { CreateDocsGroupModalProps, NewDocsGroup } from '@/types/docs.types'
import { Button, Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

export default function EditDocsGroupModal(props: CreateDocsGroupModalProps) {
  const [docsGroup, setDocsGroup] = useState('')
  const [subGroup, setSubGroup] = useState('')

  const [form] = Form.useForm()

  useEffect(() => {
    if (props.open) {
      onReset()
    }
  }, [props.open])

  const onReset = () => {
    form.resetFields()
    setSubGroup('')
  }

  const onConfirm = () => {
    const newDocsInfo = {
      docsGroup,
      subGroup: subGroup
        .trim()
        .replaceAll('，', ',')
        .split(',')
        .filter(Boolean),
    } as NewDocsGroup
    props.onConfirm(newDocsInfo)
  }

  return (
    <Modal title="编辑文档" open={props.open} footer={null} onOk={onConfirm} onCancel={props.closeModal}>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} onFinish={onConfirm}>
        <Form.Item name="docsGroup" label="分类名称" rules={[{ required: true, message: '分类名称不能为空' }]}>
          <Input onChange={e => setDocsGroup(e.target.value)} placeholder="请填写新的分类名称" />
        </Form.Item>
        <Form.Item name="docsName" label="2级分类" rules={[{ required: true, message: '2级分类' }]}>
          <Input placeholder="请填写2级分类，多个请用都好分隔" onChange={e => setSubGroup(e.target.value)} />
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
