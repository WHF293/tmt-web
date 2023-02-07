import { DataType } from '@/types/task.types'
import { Form, Input, Modal } from 'antd'
import { useEffect, useState } from 'react'

interface EditTaskDetailModalProps {
  open: boolean
  record: DataType | null
  onCancel: () => void
  onConfirm: (data: DataType) => void
}

const EditTaskDetailModal = (props: EditTaskDetailModalProps) => {
  const [editData, setEditData] = useState<DataType | null>(null)

  useEffect(() => {
    setEditData(props.open ? props.record : null)
  }, [props.open])

  return (
    <Modal
      title="快速编辑需求"
      width={700}
      open={props.open}
      onCancel={props.onCancel}
      onOk={() => props.onConfirm(editData as DataType)}
    >
      <div className="h-max-600px overflow-y-auto">
        {editData && (
          <Form labelCol={{ span: 6 }} wrapperCol={{ span: 16 }}>
            <p className="mb-0 pb-4 text-lg px-10">相关人员</p>
            <Form.Item label="产品">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="前端">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="后端">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="测试">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="UI">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <p className="mb-0 pb-4 text-lg px-10">相关附件</p>
            <Form.Item label="需求文档">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="UI设计稿">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="接口文档">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="冒烟用例">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
            <Form.Item label="测试用例">
              <Input defaultValue={editData.frontUserName}></Input>
            </Form.Item>
          </Form>
        )}
      </div>
    </Modal>
  )
}

export default EditTaskDetailModal
