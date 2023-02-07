/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:03:08
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\ProCircleNode.ts
 */
import { RegisterConfig } from '@logicflow/core';
import { EllipseResize } from '@logicflow/extension';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

const { model, view } = EllipseResize;

// 圆形
class CircleNewModel extends model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
  }

  setToBottom() {
    this.zIndex = 0;
  }

  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return getShapeStyleFunction(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return getTextStyleFunction(style, properties);
  }
}

const ProCircle = {
  type: 'pro-circle',
  view,
  model: CircleNewModel,
} as RegisterConfig;

export default ProCircle;
