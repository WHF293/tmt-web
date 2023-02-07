/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:04:32
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\edge\Bezier.ts
 */
import { BezierEdge, BezierEdgeModel, RegisterConfig } from '@logicflow/core';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

// 贝塞尔曲线
class Model extends BezierEdgeModel {
  constructor(data: any, graphModel: any) {
    super(data, graphModel);
    this.strokeWidth = 1;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    return getTextStyleFunction(style, this.properties);
  }

  getEdgeStyle() {
    const attributes = super.getEdgeStyle();
    const properties = this.properties;
    const style = getShapeStyleFunction(attributes, properties);
    return { ...style, fill: 'none' };
  }
}

const ProBezier = {
  type: 'pro-bezier',
  view: BezierEdge,
  model: Model,
} as RegisterConfig;

export default ProBezier;
