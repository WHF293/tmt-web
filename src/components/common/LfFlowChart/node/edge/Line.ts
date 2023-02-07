/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:04:40
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\edge\Line.ts
 */
import { LineEdge, LineEdgeModel, RegisterConfig } from '@logicflow/core';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

// 直线
class Model extends LineEdgeModel {
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

const ProLine = {
  type: 'pro-line',
  view: LineEdge,
  model: Model,
} as RegisterConfig;

export default ProLine;
