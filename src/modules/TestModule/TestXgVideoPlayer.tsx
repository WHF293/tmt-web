/*
 * @Author: hfWang
 * @Date: 2022-12-07 20:18:15
 * @LastEditTime: 2022-12-21 09:16:27
 * @Description: file content
 * @FilePath: \tmt-web\src\modules\TestFlowChart\index.tsx
 */
import XgVideoPlayer from '@/components/common/XgVideoPlayer'
import type { IPlayerOptions } from 'xgplayer'
import './TestXgVideoPlayer.less'

const XgConfig = {
  id: 'xgVideo-01',
  url: '111',
  fluid: true
} as IPlayerOptions

export default function TestFlowChart() {
  return (
    <div className="w-300 m-auto mt-10">
      <div className='test_box'></div>
      <XgVideoPlayer config={XgConfig}/>
    </div>
  )
}
