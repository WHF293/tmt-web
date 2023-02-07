/*
 * @Author: hfWang
 * @Date: 2022-10-11 22:02:38
 * @LastEditTime: 2022-11-24 23:30:07
 * @Description: file content
 * @FilePath: \tmt-web\src\layout\LoginPage\EmailLogin.tsx
 */
import { getCaptcha, validateCaptcha } from '@/service/common.service'
import { login, register } from '@/service/user.service'
import { ValidateParams } from '@/types/captcha.types'
import type { IType, LoginParams, RegisterParams } from '@/types/user.types'
import { to } from '@/utils/helper'
import Token from '@/utils/Token'
import { Refresh } from '@icon-park/react'
import { useDebounceFn } from 'ahooks'
import { Button, Form, Input, message } from 'antd'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './LoginPage.less'

export default function EmailLogin() {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const [type, setType] = useState<IType>('login')

  // 验证码内容
  const [captchaUrl, setCaptchaUrl] = useState('')
  const [captchaId, setCaptchaId] = useState('')

  // 表单内容
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [pwd, setPwd] = useState('')
  const [pwd_2, setPwd_2] = useState('')
  const [captchaCode, setCaptchaCode] = useState('')

  const layout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  }

  useEffect(() => {
    resetCaptcha()
  }, [type])

  const changeType = () => {
    setType(type => (type === 'login' ? 'register' : 'login'))
  }

  const { run: handleSubmit } = useDebounceFn(
    async () => {
      if (pwd.length < 8) {
        message.warning('密码长度必须大于8个字符')
        return
      }
      if (type === 'register' && pwd !== pwd_2) {
        message.warning('两次密码不一致，请重新确认是否一致')
        return
      }

      let result: any
      let uid: number = -1;
      const captchaValidateRes = await validateCaptchaCode()
      if (!captchaValidateRes) return
      if (type === 'login') {
        const params = {
          email,
          password: pwd
        } as LoginParams
        const [, res] = await to(login(params))
        if (res) {
          result = res.data.token
          uid = res.data.uid
        }
      } else {
        const params = {
          email,
          userName: name,
          password: pwd,
          confirm_password: pwd_2
        } as RegisterParams
        const [, res] = await to(register(params))
        if (res) {
          result = res.data.token
          uid = res.data.uid
        }
      }
      if (result && uid !== -1) {
        Token.set(result)
        localStorage.setItem('uid', uid.toString())
        navigate('/index', { state: { uid } })
      }
    },
    {
      wait: 500,
    }
  )

  const resetCaptcha = async () => {
    const [, res] = await to(getCaptcha())
    if (res?.data) {
      const { id, imageBase64 } = res.data
      setCaptchaUrl(imageBase64)
      setCaptchaId(id)
    }
  }

  const validateCaptchaCode = async () => {
    const params = {
      id: captchaId,
      captchaCode: captchaCode
    } as ValidateParams
    const [, res] = await to(validateCaptcha(params))
    return res?.data.validateResult ? true : false
  }

  return (
    <Form {...layout} labelAlign="right" form={form} className="!p-4" onFinish={handleSubmit}>
      <Form.Item name="email" label="邮箱" rules={[{ required: true, message: '邮箱不能为空' }]}>
        <Input allowClear placeholder="请输入邮箱" onChange={e => setEmail(e.target.value)}></Input>
      </Form.Item>
      <Form.Item name="password" label="密码" rules={[{ required: true, message: '密码不能为空' }]}>
        <Input.Password
          allowClear
          placeholder="请输入密码"
          onChange={e => setPwd(e.target.value)}
        ></Input.Password>
      </Form.Item>
      {type === 'register' && (
        <>
          <Form.Item
            name="confirm_password"
            label="确认密码"
            rules={[{ required: true, message: '二次确认密码不能为空' }]}
          >
            <Input.Password
              allowClear
              placeholder="请再次输入密码"
              onChange={e => setPwd_2(e.target.value)}
            ></Input.Password>
          </Form.Item>
          <Form.Item name="userName" label="用户名" rules={[{ required: true, message: '用户名不能为空' }]}>
            <Input allowClear placeholder="请设置用户名" onChange={e => setName(e.target.value)}></Input>
          </Form.Item>
        </>
      )}
      {captchaUrl && (
        <Form.Item name="checkCode" label="验证码" rules={[{ required: true, message: '验证码不能为空' }]}>
          <div className="flex-items-center">
            <img src={captchaUrl} alt="验证码" className="h-8 w-12"></img>
            <Refresh
              theme="outline"
              size="12"
              fill="#9013fe"
              strokeLinejoin="miter"
              className="mx-2"
              onClick={resetCaptcha}
            />
            <Input
              allowClear
              placeholder="请输入验证码"
              onChange={e => setCaptchaCode(e.target.value)}
            ></Input>
          </div>
        </Form.Item>
      )}

      <Form.Item wrapperCol={{ offset: 0, span: 24 }}>
        <div className="mt-2 !px-8">
          <Button type="primary" htmlType="submit" block>
            {type === 'login' ? '登录' : '注册'}
          </Button>
        </div>
        <div className="login_expand">
          {type === 'login' && <span>忘记密码</span>}
          <span onClick={changeType}>{type !== 'login' ? '登录' : '注册'}</span>
        </div>
      </Form.Item>
    </Form>
  )
}
