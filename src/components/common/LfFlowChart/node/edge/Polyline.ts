/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:05:31
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\edge\Polyline.ts
 */
import {
  PolylineEdge,
  PolylineEdgeModel,
  RegisterConfig,
} from '@logicflow/core';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

// 折线
class Model extends PolylineEdgeModel {
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

const ProPolyLine = {
  type: 'pro-polyline',
  view: PolylineEdge,
  model: Model,
} as RegisterConfig;

export default ProPolyLine;
