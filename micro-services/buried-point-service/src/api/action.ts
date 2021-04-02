/**
 * @description 用户行为 api
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
} from "@src/lib/router-decorator";
import { Context } from "koa";
import ActionService from "@micro-services/buried-point-service/src/services/action";
const actionService = new ActionService();

@prefix("/api/action")
@tag("用户行为相关服务")
class ActionApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("用户行为创建")
  @parameter(joi.object({}), "body")
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await actionService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("用户行为详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await actionService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("用户行为列表")
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
    await actionService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除用户行为")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await actionService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("用户行为编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await actionService.edit(body);
  }
}

export default new ActionApi().init();
