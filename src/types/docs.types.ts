export interface DocsDetailByIdParams {
  docsId: number
}

export type EditorType = 'md' | 'txt'

export interface IDocsItem {
  title: string
  id: number
  code: string
  docsType: EditorType
}

export interface DocsListByTypeParams {
  type: string
}

export interface CreateDocsGroupModalProps {
  open: boolean
  closeModal: () => void
  onConfirm: (newDocsInfo: NewDocsGroup) => void
}

export interface NewDocsGroup {
  docsGroup: string
  subGroup: string[]
}

export interface CreateNewDocsModalProps {
  docsGroup: string
  open: boolean
  closeModal: () => void
  onConfirm: (newDocsInfo: NewDocsInfo) => void
}

export interface NewDocsInfo {
  docsGroup: string
  docsName: string
  docsType: string
  docsInfo: string
}

export interface CreateNewDocsResult {
  docsInfo: IDocsItem
}
