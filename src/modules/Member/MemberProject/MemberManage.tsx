import { Button, Form, Input } from 'antd'

function MemberManage() {
  return (
    <div>
      <div className="mb-3">
        <Button type="primary">添加成员</Button>
        <Button ghost type="primary" className="ml-2">
          删除成员
        </Button>
      </div>
      <Form layout="inline">
        <Form.Item>
          <Input.Search placeholder="成员搜索"></Input.Search>
        </Form.Item>
      </Form>
    </div>
  )
}

export default MemberManage
