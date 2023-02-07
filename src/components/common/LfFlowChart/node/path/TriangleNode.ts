/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:05:47
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\path\TriangleNode.ts
 */
import { h, RegisterConfig } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

const { model, view } = RectResize;

// 三角形
class TriangleModel extends model {
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

class TriangleView extends view {
  getResizeShape() {
    const { x, y, width, height } = this.props.model;
    const style = this.props.model.getNodeStyle();
    const attrs = {
      ...style,
      x,
      y,
      width,
      height,
      points: [
        [x - width / 2, y + height / 2],
        [x - width / 2, y - height / 2],
        [x + width / 2, y],
      ],
    };
    return h('g', {}, [h('polygon', { ...attrs })]);
  }
}

const triangle = {
  type: 'triangle',
  view: TriangleView,
  model: TriangleModel,
} as RegisterConfig;

export default triangle;
