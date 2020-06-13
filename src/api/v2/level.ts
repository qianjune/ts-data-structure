/**
 * @description 等级 api 路由
 * @author June
 */

import joi from '@hapi/joi'
import Auth from '@root/middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '@src/lib/router-decorator'
import { LevelController } from '@src/controllers/level'

@prefix('/v2/level')
class LevelRouter extends BaseRouter {

  /**
   * 创建 等级
   * @param {*} ctx 
   */
  @post('/create/level')
  @parameter(joi.object({
    name: joi.string().required,
    num: joi.number()
  }), 'body')
  async createLevel(ctx: any): Promise<void> {
    const { body } = ctx.request.body
    const result = await LevelController.createLevel(body)
    ctx.body = result
  }

  /**
   * 修改 等级 信息
   * @param {*} ctx 
   */
  @post('/edit/level/:id')
  @parameter(joi.object({
    name: joi.string().required,
    num: joi.number()
  }), 'body')
  async editLevel(ctx: any): Promise<void> {
    const { body } = ctx.request.body
    const result = await LevelController.editLevel(body)
    ctx.body = result
  }
}

const levelRouter = new LevelRouter()

export default levelRouter.init()

