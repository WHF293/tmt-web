/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:03:49
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\ProRectNode.ts
 */
import { RegisterConfig } from '@logicflow/core';
import { RectResize } from '@logicflow/extension';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

const { model, view } = RectResize;

// 矩形
class RectNewModel extends model {
  setToBottom() {
    this.zIndex = 0;
  }

  getNodeStyle() {
    // 获取基础矩形默认的样式
    const style = super.getNodeStyle();
    // 获取外部传进来的样式
    const properties = this.getProperties();
    // getShapeStyleFunction 合并外部传进来的样式
    return getShapeStyleFunction(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    return getTextStyleFunction(style, properties);
  }
}

const ProRect = {
  type: 'pro-rect',
  view,
  model: RectNewModel,
} as RegisterConfig;

export default ProRect;
