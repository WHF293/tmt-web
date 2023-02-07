import { ReactNode, useMemo } from 'react'

interface SearchItemProps {
  label: string | ReactNode
  children?: ReactNode
  doubleWidth?: boolean
  required?: boolean
  labelWidth?: string
}

export default function SearchItem(props: SearchItemProps) {
  const classes = `w-1/4 mb-2 ${props.doubleWidth ? 'w-1/2' : ''}`
  const labelClasses = useMemo(
    () => `inline-block px-2 text-right ${props.required ? 's-required' : ''} ${props.labelWidth || 'w-22'} }`,
    [props.required, props.labelWidth]
  )
  return (
    <div className={classes}>
      <div className={labelClasses}>{props.label}</div>
      <div className="inline-block">{props?.children}</div>
    </div>
  )
}
