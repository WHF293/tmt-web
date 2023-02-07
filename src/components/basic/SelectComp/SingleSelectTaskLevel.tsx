/*
 * @Author: hfWang
 * @Date: 2022-10-16 08:47:10
 * @LastEditTime: 2022-10-17 22:14:54
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\components\basic\ProjectSelect\index.tsx
 */
import { taskLevel } from '@/utils/constant'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

interface TaskSelectProps {
  width?: number | string
  disabled?: boolean
  defaultValue?: string
  onSelect: (value: string) => void
  reset?: boolean
}

/**
 * 选择任务优先级（单选）
 */
export default function SingleSelectTaskLevel(props: TaskSelectProps) {

  const [value, setValue] = useState<string>('')

  useEffect(() => {
    setValue('')
  }, [props.reset])

  const handleChange = (value: string) => {
    setValue(value)
    props.onSelect(value)
  }

  return (
    <Select
      placeholder="项目优先级"
      allowClear
      value={value}
      style={{ width: props.width || 100 }}
      defaultValue={props.defaultValue || ''}
      disabled={props.disabled || false}
      onChange={handleChange}
      onClear={() => handleChange('')}
    >
      {taskLevel.map(option => (
        <Select.Option key={option.level} value={option.level}>
          {option.text}
        </Select.Option>
      ))}
    </Select>
  )
}