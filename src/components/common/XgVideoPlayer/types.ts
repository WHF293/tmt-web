import { CSSProperties } from 'react'
import type { IPlayerOptions } from 'xgplayer'

export interface XgVideoPlayerProps {
  config: IPlayerOptions
  className?: string
  style?: CSSProperties
}
