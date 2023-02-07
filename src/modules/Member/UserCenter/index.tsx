import { getUserInfoById } from '@/service/user.service'
import { Store } from '@/store'
import { to } from '@/utils/helper'
import { DatePicker, message, Tag, Tooltip } from 'antd'
import { observer } from 'mobx-react-lite'
import { Random } from 'mockjs'
import { useContext, useEffect, useState } from 'react'
import { Tips } from '@icon-park/react'
import PieCharts from '@/components/common/Echarts/PieCharts'
import { pieOption } from '@/mock/chartsMockData'
import dayjs, { Dayjs } from 'dayjs'
import { rangePresets } from '@/utils/constant'

const { RangePicker } = DatePicker
const colors = ['orange', 'purple', 'geekblue', 'magenta', 'red', 'volcano']

function UserCenter() {
  const [userName, setUserName] = useState('')
  const [userAvatar, setUserAvatar] = useState('https://whf-img.oss-cn-hangzhou.aliyuncs.com/img/202211271837082.jpg')
  const [userEmail, setUserEmail] = useState('')
  const [userProject, setUserProject] = useState<string[]>(['oms', 'wms', 'xm-show'])

  useEffect(() => {
    getUserInfo()
  }, [])

  const store = useContext(Store)

  const getUserInfo = async () => {
    const userId = store.userStore.userInfo.userId

    const [, res] = await to(getUserInfoById(userId))

    if (!res) {
      message.error('获取用户信息失败')
      return
    }

    const { data: userInfo } = res

    setUserName(userInfo.userName)
    setUserAvatar(userInfo.userAvatar)
    setUserEmail(userInfo.userEmail)
    setUserProject(userInfo.userGroup)
  }

  const onRangeChange = (dates: null | (Dayjs | null)[], dateStrings: string[]) => {
    if (dates) {
      console.log('From: ', dates[0], ', to: ', dates[1])
      console.log('From: ', dateStrings[0], ', to: ', dateStrings[1])
    } else {
      console.log('Clear')
    }
  }

  return (
    <div className="w-300 h-200 p-3 m-auto mt-8 bg-gradient-to-bl from-purple-400/200 rounded-lg">
      <div className="h-80 p-3 border-1 border-gray-200 border-solid shadow-lg rounded-xl flex mb-5 bg-light-200">
        <div className="flex justify-center items-center w-3/10">
          <img src={userAvatar} className="w-65 h-65" alt=""></img>
        </div>
        <div className="w-7/10 pt-3">
          <p className="py-2 text-3xl mb-0">{userName || Random.cname()}</p>
          <p className="py-2 mb-0">工作邮箱：{userEmail || Random.email()}</p>
          <p className="py-2 mb-0">职位：{userEmail || '初级前端开发工程师'}</p>
          <p className="py-2 mb-0">工位：{userEmail || 'A1-304'}</p>
          <div className="py-2">
            {userProject.map((item, index) => (
              <Tag key={item} className="mr-2" color={colors[index]}>
                {item}
              </Tag>
            ))}
          </div>
          <p className="py-2 mb-0">座右铭：{userEmail || '这个人很懒，什么也没写'}</p>
        </div>
      </div>
      <div className="flex items-center w-full h-105">
        <div className="h-full w-1/2 py-3 px-5 shadow-lg mr-2 border-1 border-gray-200 border-solid rounded-xl bg-light-200">
          <div className="mb-0 pb-2">
            需求统计
            <Tooltip title="默认统计近七天数据">
              <Tips theme="outline" size="14" fill="#b96dfc" strokeLinejoin="miter" />
            </Tooltip>
            <RangePicker
              defaultValue={[dayjs().subtract(7, 'd'), dayjs()]}
              className="ml-3"
              size="small"
              presets={rangePresets}
              format="YYYY-MM-DD"
              onChange={onRangeChange}
            />
          </div>
          <PieCharts options={pieOption} style={{ width: 500, height: 340 }}></PieCharts>
        </div>
        <div className="h-full w-1/2 py-3 px-5 shadow-lg ml-2 border-1 border-gray-200 border-solid rounded-xl bg-light-200">
          表格
        </div>
      </div>
    </div>
  )
}

export default observer(UserCenter)
