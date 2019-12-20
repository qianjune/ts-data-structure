/**
 * @description 积分 api 路由
 * @author June
 */

import joi from '@hapi/joi'
import Auth from '../../../middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '../../lib/router-decorator'
import { PointsController } from '../../controllers/points'

const POINTS_TYPE_ENUM = {
  INCREASE: 'increase',
  REDUCE: 'reduce'
}

@prefix('/v2/points')
class PointsRouter extends BaseRouter {
  /**
   * 积分增加
   * @param {*} ctx 
   */
  @post('/add')
  @parameter(joi.object({
    memberId: joi.number().required(),
    pattern: joi.string().required(),
    num: joi.string().required()
  }), 'body')
  async addPoints(ctx) {
    const body = ctx.request.body
    body.type = POINTS_TYPE_ENUM.INCREASEs
    const result = await PointsController.addPoints(body)
    ctx.body = result
  }

  /**
   * 积分消耗,一般不会直接对外使用，都是连带调用，类似于支付,其他带动消耗
   * @param {*} ctx 
   */
  @post('/consume')
  @parameter(joi.object({
    memberId: joi.number().required(),
    pattern: joi.string().required(),
    num: joi.string().required()
  }), 'body')
  async consumePoints(ctx) {
    const body = ctx.request.body
    body.type = POINTS_TYPE_ENUM.REDUCE
    const result = await PointsController.consumePoints(body)
    ctx.body = result
  }

  /**
   * 积分过期，一般内部处理
   * @param {*} ctx 
   */
  async expiredPoints(ctx) { }
}

const pointsRouter = new PointsRouter()

export default pointsRouter.init()