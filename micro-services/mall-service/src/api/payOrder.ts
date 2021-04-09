/**
 * @description 支付订单 api
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
import PayOrderService from "@micro-services/mall-service/src/services/payOrder";
import SessionCookieHandler from "@src/utils/session_cookie";
const payOrderService = new PayOrderService();

@prefix("/api/payOrder")
@tag("支付订单相关服务")
class PayOrderApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("支付订单创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      orderCode: joi.string().required(),
      orderId: joi.number().required(),
      payPath: joi.string().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await payOrderService.create({
      ...body,
      userInfo: global.state.userInfo,
    });
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("支付订单详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await payOrderService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("支付订单列表")
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
    await payOrderService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除支付订单")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await payOrderService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("支付订单编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await payOrderService.edit(body);
  }
}

export default new PayOrderApi().init();
