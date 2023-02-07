/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:03:20
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\ProDiamondNode.ts
 */
import { RegisterConfig } from '@logicflow/core';
import { DiamondResize } from '@logicflow/extension';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

const { model, view } = DiamondResize;

// 菱形
class DiamondModel extends model {
  initNodeData(data: any) {
    super.initNodeData(data);
    this.rx = 35;
    this.ry = 35;
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

  setToBottom() {
    this.zIndex = 0;
  }
}

const ProDiamond = {
  type: 'pro-diamond',
  view,
  model: DiamondModel,
} as RegisterConfig;

export default ProDiamond;
