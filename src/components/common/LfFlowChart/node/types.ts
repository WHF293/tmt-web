/*
 * @Author: hfWang
 * @Date: 2022-12-20 17:58:37
 * @LastEditTime: 2022-12-20 17:58:54
 * @Description: file content
 * @FilePath: \rt-libs\src\LfFlowChartNode\types.ts
 */

export interface TextStyle {
  [key: string]: any;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
  lineHeight?: number;
  textAlign?: 'right' | 'left' | 'center';
  fontWeight?: number;
  textDecoration?: boolean;
  fontStyle?: any;
}

export interface ShapeStyle {
  fill?: string;
  fillGradient?: string;
  stroke?: string;
  strokeWidth?: number;
  strokeDashArray?: string;
  strokeDasharray?: string;
}

export interface ShapeProperties {
  backgroundColor?: string;
  gradientColor?: string;
  borderColor?: string;
  borderWidth?: number;
  borderStyle?: 'solid' | 'dashed' | 'dotted' | 'hidden';
}
