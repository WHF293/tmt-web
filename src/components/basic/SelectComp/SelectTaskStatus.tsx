import { DemandStatusMap } from '@/utils/constant'
import { Select } from 'antd'
import { useEffect, useState } from 'react'
interface ProjectSelectProps {
  width?: number | string
  reset?: boolean
  disabled?: boolean
  onSelect: (value: string[]) => void
}

const statusKeys = Object.keys(DemandStatusMap) as (keyof typeof DemandStatusMap)[]


/**
 * 选择任务状态
 */
export default function TaskType(props: ProjectSelectProps) {
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    setValue([])
  }, [props.reset])

  const handleChange = (value: string[]) => {
    setValue(value)
    props.onSelect(value)
  }

  return (
    <Select
      placeholder="任务状态"
      mode="multiple"
      maxTagCount={1}
      allowClear
      value={value}
      style={{ width: props.width || 140 }}
      disabled={props.disabled || false}
      onChange={data => handleChange(data)}
      onClear={() => handleChange([])}
    >
      {statusKeys.map(option => (
        <Select.Option key={option} value={option}>
          {DemandStatusMap[option]}
        </Select.Option>
      ))}
    </Select>
  )
}
