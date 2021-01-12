/**
 * @description 权益 api 路由
 * @author June
 */

import joi from '@hapi/joi'
import Auth from '@root/middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '@src/lib/router-decorator'
import { RightController } from '@src/controllers/right'
import { Context } from 'koa'

@prefix('/v2/right')
class RightRouter extends BaseRouter {
  /**
   * 创建 权益
   * @param {*} ctx 
   */
  @post('/add')
  @parameter(joi.object({
    name: joi.string().required(),
    num: joi.number().required(),
    pattern: joi.string().required(),
    // expired:joi.
  }), 'body')
  async addRight(ctx: Context): Promise<void> {
    const { body } = ctx.request
    const result = await RightController.createRight(body)
    ctx.body = result
  }

  /**
   * 修改权益
   * @param {*} ctx 
   */
  @post('/edit')
  @parameter(joi.object({
    id: joi.number().required,
    name: joi.string().required(),
    num: joi.number().required(),
    pattern: joi.string().required(),
    // expired:joi.
  }), 'body')
  async editRight(ctx: Context): Promise<void> {
    const { body } = ctx.request
    const result = await RightController.editRight(body)
    ctx.body = result
  }

  /**
   * 创建权益包
   * @param {*} ctx 
   */
  @post('/add/package')
  @parameter(joi.object({
    name: joi.string().required(),
    levelId: joi.number(),
    rightGroup: joi.array().items(joi.number())
  }), 'body')
  async createRightPackage(ctx: Context): Promise<void> {
    const { body } = ctx.request
    const result = await RightController.createRightPackage(body)
    ctx.body = result
  }

  /** 修改权益包 */
  @post('/edit/package')
  @parameter(joi.object({
    id: joi.number().required,
    name: joi.string().required,
    levelId: joi.number(),
    rightGroup: joi.array().items(joi.number())
  }), 'body')
  async editRightPackage(ctx: Context): Promise<void> {
    const { body } = ctx.request
    const result = await RightController.editRightPackage(body)
    ctx.body = result
  }
}

const rightRouter = new RightRouter()

export default rightRouter.init()
