import { UserInfo } from './user.types'
export type SyncCreateDocs = 'Y' | 'N' | ''

export interface CreateNewProjectParams {
  newProjectName: string
  newProjectDesc: string
  memberIds: number[]
  syncCreateDocs: SyncCreateDocs
  createUserId: number
}

export interface CreateNewProjectProps {
  open: boolean
  width?: number
  closeModal: () => void
  onConfirm: (params: CreateNewProjectParams) => void
}

export interface ProjectInfo {
  name: string
  id: number
  desc: string
  docsInfo: {
    id: number
    name: string
    desc?: string
  }
  members: UserInfo[]
}
