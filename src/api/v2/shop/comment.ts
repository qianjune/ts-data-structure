/**
 * @description comment api
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
import CommentService from "@src/services/v2/comment";
const commentService = new CommentService();
@prefix("/api/comment")
@tag("评论 - 相关服务")
class comment extends BaseRouter {
  @post("/create")
  @summary("comment创建")
  @parameter(
    joi.object({
      underWhich: joi.number().required(),
      userId: joi.number().required(),
      parentId: joi.number(),
      content: joi.string().required(),
    }),
    "body"
  )
  async create(ctx: Context): Promise<void> {
    // create api
    const { body } = ctx.request;
    await commentService.create(body);
  }
  @get("/detail/:id")
  @summary("comment详情")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get("/list")
  @summary("comment列表")
  @parameter(
    joi.object({
      pageSize: joi.number().required(),
      pageNo: joi.number().required(),
      underWhich: joi.number().required(),
    }),
    "query"
  )
  async getList(ctx: Context): Promise<void> {
    // get list
    await commentService.getList(ctx.state.parameter);
  }
  @del("/:id")
  @summary("删除comment")
  @parameter(
    joi.object({
      id: joi.string().required(),
    }),
    "params"
  )
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post("/edit")
  @summary("comment编辑")
  @parameter(joi.object({}), "body")
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new comment().init();
