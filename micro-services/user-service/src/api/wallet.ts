/**
 * @description 钱包服务 api
 */

import joi from "joi";
import BaseRouter, {
  post,
  parameter,
  get,
  summary,
  del,
  prefix,
  tag,
  middleware,
} from "@src/lib/router-decorator";
import { Context } from "koa";
import WalletService from "@micro-services/user-service/src/services/wallet";
import SessionCookieHandler from "@src/utils/session_cookie";
import { ResponseHandler } from "@src/utils/responseHandler";
const walletService = new WalletService();

@prefix("/api/wallet")
@tag("钱包服务相关服务")
class WalletApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("钱包服务创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({}), "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await walletService.create({ userId: global.state.userInfo.id });
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("钱包服务详情")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await walletService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("钱包服务列表")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    // get list
    const { parameter } = ctx.state;
    await walletService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除钱包服务")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await walletService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("钱包服务编辑")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await walletService.edit(body);
  }

  /**
   * 钱包充值
   * @param ctx 、
   */
  @post("/recharge")
  @summary("钱包充值服务")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      amount: joi.number().required(),
    }),
    "body"
  )
  async recharge(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await walletService.recharge({ ...body, userId: global.state.userInfo.id });
  }

  /**
   * 钱包修改支付密码
   * @param ctx 、
   */
  @post("/modify/password")
  @summary("钱包修改支付密码")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      password: joi.string().required(),
      confirmPassword: joi.string().required(),
      // 验证码
      // 验证token
    }),
    "body"
  )
  async modifyPassword(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await walletService.modifyPassword({
      ...body,
      userId: global.state.userInfo.id,
    });
  }

  /**
   * 钱包支付
   * @param ctx 、
   */
  @post("/pay")
  @summary("钱包支付服务")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      amount: joi.number().required(),
      password: joi.string().required(),
    }),
    "body"
  )
  async pay(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    ResponseHandler.send(
      await walletService.pay({ ...body, userId: global.state.userInfo.id })
    );
  }
}

export default new WalletApi().init();
