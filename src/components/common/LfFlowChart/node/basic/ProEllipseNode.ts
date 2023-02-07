/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:03:38
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\ProEllipseNode.ts
 */
import { RegisterConfig } from '@logicflow/core';
import ProCircleNode from './ProCircleNode';

const { model, view } = ProCircleNode;

// 椭圆
class EllipseNewModel extends model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 60;
    this.ry = 30;
  }
  getNodeStyle() {
    const style = super.getNodeStyle();
    return { ...style };
  }
}

const ProEllipse = {
  type: 'pro-ellipse',
  view,
  model: EllipseNewModel,
} as RegisterConfig;

export default ProEllipse;
