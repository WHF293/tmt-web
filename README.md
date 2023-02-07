<!--
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-14 21:36:59
 * @Description: file content
 * @FilePath: \tmt\tmt-web\README.md
-->

# TMT-web

#### 介绍

TMT（Team Manage Tools）即团队管理工具，主要包含 3 大板块的功能 —— 项目管理、文档管理、人员管理

### 系统展示

首页

[![xvOKqs.png](https://s1.ax1x.com/2022/11/07/xvOKqs.png)](https://imgse.com/i/xvOKqs)

[![xvOYzF.png](https://s1.ax1x.com/2022/11/07/xvOYzF.png)](https://imgse.com/i/xvOYzF)

任务列表

[![xvO1I0.png](https://s1.ax1x.com/2022/11/07/xvO1I0.png)](https://imgse.com/i/xvO1I0)

新建任务

[![xvOGGT.png](https://s1.ax1x.com/2022/11/07/xvOGGT.png)](https://imgse.com/i/xvOGGT)

#### 软件架构

react18 + ts + mobx6 + react-router-dom6 + antd4

#### 安装教程

1.  拉取项目 git clone xxxxxxxxxxxxxxxxxxx
2.  安装依赖 pnpm i
3.  本地运行 pnpm dev
4.  项目打包 pnpm build
5.  格式化 pnpm lint

#### 相关文档

| 包名                                                                        | 作用                         |
| --------------------------------------------------------------------------- | ---------------------------- |
| 基础包                                                                      |                              |
| [react](https://react.docschina.org/tutorial/tutorial.html)                 |                              |
| [react-router-dom](https://reactrouter.com/en/main/start/tutorial)          |                              |
| [mobx](https://www.mobxjs.com/)                                             | 全局状态管理                 |
| 工具包                                                                      |                              |
| [ahooks](https://ahooks.js.org/zh-CN/)                                      | 阿里 react 工具库            |
| [lodash](https://www.lodashjs.com/)                                         |                              |
| [axios](https://www.axios-http.cn/)                                         |                              |
| [dayjs](https://dayjs.fenxianglu.cn/)                                       |                              |
| UI 包                                                                       |                              |
| [antd](https://ant-design.gitee.io/index-cn)                                | ant design 5                 |
| [iconPark](https://iconpark.oceanengine.com/official)                       | 字节免费可商用的图标库       |
| [windicss](https://cn.windicss.org/)                                        | 可按需打包的原子化 css 库    |
| [scss](https://www.sasscss.com/documentation/syntax)                        |                              |
| 工具包 2                                                                    |                              |
| [xgplayer](https://v2.h5player.bytedance.com/)                              | 西瓜视频播放器               |
| [md-editor-rt](https://imzbf.github.io/md-editor-rt/docs)                   | React markdown 编辑器        |
| [wangEditor](https://www.wangeditor.com/)                                   | 富文本编辑器                 |
| [react-dnd](https://react-dnd.github.io/react-dnd/about)                    | react 拖拽库                 |
| [logicFlow](http://logic-flow.cn/)                                          | 滴滴开源的流程图库           |
| [echarts](https://echarts.apache.org/zh/index.html)                         | 百度图表库                   |
| [react-transition-group](http://reactcommunity.org/react-transition-group/) | react 官方的过度动画库       |
| [react-color](http://casesandberg.github.io/react-color/)                   | react 取色板                 |
| 工具包 3                                                                    |                              |
| [antv G2Plot](https://antv-g2plot.gitee.io/zh/docs/manual/getting-started)  | 类似 echarts，基于 Antv G2   |
| [antv XFlow](https://xflow.antv.vision/docs/tutorial/intro/getting-started) | 类似 logicFlow，基于 Antv X6 |
|                                                                             |                              |

#### git 规范

1. 分支命名规范

   - 功能分支：

     ```txt
     feature/姓名拼音/当前日期/需求编号
     eg: feature/whf/20221110/t122
     ```

   - bug 修复分支：

     ```txt
     hotfix/姓名拼音/当前日期/需求编号
     eg: hotfix/whf/20221110/t122
     ```

2. commit 规范

`package.json` 中配置了这样一条脚本 `"git": "git add . & git-cz"`
所以使用 `pnpm git` 就可以替代 `git add .` 和 `git commit -m 'xxxxxxx'`
