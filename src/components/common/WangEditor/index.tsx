import { IDomEditor } from '@wangeditor/editor'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import '@wangeditor/editor/dist/css/style.css'; // 引入 css
import { Button, message } from 'antd'
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { editorConfig, toolbarConfig } from './config'
import { WangEditorDataType, WangEditorProps } from './types'
import './WangEditor.less'

/**
 * 富文本编辑器组件
 */
function WangEditor(props: WangEditorProps) {
  // editor 实例
  const editor = useRef<IDomEditor | null>(null)

  // 编辑器内容
  const [html, setHtml] = useState(props.defaultHtml || '')
  const [text, setText] = useState('')

  useEffect(() => {
    if (editor.current !== null) {
      props.readOnly ? editor.current.disable() : editor.current.enable()
    }
  }, [props.readOnly])

  useEffect(() => {
    // 及时销毁 editor ，重要！
    return () => {
      if (editor.current == null) return
      editor.current.destroy()
      editor.current = null
    }
  }, [editor])

  useEffect(() => {
    setHtml(props.defaultHtml || '')
  }, [props.defaultHtml])

  const saveWEInfo = () => {
    const textData = editor.current?.getText().toString()
    if (!textData) return
    if (!props.saveWEInfo) return
    const data = {
      html: html.toString(),
      text
    } as WangEditorDataType
    props.saveWEInfo(data)
  }

  const onChangeInfo = useCallback((editor: IDomEditor) => {
    setHtml(editor.getHtml())
    setText(editor.getText().toString())
  }, [editor.current])

  const onCreated = (_editor: IDomEditor) => editor.current = _editor

  const toolbarStyles: CSSProperties = useMemo(() => {
    return {
      borderBottom: '1px solid #ccc',
      display: props.readOnly ? 'none' : 'block'
    }
  }, [props.readOnly])

  const editorStyles: CSSProperties = useMemo(() => {
    return {
      height: `${props.height || 500}px`,
      overflowY: 'hidden'
    }
  }, [props.height])

  return (
    <div id={props.editorId}>
      <div className='editor_box'>
        <Toolbar
          editor={editor.current}
          defaultConfig={toolbarConfig}
          mode="default"
          style={toolbarStyles}
        />
        <Editor
          defaultConfig={editorConfig}
          value={html}
          onCreated={onCreated}
          onChange={onChangeInfo}
          mode="default"
          style={editorStyles}
        />
      </div>
      {!props.readOnly && (
        <div className="save_box">
          {props.getText && (
            <CopyToClipboard text={text} onCopy={() => message.success('复制成功')}>
              <Button ghost type="primary" className="mx-1">
                提取文本
              </Button>
            </CopyToClipboard>
          )}
          <Button type="primary" className="mx-1" onClick={saveWEInfo}>
            保存
          </Button>
        </div>
      )}
    </div>
  )
}

export default WangEditor
