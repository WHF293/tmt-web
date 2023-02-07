/*
 * @Author: hfWang
 * @Date: 2022-12-19 21:37:44
 * @LastEditTime: 2022-12-21 13:27:57
 * @Description: file content
 * @FilePath: \tmt-web\src\components\common\LfFlowChart\node\index.ts
 */

import ProCircle from './basic/ProCircleNode';
import ProDiamondNode from './basic/ProDiamondNode';
import ProEllipseNode from './basic/ProEllipseNode';
import ProRect from './basic/ProRectNode';
import ProTextNode from './basic/ProTextNode';
import RectRadiusNode from './basic/RectRadiusNode';

import TriangleNode from './path/TriangleNode';

import Bezier from './edge/Bezier';
import Line from './edge/Line';
import Polyline from './edge/Polyline';

import { RegisterConfig } from '@logicflow/core';

const baseNodesAndEdges = {
  // 基础节点
  ProRect, // 矩形
  ProCircle, // 原型
  ProDiamondNode, // 菱形
  RectRadiusNode, // 圆角矩形
  ProEllipseNode, // 椭圆
  ProTextNode, // 文本节点

  // 扩展节点
  TriangleNode, // 三角形

  // 线
  Bezier, //  贝塞尔曲线
  Line, // 直线
  Polyline, // 折线
} as Record<string, RegisterConfig>;

export default baseNodesAndEdges;

export type BaseNodeType =
  | 'pro-rect'
  | 'pro-circle'
  | 'pro-diamond'
  | 'pro-rect-radius'
  | 'pro-ellipse'
  | 'pro-text'
  | 'pro-up'
  | 'pro-down'
  | 'pro-left'
  | 'pro-right'
export type edgeType = 'pro-bezier' | 'pro-line' | 'pro-polyline';
export type PathNodeType = 'triangle';

export type LfNodeType = BaseNodeType | edgeType | PathNodeType | string;
