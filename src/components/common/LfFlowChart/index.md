<!--
 * @Author: hfWang
 * @Date: 2022-12-19 21:32:44
 * @LastEditTime: 2022-12-20 20:04:29
 * @Description: file content
 * @FilePath: \rt-libs\src\lfFlowChart\index.md
-->

# LfChartFlow

## 基本使用

```jsx
import { LfFlowChart } from 'rt-libs';
const { FlowChart } = LfFlowChart;

const lfConfig = {
  width: 800,
  height: 500,
};

export default () => <FlowChart config={lfConfig} />;
```

## 主题定制

```jsx
import { LfFlowChart } from 'rt-libs';

const { FlowChart } = LfFlowChart;
const lfConfig = {
  width: 800,
  height: 500,
};

const theme = '#ea580c';
const styleConf = {
  iconActiveColor: '#fef3c7',
};

export default () => (
  <FlowChart config={lfConfig} theme={theme} styleConf={styleConf} />
);
```

## 自定义节点
