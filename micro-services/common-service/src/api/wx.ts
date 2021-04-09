/**
 * @description 微信小程序接口controller
 * @author June
 */
import BaseRouter, {
  get,
  prefix,
  parameter,
  post,
  tag,
  summary,
} from "@src/lib/router-decorator";
import Joi from "joi";
import axios from "axios";
import config from "@root/config/config";
import { Context } from "koa";
import WXBizDataCrypt from "@src/utils/WXBizDataCrypt";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import { set } from "@root/cache/_redis";
import UserService from "@root/micro-services/user-service/src/services/user";
import EncryptBox from "@src/utils/encrypt_box";
import { CODE_PLATFORM } from "@src/enum";

axios.defaults.headers["Content-Type"] = "application/json";

@prefix("/api/v2/wx")
@tag("微信相关服务")
class WxApi extends BaseRouter {
  static async _saveSessionKey(user: string, sessionKey: string) {
    const session = EncryptBox.buildEncryptCode(sessionKey);
    set(user, session, 60 * 60 * 24 * 2 + 60 * 60 * 23); // 过期时间设定了3天少1小时
    return session;
  }
  static async _getSessionKey(code: string) {
    const params = {
      appid: config.wx.appId,
      secret: config.wx.appSecret,
      js_code: code,
      grant_type: "authorization_code",
    };
    const result: any = await axios.get(
      "https://api.weixin.qq.com/sns/jscode2session",
      {
        params,
        headers: { "Content-Type": "application/json;charset=UTF8" },
      }
    );
    console.log(result, "获取session_key");
    return result?.data;
  }

  /**
   * 通过authToken获得accessToken
   * @param {Object} ctx ctx
   */
  @post("/login")
  @parameter(
    Joi.object({
      code: Joi.string().required(),
      encryptedData: Joi.string().required(),
      iv: Joi.string().required(),
    }),
    "body"
  )
  async login(ctx: Context) {
    const { code, encryptedData, iv } = ctx.request.body;
    const result = await WxApi._getSessionKey(code);
    console.log(code, "-----------------");
    console.log(result, "合法session_key");

    const box = new WXBizDataCrypt(config.wx.appId, result["session_key"]);

    const mobileData: any = box.decryptData(encryptedData, iv);
    console.log(mobileData, "mobileData...");
    const { phoneNumber } = mobileData;
    // 这里还应该添加一个保存 手机号和对应的session_key到redis的操作，防止短期内要用到session_key
    WxApi._saveSessionKey(phoneNumber, result["session_key"]);
    // 创建一个小程序的的redis操作的box

    const { userInfo, session = "" } = await UserService.registerAndLoginForApp(
      phoneNumber,
      "session",
      {
        platform: CODE_PLATFORM.MINI,
        data: {
          openid: result["openid"],
        },
      }
    );
    console.log(userInfo, "userInfo...");
    const res = new ManagerResponseSuccess({
      msg: "登录成功",
      data: EncryptBox.buildEncryptCode(userInfo),
    });

    ResponseHandler.send(res, { session });
  }

  @post("/data/crypt")
  @parameter(
    Joi.object({
      encryptedData: Joi.string().required(),
      iv: Joi.string().required(),
    }),
    "body"
  )
  async dataCrypt(ctx: Context) {
    const { encryptedData, iv } = ctx.request.body;
    const box = new WXBizDataCrypt(config.wx.appId, "OFI9iyWuIszFzt7tX2GHtA==");
    const result = box.decryptData(encryptedData, iv);
    ctx.body = {
      data: result,
    };
  }

  @post("/login/user/info")
  @summary("微信登录（带用户信息）")
  @parameter(
    Joi.object({
      code: Joi.string().required(),
      avatarUrl: Joi.string().required(),
      city: Joi.string().allow(null).allow(""),
      country: Joi.string().allow(null).allow(""),
      gender: Joi.number().required(),
      language: Joi.string().allow(null).allow(""),
      nickName: Joi.string().required(),
      province: Joi.string().allow(null).allow(""),
    }),
    "body"
  )
  async loginWithUserInfo(ctx: Context) {
    const { body } = ctx.request;
    const { code, ...otherBody } = body;
    const result = await WxApi._getSessionKey(code);
    console.log(result, "_getSessionKey...");
    const {
      userInfo,
      session = "",
    } = await UserService.registerAndLoginByOpenId(
      result["openid"],
      "session",
      {
        platform: CODE_PLATFORM.MINI,
        data: otherBody,
      }
    );
    const res = new ManagerResponseSuccess({
      msg: "登录成功",
      data: userInfo,
    });

    ResponseHandler.send(res, { session });
  }
}

const wxApi = new WxApi();
export default wxApi.init();
