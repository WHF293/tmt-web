import { ColorResult } from 'react-color'

export interface ColorPickerProps {
  onChange: (color: ColorResult) => void
  className?: string
  defaultColor?: string
  showColorInfo?: boolean
}
