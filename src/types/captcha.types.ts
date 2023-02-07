/*
 * @Author: hfWang
 * @Date: 2022-11-17 21:21:08
 * @LastEditTime: 2022-11-24 23:30:25
 * @Description: file content
 * @FilePath: \tmt-web\src\types\captcha.types.ts
 */
export interface GetCaptchaRes {
  id: string
  imageBase64: string
}

export interface ValidateParams {
  id: string
  captchaCode: string
}

export interface ValidateRes {
  validateResult: boolean
}
