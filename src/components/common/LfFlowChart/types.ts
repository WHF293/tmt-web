import { Definition, RegisterConfig } from '@logicflow/core';
import { CSSProperties, FC, ReactNode } from 'react';
import { BaseNodeType } from './node';

export interface LfFlowChartExport {
  FlowChart: FC<LfFlowChartProps>
  baseNodesAndEdges: Record<string, RegisterConfig>
}

export interface LfFlowChartProps {
  disable?: boolean
  config: {
    width: number;
    height: number;
    [key: string]: any;
  };
  nodeList?: RegisterConfig[];
  data?: {
    nodes: any[];
    edges: any[];
  };
  saveInfo?: (data: any, type: 'json' | 'xml') => void;
  ctrlBar?: boolean;
  theme?: string;
  className?: string;
  styleConf?: {
    sideBarCss?: CSSProperties;
    editBarCss?: CSSProperties;
    ctrlBarCss?: CSSProperties;
    iconActiveColor?: string;
    miniMapPosition?: {
      x: number;
      y: number;
    };
  };
}

export type BaseConfig = {
  container: HTMLElement;
};

export type IConfig = Exclude<Definition, BaseConfig>;

/**
 * @param type 必须是已注册的节点 type
 */
export interface NodeItem {
  type: BaseNodeType;
  name?: string;
  icon?: ReactNode;
}

export interface NodeGroup {
  groupName: string;
  groupKey: string;
  nodeList: NodeItem[];
  expand: boolean;
}

export interface SideBarProps {
  showBaseNodes?: boolean;
  height: number;
  customNodes?: NodeGroup[];
  style?: CSSProperties;
  dragInNode: (type: string) => void;
}

export type ISaveType = 'image' | 'json' | 'xml';

export interface EditBarProps {
  style?: CSSProperties;
  height: number;
  onlyEdge?: boolean;
  elementsStyle: Record<string, unknown>;
  onChange: (styles: Record<string, unknown>) => void;
  setZIndex: (type: 'top' | 'bottom') => void;
}

export interface CtrlItem {
  icon: ReactNode;
  type: string;
  title?: string;
}

export interface CtrlBarProps {
  openMiniMap: () => void;
  toggleSidebar: () => void;
  selectMoreNode: () => void;
  lfZoomInOrOut: (type: boolean) => void;
  lfUndoOrRedo: (type: boolean) => void;
  saveFlowChartInfo: (type: ISaveType) => void;
  style?: CSSProperties;
  showSideBar?: boolean;
  selectMore?: boolean;
}

export type TextAlignType = 'left' | 'center' | 'right' | '';
export type BorderStyleType = 'hidden' | 'solid' | 'dashed' | 'dotted';
export type FontWeightType = 'normal' | 'bold';
export type TextDecorationType = 'none' | 'underline';
export type FontStyleType = 'normal' | 'italic';
export interface IFontTypeItem {
  text: string;
  slot: string;
  classes?: string;
}
