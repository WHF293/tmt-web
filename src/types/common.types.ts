/*
 * @Author: hfWang
 * @Date: 2022-11-07 20:15:02
 * @LastEditTime: 2022-11-07 21:42:13
 * @Description: file content
 * @FilePath: \tmt\tmt-web\src\types\common\wangEditor.ts
 */

import { Dayjs } from 'dayjs'


export type IDateType = [Dayjs, Dayjs]
/***
 * antd 日期组件快速选择格式
 */
export type RangePreset = {
  label: string
  value: IDateType
}
