/**
 * @description 笔记和话题的关系 api
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
import TopicNoteRelationService from "@micro-services/social-service/src/services/topicNoteRelation";
const topicNoteRelationService = new TopicNoteRelationService();

@prefix("/api/topicNoteRelation")
@tag("笔记和话题的关系相关服务")
class TopicNoteRelationApi extends BaseRouter {
  /**
   * 创建
   * @param ctx
   */
  @post("/create")
  @summary("笔记和话题的关系创建")
  @parameter(
    joi.object({
      noteId: joi.string().required(),
      topicGroup: joi.array().items(joi.string()).required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request;
    await topicNoteRelationService.create(body);
  }

  /**
   * 获取详情
   * @param ctx
   */
  @get("/detail/:id")
  @summary("笔记和话题的关系详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter;
    await topicNoteRelationService.getInfo(id);
  }

  /**
   * 获取列表
   * @param ctx
   */
  @get("/list")
  @summary("笔记和话题的关系列表")
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
    await topicNoteRelationService.getList(parameter);
  }

  /**
   * 删除
   * @param ctx
   */
  @del("/:id")
  @summary("删除笔记和话题的关系")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter;
    await topicNoteRelationService.del(id);
  }

  /**
   * 编辑
   * @param ctx 、
   */
  @post("/edit")
  @summary("笔记和话题的关系编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request;
    await topicNoteRelationService.edit(body);
  }
}

export default new TopicNoteRelationApi().init();
