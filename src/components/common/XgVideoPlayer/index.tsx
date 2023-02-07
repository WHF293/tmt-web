import { useEffect, useMemo, useRef } from 'react'
import Player from 'xgplayer'
import { XgVideoPlayerProps } from './types'

export default function XgVideoPlayer(props: XgVideoPlayerProps) {
  const xgPlayer = useRef<null | Player>(null)
  const xgPlayerId = useMemo(() => `xgPlayer-${props.config.id || ''}`, [props.config.id])

  useEffect(() => {
    xgPlayer.current = new Player({
      ...props.config,
      id: xgPlayerId,
    })
    return () => {
      xgPlayer.current = null
    }
  }, [])

  return <div id={xgPlayerId}></div>
}
