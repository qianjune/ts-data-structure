/**
 * @description LevelGroupLevelRelation api
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
import { LevelGroupLevelRelationService } from "@micro-services/member-service/src/services";
const levelGroupLevelRelationService = new LevelGroupLevelRelationService();

@prefix("/api/levelGroupLevelRelation")
@tag("LevelGroupLevelRelation相关服务")
class LevelGroupLevelRelationApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("LevelGroupLevelRelation创建")
  @parameter(
    joi.object({
      levelGroupId: joi.number().required(),
      levelId: joi.number().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await levelGroupLevelRelationService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("LevelGroupLevelRelation详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await levelGroupLevelRelationService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("LevelGroupLevelRelation列表")
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
    await levelGroupLevelRelationService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除LevelGroupLevelRelation")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await levelGroupLevelRelationService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("LevelGroupLevelRelation编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await levelGroupLevelRelationService.edit(body);
  }
}

export default new LevelGroupLevelRelationApi().init();
