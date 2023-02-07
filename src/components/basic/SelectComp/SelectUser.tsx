import { getUserList } from '@/service/user.service'
import { GetUserListParams, UserInfo, UserType } from '@/types/user.types'
import { useDebounceFn } from 'ahooks'
import { Select } from 'antd'
import { isString } from 'lodash-es'
import { useEffect, useState } from 'react'

interface UserSelectProps {
  type: UserType | UserType[]
  disabled?: boolean
  placeholder?: string
  width?: number
  onSelected: (userIds: number[]) => void
  reset?: boolean
}

/**
 * 选择成员
 */
const SelectUser = (props: UserSelectProps) => {
  const [userList, setUserList] = useState<UserInfo[]>([])
  const [value, setValue] = useState<string[]>([])

  const { run: getUserListByType } = useDebounceFn(
    () => {
      const data = isString(props.type) ? [props.type] : props.type
      initUserList(data)
    },
    {
      wait: 1000,
    }
  )

  useEffect(() => {
    setValue([])
  }, [props.reset])

  useEffect(() => {
    getUserListByType()
  }, [getUserListByType, props.type])

  const initUserList = async (type: UserType[]) => {
    type = type.filter(Boolean)
    const params: GetUserListParams = {
      type,
    }
    const { data } = await getUserList(params)
    const _userList = type.length > 0 ? data.filter(item => type.includes(item.userType)) : data
    setUserList(_userList)
  }

  const handleChange = (newValue: string[]) => {
    setValue(newValue)
    const selectedUserIds = value.map(item => Number(item))
    props.onSelected(selectedUserIds)
  }

  return (
    <Select
      mode="multiple"
      allowClear
      showSearch
      maxTagCount={1}
      value={value}
      disabled={props.disabled || false}
      placeholder={props.placeholder || '请选择用户'}
      style={{ width: props.width || 120 }}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={(input, option) =>
        (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
      }
      onChange={handleChange}
      onClear={() => handleChange([])}
      notFoundContent={<div className="flex justify-center items-center">无匹配用户</div>}
    >
      {userList.map(item => {
        return <Select.Option key={item.userId}>{item.userName}</Select.Option>
      })}
    </Select>
  )
}

export default SelectUser
