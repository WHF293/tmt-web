/*
 * @Author: hfWang
 * @Date: 2022-10-10 20:53:21
 * @LastEditTime: 2022-11-22 19:27:43
 * @Description: file content
 * @FilePath: \tmt-web-vite\src\App.tsx
 */
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import { observer } from 'mobx-react-lite'
import { useContext, useMemo } from 'react'
import RouterGuard from '@/components/Hoc/RouterGuard'
import { Store } from './store'

dayjs.locale('zh-cn')

function App() {
  const store = useContext(Store)

  const token = useMemo(
    () => ({
      colorPrimary: store.themeStore.theme,
    }),
    [store.themeStore.theme]
  )

  return (
    <ConfigProvider locale={zhCN} theme={{ token }}>
      <RouterGuard />
    </ConfigProvider>
  )
}

export default observer(App)
