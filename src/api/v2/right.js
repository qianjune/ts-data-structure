/**
 * @description 权益 api 路由
 * @author June
 */

import joi from '@hapi/joi'
import Auth from '../../../middleware/auth'
import BaseRouter, { get, post, middleware, parameter, prefix, put } from '../../lib/router-decorator'

@prefix('/v2/right')
class RightRouter extends BaseRouter {
  @post('/add')
  @parameter(joi.object({
    name: joi.string().required(),
    num: joi.number().required(),
    pattern: joi.string().required(),
    // expired:joi.
  }), 'body')
  async addRight(ctx) {
    const { body } = ctx.request
    const result = await RightController.addRight(body)
    ctx.body = result
  }

  @post('/edit/:id')
  @parameter(joi.object({
    name: joi.string().required(),
    num: joi.number().required(),
    pattern: joi.string().required(),
    // expired:joi.
  }), 'body')
  async editRight(ctx) {
    const { body } = ctx.request
    const result = await RightController.editRight(body)
    ctx.body = result
  }

  @post('/add/package')
  @parameter(joi.object({
    
  }))
  async createRightPackage(ctx){

  }
}