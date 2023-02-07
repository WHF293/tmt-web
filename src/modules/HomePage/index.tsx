/*
 * @Author: hfWang
 * @Date: 2022-10-12 19:15:22
 * @LastEditTime: 2022-11-09 22:26:04
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\modules\HomePage\index.tsx
 */
import WithIconPark from '@/components/Hoc/WithIconPark'
import { getUserRecentInfo } from '@/service/home.service'
import { Store } from '@/store'
import { RecentCardInfo, UserRecentInfo } from '@/types/home.types'
import { RecentCardMap } from '@/utils/constant'
import { ChartLine, Edit } from '@icon-park/react'
import { Calendar, Timeline } from 'antd'
import { observer } from 'mobx-react-lite'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './HomePage.less'
import { projectEnterLists } from './HomePageConf'
import ProjectModal from './ProjectModal'
import VersionTimeLine from './VersionTimeLine'

function HomePage() {
  const navigate = useNavigate()
  const [date, setDate] = useState()
  const store = useContext(Store)
  const [openModal, setOpenModal] = useState<boolean>(false)
  const [cardList, setCardList] = useState<RecentCardInfo[]>([])

  useEffect(() => {
    const params = {
      userId: 1,
    }
    getUserRecentInfo(params).then(res => {
      const Mapping = res.data
      let arr = [] as RecentCardInfo[]
      Object.keys(Mapping).forEach(item => {
        let obj = {
          code: item,
          title: RecentCardMap[item as keyof typeof RecentCardMap],
          num: Mapping[item as keyof UserRecentInfo],
        } as RecentCardInfo
        arr.push(obj)
      })
      setCardList(arr)
    })
  }, [])

  const themeColor = useMemo(() => store.themeStore.theme, [store.themeStore.theme])

  const gotoPage = (item: any) => {
    if (!item.link) return
    navigate(item.link)
  }

  const onPanelChange = (value: any, mode: any) => {
    setDate(value)
  }

  const changeProjectEnter = () => {
    setOpenModal(false)
  }

  return (
    <div className="common-page home_page">
      <div className="left_module">
        <h1 className="home_title bg-light-200 shadow-lg ">首页</h1>
        <div className="home_quick_module bg-light-200 shadow-lg ">
          {cardList.map(item => {
            return (
              <div
                key={item.code}
                className="py-2 px-6 mx-2 rounded-xl w-min-200px shadow-lg hover-scale bg-light-200"
              >
                <div className="px-3 py-1 text-2xl" style={{ color: themeColor }}>{item.title}</div>
                <div className="text-red-300 text-2xl py-2 text-center">{item.num}</div>
              </div>
            )
          })}
          <div
            className="py-2 px-6 mx-2 rounded-xl w-160px shadow-lg hover-scale bg-light-200"
            style={{ color: themeColor }}
            onClick={() => navigate('/index/task/taskStatistics')}
          >
            <div className="px-3 py-1 text-xl">
              <WithIconPark IconComp={ChartLine} config={{ size: 24 }}></WithIconPark>
              统计
            </div>
            <div className="text-sm py-4 text-center">需求 / bug 统计</div>
          </div>
        </div>
        <div className="home_notice_module bg-light-200 shadow-lg ">
          <div className="quick_module_title common-border-bottom">
            <span>快捷入口</span>
            <WithIconPark
              IconComp={Edit}
              config={{ size: 16 }}
              className="cursor-pointer"
              onClick={() => setOpenModal(true)}
            ></WithIconPark>
          </div>
          <div className="home_quick_module !px-0">
            {projectEnterLists.map(item => {
              return (
                <div
                  className="card_project_item shadow-lg hover-scale"
                  key={item.code}
                  onClick={() => gotoPage(item)}
                >
                  <h1 className="flex items-center">
                    {item.icon}
                    <span className="ml-3 text-xl text-orange-400">{item.title}</span>
                  </h1>
                </div>
              )
            })}
          </div>
        </div>
        <div className="home_other bg-light-200 shadow-lg ">
          <div className="quick_module_title common-border-bottom">
            <span>系统公告</span>
            <WithIconPark
              IconComp={ChartLine}
              config={{ size: 16, strokeLinecap: 'butt' }}
              className="cursor-pointer"
            ></WithIconPark>
          </div>
          <div className="flex">
            <div className="more_info mr-2 shadow-lg hover-scale">
              <div className="quick_module_title common-border-bottom">版本更新</div>
              <div className="p-4 overflow-scroll h-140px">
                <VersionTimeLine />
              </div>
            </div>
            <div className="more_info ml-2 shadow-lg hover-scale">
              <div className="quick_module_title common-border-bottom">最新通知</div>
            </div>
          </div>
        </div>
      </div>
      <div className="right_module bg-light-200 shadow-lg ">
        <div className="mb-4 p-2 bg-light-200 rounded-md shadow-lg  hover-scale">
          个性签名： <span style={{ color: themeColor }}>善始者实繁 克终者盖寡</span>
        </div>
        <Calendar
          headerRender={() => <div className="text-center py-1">日历</div>}
          fullscreen={false}
          onPanelChange={onPanelChange}
          className="border-1 border-solid border-purple-200 shadow-lg"
        />
      </div>
      <ProjectModal isOpen={openModal} onClose={() => setOpenModal(false)} onConfirm={() => changeProjectEnter()} />
    </div>
  )
}

export default observer(HomePage)