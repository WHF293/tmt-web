/*
 * @Author: hfWang
 * @Date: 2022-10-17 20:12:08
 * @LastEditTime: 2022-10-17 20:13:10
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\pages\TaskList\TaskTable.tsx
 */
import { TaskTableProps } from '@/types/task.types'
import { Table } from 'antd'

const scrollConf = {
  y: 700,
}

// 分页器配置
const paginationConf = {
  defaultPageSize: 50,
}

export default function TaskTable(props: TaskTableProps) {
  return (
    <Table
      className="w-full"
      scroll={scrollConf}
      columns={props.columns}
      dataSource={props.dataSource}
      pagination={paginationConf}
    ></Table>
  )
}
