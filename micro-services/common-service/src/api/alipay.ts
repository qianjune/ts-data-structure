/**
 * @description 支付宝小程序接口controller
 * @author June
 */
import BaseRouter, {
  get,
  prefix,
  parameter,
  post,
} from "@src/lib/router-decorator";
import joi from "joi";
import moment from "moment";
import axios from "axios";
import config from "@root/config/config";
import AliPayModel from "@src/models_discard/alipay";
import { Context } from "koa";

axios.defaults.headers["Content-Type"] = "application/json";

const alipay = new AliPayModel();

@prefix("/v1/alipay")
class AliPayApi extends BaseRouter {
  /**
   * 通过authToken获得accessToken
   * @param {Object} ctx ctx
   */
  @get("/userInfo_new")
  @parameter(
    joi.object({
      authCode: joi.string().required(),
    }),
    "query"
  )
  async getUserInfo(ctx: Context) {
    const { authCode } = ctx.query;
    const params = {
      method: "alipay.system.oauth.token",
      timestamp: moment().format("YYYY-MM-DD HH:mm:ss"),
      app_id: config.alipay.appId,
      sign_type: "RSA2",
      sign: config.alipay.private_key,
      grant_type: "authorization_code",
      code: authCode,
      charset: "utf-8",
    };
    const result: any = await axios.get(
      "https://openapi.alipay.com/gateway.do",
      {
        params,
        headers: { "Content-Type": "application/json;charset=UTF8" },
      }
    );
    ctx.body = {
      data: result.json(),
    };
  }

  /**
   * 获取二维码
   * @param {Object} ctx ctx
   */
  @get("/qrcode")
  async getQrcode(ctx: Context) {
    ctx.body = {
      data: await alipay.buildQrcode(),
    };
  }

  /**
   * 获取accessToken
   * @param {Object} ctx ctx
   */
  @get("/accessToken")
  @parameter(
    joi.object({
      authCode: joi.string().required(),
    }),
    "query"
  )
  async getUserInfo_old(ctx: Context) {
    const { authCode } = ctx.query;
    const result = await alipay.getAccessToken(authCode);
    console.log(result);
    ctx.body = {
      data: result,
      success: true,
    };
  }

  /**
   * 获取用户手机号
   * @param {Object} ctx ctx
   */
  @post("/telphone")
  @parameter(
    joi.object({
      encryptedData: joi.string().required(),
    }),
    "body"
  )
  async getUserTelphone(ctx: Context) {
    const { encryptedData } = ctx.request.body;
    console.log("encryptedData", encryptedData);
    try {
      const data = alipay.encryptedDataFormat(encryptedData);
      console.log(encryptedData);
      const result = await alipay.decrypt(data);
      console.log(result.data);
      ctx.body = {
        data: result.data,
      };
    } catch (error) {
      // console.log(error)
    }
  }

  /**
   * 获取用运动步数
   * @param {Object} ctx ctx
   */
  @post("/runData")
  @parameter(
    joi.object({
      encryptedData: joi.string().required(),
    }),
    "body"
  )
  async getUserRunData(ctx: Context) {
    const { encryptedData } = ctx.request.body;
    console.log("encryptedData", encryptedData);
    try {
      const data = alipay.encryptedDataFormat(encryptedData);
      console.log(encryptedData);
      const result = await alipay.decrypt(data);
      console.log(result.data);
      ctx.body = {
        data: result.data,
      };
    } catch (error) {
      // console.log(error)
    }
  }
}

const aliPayApi = new AliPayApi();
export default aliPayApi.init();
