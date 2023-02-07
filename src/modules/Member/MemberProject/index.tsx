import { ProjectInfo } from '@/types/menber.types'
import { Tabs, Tag } from 'antd'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import MemberManage from './MemberManage'
import PrivManage from './PrivManage'

const items = [
  {
    label: '成员管理',
    key: 'member-manage',
    children: <MemberManage />,
  },
  { label: '权限管理', key: 'priv-manage', children: <PrivManage /> },
  { label: '代码仓库', key: 'code-warehouse', children: <div>代码仓库</div> },
]

const MemberProject = () => {
  const routerParams = useParams()
  const navigate = useNavigate()
  const locative = useLocation()

  const [projectInfo, setProjectInfo] = useState<Partial<ProjectInfo>>({})

  const quickJumpPage = (type: string) => {
    switch (type) {
      case 'task':
        navigate(`/index/task`)
        break
      case 'docs':
        navigate(`/index/docs`)
        break
      default:
        throw Error('类型不支持')
    }
  }

  const getProjectMemberInfo = () => {
    const params = {
      pid: routerParams.pid
    }
    // 接口请求
  }

  useEffect(() => {
    getProjectMemberInfo()
  }, [locative.key])

  return (
    <div className="w-1200px h-820px m-auto mt-4 bg-light-200 p-3">
      <div className="p-3 shadow-lg border-1 border-solid border-gray-200">
        项目名称：{projectInfo.name}
        <div>项目描述： {projectInfo.desc}</div>
        <div>
          快速前往：
          <Tag color="purple" className="cursor-pointer" onClick={() => quickJumpPage('task')}>
            需求管理
          </Tag>
          <Tag color="purple" className="cursor-pointer" onClick={() => quickJumpPage('docs')}>
            文档管理
          </Tag>
        </div>
      </div>
      <div className="mt-4 p-3 pt-0 h-680px overflow-scroll shadow-lg border-1 border-solid border-gray-200">
        <Tabs items={items} />
      </div>
    </div>
  )
}

export default MemberProject
