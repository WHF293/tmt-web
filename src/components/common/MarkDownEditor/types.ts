import { CSSProperties } from 'react'

/**
 * markdown 编辑器入参
 */
export interface MarkDownEditorProps {
  editorId: string
  defaultText: string
  height?: number
  readOnly?: boolean // 是否显示预览
  placeholder?: string
  previewTheme?: PreviewTheme // 整体显示主题
  style?: CSSProperties
  codeTheme?: CodeTheme // 代码高亮主题
  onSaveInfo: (text: string) => void
}

/**
 * 预览主题
 */
export type PreviewTheme = 'default' | 'github' | 'vuepress' | 'mk-cute' | 'smart-blue' | 'cyanosis'

/**
 * 代码块主题
 */
export type CodeTheme = 'atom' | 'a11y' | 'github' | 'gradient' | 'kimbie' | 'paraiso' | 'qtcreator' | 'stackoverflow'
