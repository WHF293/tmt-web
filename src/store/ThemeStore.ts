import { themeMapping } from '@/utils/theme'
import { action, makeAutoObservable, observable } from 'mobx'

export class ThemeStore {
  theme = '#a222f7'
  themeName = 'purple'

  constructor() {
    makeAutoObservable(this, {
      theme: observable,
      themeName: observable,
      updateTheme: action,
    })
  }

  updateTheme = (theme: string) => {
    // 默认主题 基佬紫
    this.theme = themeMapping[theme]?.color || themeMapping.purple.color
    this.themeName = theme
  }
}
