<!--
 * @Author: hfWang
 * @Date: 2022-12-19 21:32:44
 * @LastEditTime: 2022-12-19 22:01:33
 * @Description: file content
 * @FilePath: \rt-libs\src\lfFlowChart\index.$tab-api.md
-->
# api

流程图组件 api

| 属性          | 描述         | 类型    | 是否必填 | 默认值  |
| ------------- | ------------ | ------- | -------- | ------- |
| defaultColor  | 默认颜色     | string  | 否       | #8b5df6 |
| showColorInfo | 显示颜色 hex | boolean | 否       | 是      |

| 时间     | 描述     | 类型                                                                      | 是否必填 | 默认值 |
| -------- | -------- | ------------------------------------------------------------------------- | -------- | ------ |
| onChange | 选择事件 | (color: ColorResult, event?: React.ChangeEvent<HTMLInputElement>) => void | 是       |        |

