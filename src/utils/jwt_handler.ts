/**
 * @description jwt相关处理
 */
import jwt from "jsonwebtoken";
import { UserManager } from "@src/manager/user";
import { Context } from "koa";
const userManager = new UserManager();
class JwtHandler {
  static secretOrPrivateKey = "private_key";
  // 解密
  static verify(token: string): any {
    if (token.includes("Bearer ")) {
      token = token.replace("Bearer ", "");
    }
    // try {
    const result = jwt.verify(token, this.secretOrPrivateKey);
    return result;
    // } catch (e) {
    //     console.log('解密过程中捕获到错误：', e.message)
    //     throw new global.errs.FailByAuth(e.message)
    // }
  }
  // 返回加密token
  static encrypt(
    data: { [keyName: string]: any },
    expiresIn: string | number = "1h"
  ): string {
    return jwt.sign(data, this.secretOrPrivateKey, { expiresIn });
  }
  //
  private static async tokenValidateCheck(token: string): Promise<boolean> {
    // 验证id和有效时间
    const result = this.verify(token);
    console.log("token:", result);
    if (!result || !result.id) {
      return false;
    }
    const validateUser = await userManager.getValidateData(
      { id: result.id },
      "self"
    );
    console.log(validateUser);
    if (!validateUser) {
      throw new global.errs.FailByAuth("用户不存在，请正确登录");
    }
    global.state.userInfo = (validateUser.toJSON() as any).id;
    return true;
  }
  static async loginCheck(ctx: Context, next: () => void): Promise<void> {
    const authorization = ctx.header.authorization;
    if (!authorization) {
      throw new global.errs.FailByAuth("请正确登录(auth2.0)");
    }
    const checkResult = await JwtHandler.tokenValidateCheck(
      authorization
    ).catch((e) => {
      throw e.message ? new global.errs.FailByAuth(e.message) : e;
    });
    console.log("checkResult:", checkResult);
    if (!checkResult) {
      throw new global.errs.FailByAuth("请正确登录(auth2.0)");
    }
    await next();
  }
}

export default JwtHandler;
