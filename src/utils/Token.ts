/*
 * @Author: hfWang
 * @Date: 2022-10-24 20:23:27
 * @LastEditTime: 2022-11-23 23:17:32
 * @Description: file content
 * @FilePath: \tmt-web\src\utils\Token.ts
 */


class Token {
  /**
   * @desc 获取 token
   */
  public get(): string | null {
    const token = localStorage.getItem('token')
    return token
  }

  /**
   * @desc 保存 token
   */
  public set(value: string): void {
    localStorage.setItem('token', value)
  }

  /**
   * @desc 移除 token
   */
  public del() {
    localStorage.removeItem('token')
  }
}

export default new Token()
