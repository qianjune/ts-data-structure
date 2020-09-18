/**
 * @description IndexCarouselApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag } from '@src/lib/router-decorator';
import { Context } from 'koa';
import IndexCarouselService from '@src/services/v2/indexCarousel';
const indexCarouselService = new IndexCarouselService()
@prefix('/api/index/carousel')
@tag('IndexCarouselApi相关服务')
class IndexCarouselApi extends BaseRouter {
  @post('/create')
  @summary('IndexCarouselApi创建')
  @parameter(joi.object({
    image: joi.string().required(),
    to: joi.string().required(),
  }), 'body')
  async create(ctx: Context): Promise<void> {
    await indexCarouselService.create(ctx.state.parameter)
  }
  @get('/detail/:id')
  @summary('IndexCarouselApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('IndexCarouselApi列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    await indexCarouselService.getList(ctx.state.parameter)
  }
  @del('/:id')
  @summary('删除IndexCarouselApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('IndexCarouselApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new IndexCarouselApi().init()