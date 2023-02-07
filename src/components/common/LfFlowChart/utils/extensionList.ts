/*
 * @Author: hfWang
 * @Date: 2022-12-20 10:32:13
 * @LastEditTime: 2022-12-20 18:12:12
 * @Description: file content
 * @FilePath: \rt-libs\src\lfFlowChart\utils\extensionList.ts
 */
import { Menu, MiniMap, SelectionSelect, Snapshot } from '@logicflow/extension';
import baseNodesAndEdges from '../node';

/**
 * @desc 插件列表
 */
export const extensionList = [
  SelectionSelect, // 引入框选插件
  MiniMap, // 缩略图
  Snapshot, // 保存为图片
  Menu, // 节点右键菜单
];

/**
 * 自定义节点合线
 */
export const baseNodesAndEdgesList = Object.keys(baseNodesAndEdges).map(
  (key) => baseNodesAndEdges[key],
);
