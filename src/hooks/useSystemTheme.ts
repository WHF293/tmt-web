import { Theme } from '@/types/AppLayout.types'
import { useState } from 'react'

export default function useSystemTheme() {
  const [theme, setTheme] = useState<Theme>('')

  const toggleTheme = () => {
    const html = document.getElementsByTagName('html')[0]
    const currentTheme = html.id as Theme
    const prevTheme = !!currentTheme ? '' : 'dark'
    html.setAttribute('id', prevTheme)
    setTheme(prevTheme)
  }

  return {
    theme,
    toggleTheme,
  }
}
