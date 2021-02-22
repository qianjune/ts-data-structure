import { UserManager } from "@src/manager/user";
import JwtHandler from "@src/utils/jwt_handler";
import { ResponseHandler } from "@src/utils/responseHandler";
import { MemberManager } from "@root/micro-services/member-service/src/manager";
import { CommonService } from "@src/services/interface/common";
import { CODE_PLATFORM } from "@src/enum";
import CodeService from "./code";
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
    model: "jwt" | "session" = "jwt",
    config?: {
      data?: { openid: string };
      platform: CODE_PLATFORM;
    }
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
      const createdUser = await userManager.create({ mobile: user, ...config });
      if (!createdUser)
        throw new global.errs.FailForMini("创建用户失败，请稍后再试");
      result = createdUser;
    } else {
      result = realUser.toJSON();
      if (config?.platform === CODE_PLATFORM.MINI) {
        // 如果平台是小程序，用户数据里没有保存openid,就把openid更新上去
        if (!result.openid && config.data.openid) {
          const updateResult = await userManager.edit({
            openid: config.data.openid,
            id: result?.id,
          });
          result = updateResult.data;
        }
      }
    }
    if (result?.id) {
      // 获取用户会员信息，如果没有就创建会员卡
      const memberInfo = await memberManager.getInfoOrCreateMember({
        userId: result?.id,
      });
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

  /**
   * 手机号注册或直接登录
   * @param user
   * @param model
   */
  static async registerAndLoginByOpenId(
    user: string,
    model: "jwt" | "session" = "jwt",
    config?: {
      data?: {
        avatarUrl: string;
        city: string;
        country: string;
        gender: number;
        language: string;
        nickName: string;
        province: string;
      };
      platform: CODE_PLATFORM;
    }
  ): Promise<any> {
    // 首先验证验证码，查找是否有该用户
    const realUser = await userManager.getValidateData(
      { openId: user },
      "self"
    );
    console.log("------realUser-----");
    console.log(realUser);
    let result;
    // 如果没有就创建新用户
    if (!realUser) {
      const createdUser = await userManager.create({ openId: user });
      if (!createdUser)
        throw new global.errs.FailForMini("创建用户失败，请稍后再试");
      result = createdUser;
    } else {
      result = realUser.toJSON();
    }
    const {
      city,
      country,
      nickName,
      province,
      avatarUrl,
      gender,
    } = config.data;
    if (result?.id) {
      const memberInfo = await memberManager.getInfoOrCreateMember({
        userId: result?.id,
        sex: gender,
        nickName,
        residence: `${country}-${province}-${city}`,
        avatarUrl,
      });
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
