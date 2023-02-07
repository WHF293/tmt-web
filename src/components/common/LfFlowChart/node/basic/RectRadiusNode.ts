/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:04:17
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\RectRadiusNode.ts
 */
import { RegisterConfig } from '@logicflow/core';
import RectNode from './ProRectNode';

const { model, view } = RectNode;

// 带圆角的矩形
class RectRadiusModel extends model {
  setAttributes() {
    super.setAttributes();
    this.radius = 20;
  }
}

const ProRectRadius = {
  type: 'pro-rect-radius',
  view,
  model: RectRadiusModel,
} as RegisterConfig;

export default ProRectRadius;
