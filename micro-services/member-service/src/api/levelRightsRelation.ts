/**
 * @description LevelRightsRelation api
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
import { LevelRightsRelationService } from "@micro-services/member-service/src/services";
import SessionCookieHandler from "@src/utils/session_cookie";
const levelRightsRelationService = new LevelRightsRelationService();

@prefix("/api/levelRightsRelation")
@tag("LevelRightsRelation相关服务")
class LevelRightsRelationApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("LevelRightsRelation创建")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      levelId: joi.number().required(),
      rightId: joi.number().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await levelRightsRelationService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("LevelRightsRelation详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await levelRightsRelationService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("LevelRightsRelation列表")
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
    await levelRightsRelationService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除LevelRightsRelation")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await levelRightsRelationService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("LevelRightsRelation编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await levelRightsRelationService.edit(body);
  }
}

export default new LevelRightsRelationApi().init();
