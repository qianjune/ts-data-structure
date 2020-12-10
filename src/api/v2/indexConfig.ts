/**
 * @description IndexConfigApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag } from '@src/lib/router-decorator';
import { Context } from 'koa';
import IndexConfigService from '@src/services/v2/indexConfig';
const indexConfigService = new IndexConfigService()
@prefix('/api/index/config')
@tag('IndexConfigApi相关服务')
class IndexConfigApi extends BaseRouter {
  @post('/create')
  @summary('IndexConfigApi创建')
  @parameter(joi.object({
    name: joi.string().required(),
    data: joi.array().items(
      joi.object({
        key: joi.string().required(),
        type: joi.string().required(),
        data: joi.array().required()
      })
    ).required()
  }), 'body')
  async create(ctx: Context): Promise<void> {
    const { body } = ctx.request
    await indexConfigService.create(body)
  }
  @get('/detail/:id')
  @summary('IndexConfigApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    const { id } = ctx.state.parameter
    await indexConfigService.getInfo(id)
  }
  @get('/list')
  @summary('IndexConfigApi列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    // get list
  }
  @del('/:id')
  @summary('删除IndexConfigApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('IndexConfigApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new IndexConfigApi().init()