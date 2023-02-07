import { Metric, ReportHandler } from 'web-vitals'

export const performanceMapping = {
  CLS: '累积布局偏移',
  FCP: '渲染出第一个内容',
  FID: '系统和用户首次首次交互时间',
  LCP: '最大内容渲染时间',
  TTFB: '首字节时间',
}

const performanceInfo = {} as any

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // CLS : CLS会计算出页面整个生命周期中所有发生的预料之外的布局偏移的得分的总和。每当一个可视元素位置发生改变，就是发生了布局偏移。
      getCLS(onPerfEntry)

      // FCP: 表示渲染出第一个内容，这里的“内容”可以是文本、图片、canvas。\
      getFID(onPerfEntry)

      // FID: 用户第一次与站点进行如点击链接、按下按钮等操作到浏览器实际响应该操作（开始执行事件监听回调）的时间
      getFCP(onPerfEntry)

      // LCP: 最大内容渲染时间
      getLCP(onPerfEntry)

      // TTFB: 在浏览器输入目标网站的网址并回车后（或者搜索页面点击打开新的目标页面时）直到获得首个字节的时间
      getTTFB(onPerfEntry)
    })
  }
}

const setPerformanceInfo = (data: Metric) => {
  const info = {
    time: data.value,
    desc: performanceMapping[data.name] || '',
  }
  performanceInfo[data.name] = info
}

/**
 * 获取系统加载性能指标
 */
const getPerformanceInfo = () => {
  return new Promise(resolve => {
    reportWebVitals(setPerformanceInfo)
    resolve(performanceInfo)
  })
}

export default getPerformanceInfo
