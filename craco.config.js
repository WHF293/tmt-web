/*
 * @Author: hfWang
 * @Date: 2022-10-22 09:18:05
 * @LastEditTime: 2022-11-23 22:43:25
 * @Description: file content
 * @FilePath: \tmt-web\craco.config.js
 */
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
const CracoLessPlugin = require("craco-less")
const WebpackBar = require('webpackbar')
const path = require('path')

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
    open: false,
    port: 9527,
  },
  webpack: {
    plugins: {
      add: [
        new WindiCSSWebpackPlugin({
          virtualModulePath: 'src',
        }),
        new WebpackBar({
          color: '#85d', // 默认green，进度条颜色支持HEX
          basic: false, // 默认true，启用一个简单的日志报告器
          profile: false, // 默认false，启用探查器。
        }),
      ],
    },
    alias: {
      '@': path.resolve(__dirname, 'src'),
      // react 17 需要加入这个，用来解决 react-dnd 引入报错
      // 'react/jsx-runtime': 'react/jsx-runtime.js'
    },
    configure: (webpackConfig, { env, paths }) => {
      // 修改打包后的文件夹名， 默认为 build ， 改为 dist
      paths.appBuild = 'dist'
      webpackConfig.output = {
        ...webpackConfig.output,
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.[chunkhash:8].js',
      }
      return webpackConfig
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // 全局样式变量
            modifyVars: {
              // "@primary-color": "#1DA57A",
              // "@link-color": "#1DA57A",
              // "@border-radius-base": "2px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
  babel: {
    plugins: [
      [
        'import',
        {
          // iconPark 按需引入
          libraryName: '@icon-park/react',
          libraryDirectory: 'es/icons',
          camel2DashComponentName: false, // default: true,
        },
      ],
    ],
  },
  resolve: {
    plugins: [new NodePolyfillPlugin()],
  },
}
