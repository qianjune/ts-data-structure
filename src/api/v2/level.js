/**
 * @description 等级 api 路由
 * @author June
 */

import joi from '@hapi/joi'
import Auth from '../../../middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '../../lib/router-decorator'

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
  async createLevel(ctx) {
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
  async editLevel(ctx) {
    const { body } = ctx.request.body
    const result = await LevelController.editLevel(body)
    ctx.body = result
  }
}

const levelRouter = new LevelRouter()

export default levelRouter.init()

