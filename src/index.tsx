/*
 * @Author: hfWang
 * @Date: 2022-10-18 20:30:41
 * @LastEditTime: 2022-10-18 22:03:25
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\index.tsx
 */

import getPerformanceInfo from '@/utils/performance'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import StoreProvider from '@/store/StoreProvider'
import microApp from '@micro-zoe/micro-app'
import App from './App'
import '@/style/global.less'
import '@/style/theme.less'
import './virtual:windi.css'
import '@icon-park/react/styles/index.css'
import 'antd/dist/reset.css'

// 开启微前端服务
microApp.start()

const app = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
app.render(
  <StoreProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>
)

getPerformanceInfo().then((res: any) => {
  console.log('系统首屏渲染性能:', res)
})
