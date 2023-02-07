import { Button } from 'antd'
import React from 'react'

interface FooterButtonProps {
    onConfirm: (...arg: any) => any
    onCancel: (...arg: any) => any
}

export default function FooterButton(props: FooterButtonProps) {
  return (
    <div className="flex justify-end">
      <Button type="primary" onClick={props.onConfirm} className="mx-1">
        确定
      </Button>
      <Button type="primary" ghost onClick={props.onCancel} className="mx-1">
        取消
      </Button>
    </div>
  )
}
