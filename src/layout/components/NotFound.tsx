/*
 * @Author: hfWang
 * @Date: 2022-10-13 21:25:59
 * @LastEditTime: 2022-11-27 18:35:01
 * @Description: file content
 * @FilePath: \tmt-web\src\components\basic\NotFound.tsx
 */
import { Button, Result } from 'antd'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const BackPrevPage: FC = () => {
  const navigate = useNavigate()
  const gotoPage = (value: any): void => {
    navigate(value)
  }

  return (
    <>
      <Button className="mx-2" shape="round" type="primary" onClick={() => gotoPage('/index')}>
        首页
      </Button>
      <Button className="mx-2" shape="round" type="primary" ghost onClick={() => gotoPage(-1)}>
        返回
      </Button>
    </>
  )
}

/**
 * 不存在或无权限页面
 */
const NotFound: FC = () => {
  return (
    <div className="h-full w-full flex justify-center items-center common-bg">
      <Result status="500" subTitle="页面不存在或者没有该页面的查看权限" extra={<BackPrevPage />}></Result>
    </div>
  )
}

export default NotFound
