/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-21 17:05:14
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\lfComps\EditBar.tsx
 */
import { Help } from '@icon-park/react'
import { Button, Checkbox, Form, InputNumber, Select, theme, Tooltip } from 'antd'
import { CheckboxChangeEvent } from 'antd/es/checkbox'
import { useMemo, useState } from 'react'
import { ColorResult } from 'react-color'
import ColorPicker from '../../ColorPicker'
import {
  BorderStyleType,
  EditBarProps,
  FontStyleType,
  FontWeightType,
  IFontTypeItem,
  TextAlignType,
  TextDecorationType
} from '../types'
import { borderStyles, lineHeightMap, textAlignMap } from './editBar-tools'
import './editBar.less'

const { useToken } = theme

const emptyStyle = { marginLeft: '68px' }

export default function EditBar(props: EditBarProps) {
  const { elementsStyle } = props
  const {
    token: { colorPrimary },
  } = useToken()

  const zIndexLabel = (
    <>
      层级
      <Tooltip title="作用：在两个节点重叠时，用来修改层级，此选项无需二次确认">
        <Help theme="outline" size="14" fill="#94A3B8" />
      </Tooltip>
    </>
  )

  // 文本
  const [fontColor, setFontColor] = useState<string>((elementsStyle?.fontColor as string) || '#000')
  const [fontSize, setFontSize] = useState<number>((elementsStyle?.fontSize as number) || 12)
  const [textAlign, setTextAlign] = useState<TextAlignType>((elementsStyle?.textAlign as TextAlignType) || 'left')
  const [lineHeight, setLineHeight] = useState((elementsStyle?.lineHeight as number) || 1)
  const [fontWeight, setFontWeight] = useState<FontWeightType>(
    (elementsStyle?.fontWeight as FontWeightType) || 'normal'
  )
  const [textDecoration, setTextDecoration] = useState<TextDecorationType>(
    (elementsStyle?.textDecoration as TextDecorationType) || 'none'
  )
  const [fontStyle, setFontStyle] = useState<FontStyleType>((elementsStyle?.fontStyle as FontStyleType) || 'normal')

  // 线条
  const [borderWidth, setBorderWidth] = useState<number>((elementsStyle?.borderWidth as number) || 1)
  const [borderColor, setBorderColor] = useState<string>((elementsStyle?.borderColor as string) || colorPrimary)
  const [borderStyle, setBorderStyle] = useState<BorderStyleType>(
    (elementsStyle?.borderStyle as BorderStyleType) || 'solid'
  )

  const [backgroundColor, setBackgroundColor] = useState((elementsStyle?.backgroundColor as string) || '#fff')

  // 颜色相关
  const selectColor = (color: ColorResult, type: string) => {
    switch (type) {
      case 'fontColor':
        setFontColor(color.hex)
        break
      case 'backgroundColor':
        setBackgroundColor(color.hex)
        break
      case 'borderColor':
        setBorderColor(color.hex)
        break
      default:
        break
    }
  }

  // 数字相关
  const onChangeNumber = (val: number | null, type: string) => {
    if (val === null) return
    switch (type) {
      case 'fontSize':
        setFontSize(val)
        break
      case 'borderWidth':
        setBorderWidth(val)
        break
      case 'lineHeight':
        setLineHeight(val)
        break
      default:
        break
    }
  }

  // 字体类型
  const onChangeFont = (type: string) => {
    switch (type) {
      case 'fontWeight':
        setFontWeight(fontWeight === 'normal' ? 'bold' : 'normal')
        break
      case 'textDecoration':
        setTextDecoration(textDecoration === 'none' ? 'underline' : 'none')
        break
      case 'fontStyle':
        setFontStyle(fontStyle === 'normal' ? 'italic' : 'normal')
        break
      default:
        break
    }
  }

  // 其他
  const onChangeSt = (val: unknown, type: string) => {
    if (val === null) return
    switch (type) {
      case 'textAlign':
        setTextAlign(val as TextAlignType)
        break
      case 'borderStyle':
        setBorderStyle(val as BorderStyleType)
        break
      default:
        break
    }
  }

  const fontTypeMap = useMemo<IFontTypeItem[]>(() => {
    return [
      {
        text: 'B',
        slot: 'fontWeight',
        classes: `${fontWeight === 'bold' ? 'active_bg' : ''}`,
      },
      {
        text: 'U',
        slot: 'textDecoration',
        classes: `${textDecoration === 'underline' ? 'active_bg' : ''}`,
      },
      {
        text: 'I',
        slot: 'fontStyle',
        classes: `${fontStyle === 'italic' ? 'active_bg': ''}`,
      },
    ]
  }, [fontWeight, textDecoration, fontStyle])

  // 最终修改结果
  const confirmChange = () => {
    const styles = {
      fontColor,
      fontSize,
      backgroundColor,
      lineHeight,
      fontWeight,
      textDecoration,
      fontStyle,
      textAlign,
      borderColor,
      borderStyle,
      borderWidth,
    }
    props.onChange(styles)
  }

  const quickSelectColor = (type: string, e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      switch (type) {
        case 'borderColor':
          setBorderColor(colorPrimary)
          break
        case 'fontColor':
          setFontColor(colorPrimary)
          break
        case 'backgroundColor':
          setBackgroundColor(colorPrimary)
          break
        default:
          break
      }
    }
  }

  return (
    <div className='editBar_box' style={{ ...props?.style, height: props.height + 'px' }}>
      <div className='edit_title'>
        <Button ghost type="primary" onClick={confirmChange}>
          确认
        </Button>
      </div>
      <Form>
        <div className='edit_item_title'>线条</div>
        <Form.Item label="线条颜色" className='mb_2'>
          <ColorPicker
            defaultColor={borderColor}
            onChange={(color: ColorResult) => selectColor(color, 'borderColor')}
          ></ColorPicker>
        </Form.Item>
        <Form.Item label="" className='mb_2'>
          <Checkbox onChange={e => quickSelectColor('borderColor', e)} style={emptyStyle}>
            使用主题色
          </Checkbox>
        </Form.Item>
        <Form.Item label="线条大小" className='mb_2'>
          <InputNumber
            size="small"
            defaultValue={borderWidth}
            min={1}
            onChange={val => onChangeNumber(val, 'borderWidth')}
          ></InputNumber>
        </Form.Item>
        <Form.Item label="线条样式" className='mb_2'>
          <Select size="small" defaultValue={borderStyle} onChange={val => onChangeSt(val, 'borderStyle')}>
            {borderStyles.map(item => (
              <Select.Option value={item.value} key={item.value}>
                {item.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className='edit_item_title'>文本</div>
        <Form.Item label="文本颜色" className='mb_2'>
          <ColorPicker
            defaultColor={fontColor}
            onChange={(color: ColorResult) => selectColor(color, 'fontColor')}
          ></ColorPicker>
        </Form.Item>
        <Form.Item label="" className='mb_2'>
          <Checkbox onChange={e => quickSelectColor('fontColor', e)} style={emptyStyle}>
            使用主题色
          </Checkbox>
        </Form.Item>
        <Form.Item label="文本大小" className='mb_2'>
          <InputNumber
            min={12}
            size="small"
            defaultValue={fontSize}
            onChange={val => onChangeNumber(val, 'fontSize')}
          ></InputNumber>
        </Form.Item>
        <Form.Item label="文本行高" className='mb_2'>
          <Select defaultValue={lineHeight} size="small" onChange={val => onChangeNumber(val, 'lineHeight')}>
            {lineHeightMap.map(item => (
              <Select.Option value={item} key={item}>
                {item}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="文本对齐" className='mb_2'>
          <Select size="small" defaultValue={textAlign} onChange={val => onChangeSt(val, 'textAlign')}>
            {Object.keys(textAlignMap).map(item => (
              <Select.Option value={item} key={item}>
                {textAlignMap[item]}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <div className='edit_item_title'>其他</div>
        {!props.onlyEdge && (
          <>
            <Form.Item label="背景颜色" className='mb_2'>
              <ColorPicker
                defaultColor={backgroundColor}
                onChange={(color: ColorResult) => selectColor(color, 'backgroundColor')}
              ></ColorPicker>
            </Form.Item>
            <Form.Item label="" className='mb_2'>
              <Checkbox onChange={e => quickSelectColor('backgroundColor', e)} style={emptyStyle}>
                使用主题色
              </Checkbox>
            </Form.Item>
          </>
        )}
        <Form.Item label="字体类型" className='mb_2'>
          <div className='font_edit_box'>
            {fontTypeMap.map(item => (
              <div
                className={`lf_hover_scale lf_item_shadow font_item ${item.classes}`}
                key={item.slot}
                onClick={() => onChangeFont(item.slot)}
              >
                {item.text}
              </div>
            ))}
          </div>
        </Form.Item>
        <Form.Item label={zIndexLabel} className='mb_2'>
          <div>
            <Button
              type="primary"
              ghost
              size="small"
              style={{ marginRight: '6px' }}
              onClick={() => props.setZIndex('top')}
            >
              提升层级
            </Button>
            <Button type="primary" ghost size="small" onClick={() => props.setZIndex('bottom')}>
              降低层级
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  )
}
