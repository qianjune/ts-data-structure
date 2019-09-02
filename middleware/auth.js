import jwt from 'jsonwebtoken'

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
  }
  get m() {
    return async (ctx, next) => {
      console.log(ctx.req.headers.authorization);
      const authorization = ctx.req.headers.authorization
      let decoded
      let errMsg = 'token不合法'
      if (authorization) {
        const accessToken = authorization.split('Bearer ')[1]
        try {
          decoded = jwt.verify(accessToken, global.config.security.secretKey)
        } catch (error) {
          if (error.name == 'TokenExpiredError') {
            errMsg = 'token已过期'
          }
          throw new global.errs.Forbbiden(errMsg)
        }
        if (decoded.scope < this.level) {
          errMsg = '权限不足'
          throw new global.errs.Forbbiden(errMsg)
        }
        ctx.auth = {
          uid: decoded.uid,
          scope: decoded.scope
        }
      } else {
        throw new global.errs.AuthFailed('token缺失')
      }
      console.log('通过')
      await next()
    }
  }
  static verifyToken(token, secret) {
    try {
      return jwt.verify(token, secret)
    } catch (error) {
      return false
    }
  }
}

export default Auth