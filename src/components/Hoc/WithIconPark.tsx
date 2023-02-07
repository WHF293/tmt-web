import { Store } from '@/store'
import { Icon } from '@icon-park/react/lib/runtime'
import { observer } from 'mobx-react-lite'
import { CSSProperties, useContext } from 'react'

interface WithIconParkProps {
  IconComp: Icon
  config?: {
    theme?: 'outline' | 'filled' | 'two-tone' | 'multi-color'
    size?: number
    fill?: string | string[]
    strokeLinecap?: 'square' | 'butt' 
    strokeLinejoin?:  'miter'
  }
  className?: string
  style?: CSSProperties
  [key: string]: any
}

function WithIconPark(props: WithIconParkProps) {
  const { IconComp, config = {}, ...arg } = props

  const {
    themeStore: { theme: iconTheme },
  } = useContext(Store)

  const { theme = 'outline', size = '16', fill = iconTheme, strokeLinecap = 'square', strokeLinejoin } = config

  return (
    <IconComp
      fill={fill}
      theme={theme}
      size={size}
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      className={props?.className}
      style={props?.style}
      {...arg}
    />
  )
}

export default observer(WithIconPark)
