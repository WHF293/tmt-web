/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:04:04
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\basic\ProTextNode.ts
 */
import { RegisterConfig, TextNode, TextNodeModel } from '@logicflow/core';
import {
  getShapeStyleFunction,
  getTextStyleFunction,
} from '../utils/disposeNodeStyles';

// 文本节点
class TextNewNode extends TextNode {}
class TextNewModel extends TextNodeModel {
  getNodeStyle() {
    const style = super.getNodeStyle();
    const properties = this.getProperties();
    return getShapeStyleFunction(style, properties);
  }

  getTextStyle() {
    const style = super.getTextStyle();
    const properties = this.getProperties();
    if (properties.backgroundColor) {
      style.backgroundStyle = {
        fill: properties.backgroundColor,
      };
    }
    return getTextStyleFunction(style, properties);
  }

  setAttributes() {
    super.setAttributes();
    if (!this.text.value) {
      this.text.value = 'text';
    }
  }
}

const ProText = {
  type: 'pro-text',
  view: TextNewNode,
  model: TextNewModel,
} as RegisterConfig;

export default ProText;
