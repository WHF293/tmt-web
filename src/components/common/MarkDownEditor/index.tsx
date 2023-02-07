/*
 * @Author: hfWang
 * @Date: 2022-11-10 19:42:50
 * @LastEditTime: 2022-11-14 21:42:11
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\components\common\MarkDownEditor\index.tsx
 */
import { MdEditorToolbars } from '@/utils/constant'
import MdEditor from 'md-editor-rt'
import 'md-editor-rt/lib/style.css'
import { useEffect, useState } from 'react'
import { MarkDownEditorProps } from './types'


export default function MarkDownEditor(props: MarkDownEditorProps) {
  const [text, setText] = useState(props.defaultText || '# hello world')

  useEffect(() => {
    setText(props.defaultText)
  }, [props.defaultText])

  return (
    <MdEditor
      editorId={props.editorId}
      modelValue={text}
      onChange={setText}
      onSave={props.onSaveInfo}
      toolbars={MdEditorToolbars}
      style={{ border: '1px #ccc solid', ...props.style }}
      placeholder={props.placeholder || '请开始你的表演'}
      previewTheme={props.previewTheme || 'vuepress'}
      previewOnly={props.readOnly}
      codeTheme={props.codeTheme || 'atom'}
    />
  )
}
