/*
 * @Author: hfWang
 * @Date: 2022-10-16 08:47:10
 * @LastEditTime: 2022-10-17 22:14:54
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\components\basic\SelectProject\index.tsx
 */
import { taskProjectList } from '@/utils/constant'
import { Select } from 'antd'
import { useEffect, useState } from 'react'

interface ProjectSelectProps {
  width?: number | string
  disabled?: boolean
  defaultValue?: string[]
  onSelect: (value: string[]) => void
  reset?: boolean
}

/**
 * 选择项目组件
 */
export default function SelectProject(props: ProjectSelectProps) {
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    setValue([])
  }, [props.reset])

  useEffect(() => {
    setValue(props.defaultValue || [])
  }, [props.defaultValue])

  const handleChange = (value: string[]) => {
    setValue(value)
    props.onSelect(value)
  }
  const handleClear = () => {
    setValue([])
    props.onSelect([])
  }
  return (
    <Select
      placeholder="请选择项目"
      mode='multiple'
      maxTagCount={1}
      allowClear
      value={value}
      style={{ width: props.width || 100 }}
      defaultValue={value || []}
      disabled={props.disabled || false}
      onChange={value => handleChange(value)}
      onClear={handleClear}
    >
      {taskProjectList.map((option, index) => (
        <Select.Option key={option} disabled={index === 4} value={option}>
          {option}
        </Select.Option>
      ))}
    </Select>
  )
}
