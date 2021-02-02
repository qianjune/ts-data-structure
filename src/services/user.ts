import { UserManager } from "@src/manager/user";
import JwtHandler from "@src/utils/jwt_handler";
import { ResponseHandler } from "@src/utils/responseHandler";
import { MemberManager } from "@src/manager/v2/member";
import CodeService from "./code";
import { CommonService } from "./interface/common";
const memberManager = new MemberManager();
/**
 * @description 用户 service
 */
const userManager = new UserManager();
class UserService implements CommonService {
  create(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    const result = await userManager.getList(data);
    ResponseHandler.send(result);
  }
  static async login(user: string, code: string): Promise<void> {
    console.log(user, code);
    const result = await userManager.create({ mobile: user });
    console.log("最后得到的用户", result);
    // if(!result) throw global.errs.
  }
  async edit(data: any): Promise<void> {
    const { code, user, type, ...otherData } = data;
    CodeService.validateCodeByMobile(user, type, code);
    const result = await userManager.edit(otherData);
    ResponseHandler.send(result);
  }

  /**
   * 手机号注册或直接登录
   * @param user
   * @param model
   */
  static async registerAndLoginForApp(
    user: string,
    model: "jwt" | "session" = "jwt"
  ): Promise<any> {
    // 首先验证验证码，查找是否有该用户
    const realUser = await userManager.getValidateData(
      { mobile: user },
      "self"
    );
    console.log("------realUser-----");
    console.log(realUser);
    let result;
    // 如果没有就创建新用户
    if (!realUser) {
      const createdUser = await userManager.create({ mobile: user });
      if (!createdUser)
        throw new global.errs.FailForMini("创建用户失败，请稍后再试");
      result = createdUser;
    } else {
      result = realUser.toJSON();
    }
    if (result?.id) {
      const memberInfo = await memberManager._getInfo(result?.id);
      result.memberInfo = memberInfo.data;
    }

    // 调用登录，返回session或者jwt
    if (model === "jwt") {
      console.log(realUser);
      // return userManager.loginJwt((realUser.toJSON() as any).id)
      return {
        userInfo: JwtHandler.encrypt(result),
      };
    } else {
      return {
        userInfo: result,
        session: result,
      };
    }
  }
}

export default UserService;
