import { CreateNewProjectParams } from '@/types/menber.types'
import { AddThree, Plus } from '@icon-park/react'
import { Affix, Button } from 'antd'
import { Random } from 'mockjs'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Member.less'
import CreateNewProject from './MemberModal/CreateNewProject'
interface ProjectItem {
  id: number | string
  name: string
  allMemberNum: number
}

const arr = [] as ProjectItem[]
for (let i = 0; i < 7; i++) {
  arr.push({
    id: Random.id(),
    name: Random.cname(),
    allMemberNum: Random.integer(1, 100),
  })
}

export default function Member() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState<ProjectItem[]>(arr)
  const [openCreateProjectModal, setOpenCreateProjectModal] = useState(false)

  const confirmCreateProject = (params: CreateNewProjectParams) => {
    console.log(params)
    setOpenCreateProjectModal(false)
  }
  return (
    <>
      <div className="common-page member_page">
        <div className="member_project_box">
          {projects.map(item => {
            return (
              <div
                key={item.id}
                className="member_project_item  hover-scale bg-light-100"
                onClick={() => navigate(`/index/member/memberProject/${item.id}`)}
              >
                <p className="text-lg text-orange-300">{item.name}</p>
                <p>创建时间： 2022-01-03</p>
                <p>
                  团队成员数量：<span className="text-sky-400">{item.allMemberNum}</span>
                </p>
              </div>
            )
          })}
        </div>
        <Affix offsetBottom={40} style={{ position: 'absolute', right: 40, top: 60 }}>
          <Button
            type="primary"
            size='large'
            shape="circle"
            icon={<Plus theme="outline" size="16" fill="#fff"/>}
            onClick={() => setOpenCreateProjectModal(true)}
          ></Button>
        </Affix>
      </div>
      <CreateNewProject
        width={700}
        open={openCreateProjectModal}
        closeModal={() => setOpenCreateProjectModal(false)}
        onConfirm={confirmCreateProject}
      ></CreateNewProject>
    </>
  )
}
