import React, { CSSProperties, useMemo, useState } from 'react'
import { Popover } from 'antd'
import { SketchPicker, ColorResult } from 'react-color'
import { ColorPickerProps } from './types'
import './colorPicker.less'

export default function ColorPicker(props: ColorPickerProps) {
  const { defaultColor = '#8b5df6', showColorInfo = true } = props
  const [currentColor, setCurrentColor] = useState<string>(defaultColor)

  const getColor = (color: ColorResult, event: React.ChangeEvent<HTMLInputElement>) => {
    props.onChange(color)
    setCurrentColor(color.hex)
  }

  const content = <SketchPicker onChange={getColor} />

  const styles: CSSProperties = useMemo(() => ({
    backgroundColor: defaultColor
  }), [defaultColor])

  return (
    <Popover content={content} title={null}>
      <div className="items_center">
        <div className={`color_picker ${props.className}`} style={styles}></div>
        {showColorInfo && <span className="color_font">{currentColor}</span>}
      </div>
    </Popover>
  )
}
