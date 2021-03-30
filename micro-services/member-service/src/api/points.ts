/**
 * @description Points api
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
import { PointsService } from "@micro-services/member-service/src/services";
import SessionCookieHandler from "@src/utils/session_cookie";
const pointsService = new PointsService();

@prefix("/api/points")
@tag("Points相关服务")
class PointsApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("Points创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      num: joi.number().required(),
      type: joi.string().required(),
      pattern: joi.string().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    console.log(global.state.userInfo);
    await pointsService.create({
      ...body,
      memberId: global.state.userInfo?.memberInfo?.id,
    });
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("Points详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await pointsService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("Points列表")
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
    await pointsService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除Points")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await pointsService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("Points编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await pointsService.edit(body);
  }
}

export default new PointsApi().init();
