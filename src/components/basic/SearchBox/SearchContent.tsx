import { ReactNode } from 'react'

interface SearchContentProps {
  children: ReactNode
  className?: string
}

export default function SearchContent(props: SearchContentProps) {
  return <div className={`p-2 flex flex-wrap ${props.className}`}>{props.children}</div>
}
