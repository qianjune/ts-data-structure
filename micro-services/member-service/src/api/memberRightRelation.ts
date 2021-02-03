/**
 * @description MemberRightRelation api
 */

import joi from "@hapi/joi";
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
import { MemberRightRelationService } from "@micro-services/member-service/src/services";
const memberRightRelationService = new MemberRightRelationService();

@prefix("/api/memberRightRelation")
@tag("MemberRightRelation相关服务")
class MemberRightRelationApi extends BaseRouter {
  /**
   * 创建
   * @param ctx 】
   */
  @post("/create")
  @summary("MemberRightRelation创建")
  @parameter(
    joi.object({
      memberId: joi.number().required(),
      right: joi.object({
        id: joi.number(),
        name: joi.string().required(),
        num: joi.any(),
        pattern: joi.string().required(),
        img: joi.string(),
        expired: joi.any(),
        type: joi.string(),
        desc: joi.string(),
        amount: joi.number(),
      }),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await memberRightRelationService.create(body);
  }

  /**
   * 创建
   * @param ctx 】
   */
  @post("/create/group")
  @summary("MemberRightRelation创建")
  @parameter(
    joi.object({
      data: joi.array().items(
        joi.object({
          memberId: joi.number().required(),
          right: joi.object({
            id: joi.number(),
            name: joi.string().required(),
            num: joi.any(),
            pattern: joi.string().required(),
            img: joi.string(),
            expired: joi.any(),
            type: joi.string(),
            desc: joi.string(),
            amount: joi.number(),
          }),
        })
      ),
    }),
    "body"
  )
  async createForGroup(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await memberRightRelationService.create(body.data);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("MemberRightRelation详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await memberRightRelationService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("MemberRightRelation列表")
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
    await memberRightRelationService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除MemberRightRelation")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await memberRightRelationService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("MemberRightRelation编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await memberRightRelationService.edit(body);
  }
}

export default new MemberRightRelationApi().init();
