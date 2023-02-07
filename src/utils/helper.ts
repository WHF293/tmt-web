/*
 * @Author: hfWang
 * @Date: 2022-10-13 21:25:59
 * @LastEditTime: 2022-10-16 08:48:30
 * @Description: file content
 * @FilePath: \TestTools\packages\web\src\utils\helper.ts
 */

/**
 * @desc await-to-js
 * @param func Promise
 * @param error 自定义错误提示
 * @returns [err, res]
 */
export const to = <T, U = Error>(func: Promise<T>, error?: U): Promise<[null, T] | [U, null]> => {
  return func.then<[null, T]>((res: T) => [null, res]).catch<[U, null]>((err: U) => [error || err, null])
}

/**
 * @desc 校验是不是 FormData
 * @param data 任意数据
 * @returns boolean
 */
export const isFormData = (data: any) => Object.prototype.toString.call(data) === '[Object FormData]'


export const getEleById = (id: string) => {
  return document.getElementById(id)
}