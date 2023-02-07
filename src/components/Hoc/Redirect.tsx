/*
 * @Author: hfWang
 * @Date: 2022-10-13 21:25:59
 * @LastEditTime: 2022-10-18 22:21:45
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\router\Redirect.tsx
 */
import { useEffect } from 'react'
import { useNavigate, To } from 'react-router-dom'

interface RedirectProps {
  to: To
}

/**
 * 路由重定向组件
 */
function Redirect(props: RedirectProps) {
  const navigate = useNavigate()
  useEffect(() => {
    navigate(props.to)
  })
  return null
}

export default Redirect
