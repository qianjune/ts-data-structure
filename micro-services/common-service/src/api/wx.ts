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
} from "@src/lib/router-decorator";
import Joi from "@hapi/joi";
import moment from "moment";
import axios from "axios";
import config from "@root/config/config";
import { Context } from "koa";
import WXBizDataCrypt from "@src/utils/WXBizDataCrypt";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ManagerResponseSuccess } from "@src/manager/response";
import { set } from "@root/cache/_redis";
import UserService from "@root/micro-services/user-service/src/services/user";

axios.defaults.headers["Content-Type"] = "application/json";

@prefix("/api/v2/wx")
@tag("微信相关服务")
class WxApi extends BaseRouter {
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
    const box = new WXBizDataCrypt(
      config.wx.appId,
      result?.data["session_key"]
    );
    const mobileData: any = box.decryptData(encryptedData, iv);
    console.log(mobileData, "mobileData...");
    const { userInfo, session = "" } = await UserService.registerAndLoginForApp(
      mobileData?.phoneNumber,
      "session"
    );
    console.log(userInfo, "userInfo...");
    const res = new ManagerResponseSuccess({ msg: "登录成功", data: userInfo });
    ResponseHandler.send(res, { session });

    // ResponseHandler.send(
    //   new ManagerResponseSuccess({
    //     msg: "登录成功",
    //     data: mobileData,
    //   })
    // );
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
}

const wxApi = new WxApi();
export default wxApi.init();
