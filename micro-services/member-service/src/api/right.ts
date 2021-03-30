/**
 * @description 权益 api 路由
 * @author June
 */

import joi from "joi";
import Auth from "@root/middleware/auth";
import { RightPatternGroup } from "@micro-services/member-service/src/db/right";
import BaseRouter, {
  get,
  post,
  middleware,
  parameter,
  prefix,
  put,
  summary,
} from "@src/lib/router-decorator";
import { ManagerResponseSuccess } from "@src/manager/response";
import { RightService } from "@micro-services/member-service/src/services";
import { ResponseHandler } from "@src/utils/responseHandler";
import SessionCookieHandler from "@src/utils/session_cookie";
import { Context } from "koa";
const rightService = new RightService();
@prefix("/api/right")
class RightRouter extends BaseRouter {
  /**
   * 获取-权益-类型-列表
   * @param {*} ctx
   */
  @get("/pattern/list")
  @parameter(joi.object({}), "query")
  async getRightPattern(ctx: Context): Promise<void> {
    ResponseHandler.send(
      new ManagerResponseSuccess({
        data: RightPatternGroup,
        msg: "权益类型列表请求成功",
      })
    );
  }

  /**
   * 创建 权益
   * @param {*} ctx
   */
  @post("/create")
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(
    joi.object({
      name: joi.string().required(),
      num: joi.number(),
      pattern: joi.string().required(),
      img: joi.string(),
      expired: joi.number(),
      desc: joi.string(),
    }),
    "body"
  )
  async addRight(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    const result = await rightService.create(body);
    ctx.body = result;
  }
  @get("/list")
  @summary("Level列表")
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
    await rightService.getList(parameter);
  }
  // /**
  //  * 修改权益
  //  * @param {*} ctx
  //  */
  // @post("/edit")
  // @parameter(
  //   joi.object({
  //     id: joi.number().required,
  //     name: joi.string().required(),
  //     num: joi.number().required(),
  //     pattern: joi.string().required(),
  //     // expired:joi.
  //   }),
  //   "body"
  // )
  // async editRight(ctx: Context): Promise<void> {
  //   const { body } = ctx.request;
  //   const result = await RightController.editRight(body);
  //   ctx.body = result;
  // }

  // /**
  //  * 创建权益包
  //  * @param {*} ctx
  //  */
  // @post("/add/package")
  // @parameter(
  //   joi.object({
  //     name: joi.string().required(),
  //     levelId: joi.number(),
  //     rightGroup: joi.array().items(joi.number()),
  //   }),
  //   "body"
  // )
  // async createRightPackage(ctx: Context): Promise<void> {
  //   const { body } = ctx.request;
  //   const result = await RightController.createRightPackage(body);
  //   ctx.body = result;
  // }

  // /** 修改权益包 */
  // @post("/edit/package")
  // @parameter(
  //   joi.object({
  //     id: joi.number().required,
  //     name: joi.string().required,
  //     levelId: joi.number(),
  //     rightGroup: joi.array().items(joi.number()),
  //   }),
  //   "body"
  // )
  // async editRightPackage(ctx: Context): Promise<void> {
  //   const { body } = ctx.request;
  //   const result = await RightController.editRightPackage(body);
  //   ctx.body = result;
  // }
}

const rightRouter = new RightRouter();

export default rightRouter.init();
