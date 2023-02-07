export interface ThemeModalProps {
  show: boolean
  closeModal: () => void
}

export interface ThemeConfig {
  themeColor: string
  activeColor?: string
  background?: string
  colorList?: string[]
}
