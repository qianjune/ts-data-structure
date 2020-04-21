/**
 * @description jwt相关处理
 */
import jwt from 'jsonwebtoken'

class JwtHandler {
  static secretOrPrivateKey = 'private_key'
  // 解密
  static verify(token: string): any {
    return jwt.verify(token, this.secretOrPrivateKey)
  }
  // 返回加密token
  static encrypt(data: any, expiresIn: string | number = '1h'): string {
    return jwt.sign(data, this.secretOrPrivateKey, { expiresIn })
  }
  //
  private static tokenValidateCheck(token: string): boolean {
    // 验证id和有效时间
    return false
  }
  static async loginCheck(ctx: any, next: () => void): Promise<void> {
    const authorization = ctx.header.authorization
    if (!authorization) {
      throw new global.errs.FailForMini('请正确登录')
    }
    if (!this.tokenValidateCheck(authorization)) {
      throw new global.errs.FailForMini('请正确登录')
    }
    await next()
  }
}

export default JwtHandler