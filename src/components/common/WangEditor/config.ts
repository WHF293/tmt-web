import { IEditorConfig, IToolbarConfig } from '@wangeditor/editor'
import { message } from 'antd'

// 编辑器配置
export const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  autoFocus: true, // 自动聚焦，默认 true
  scroll: true, // 是否支持滚动，默认 true
  customAlert: (s: string, t: string) => {
    // 自定义弹出提示
    switch (t) {
      case 'success':
        message.success(s)
        break
      case 'info':
        message.info(s)
        break
      case 'warning':
        message.warning(s)
        break
      case 'error':
        message.error(s)
        break
      default:
        message.info(s)
        break
    }
  },
}

// 工具栏配置
export const toolbarConfig: Partial<IToolbarConfig> = {}
