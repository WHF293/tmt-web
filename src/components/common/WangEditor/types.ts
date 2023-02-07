/**
 * 富文本编辑器 props
 */
export interface WangEditorProps {
  editorId: string
  saveWEInfo?: (data: WangEditorDataType) => void
  defaultHtml?: string
  readOnly?: boolean
  getText?: boolean
  height?: number
}

export interface WangEditorDataType {
  html: string
  text: string
}
