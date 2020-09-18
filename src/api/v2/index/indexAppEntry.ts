/**
 * @description IndexAppEntryApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag } from '@src/lib/router-decorator';
import { Context } from 'koa';

@prefix('/api/IndexAppEntryApi')
@tag('IndexAppEntryApi相关服务')
class IndexAppEntryApi extends BaseRouter {
  @post('/create')
  @summary('IndexAppEntryApi创建')
  @parameter(joi.object({}), 'body')
  async create(ctx: Context): Promise<void> {
    // create api
  }
  @get('/detail/:id')
  @summary('IndexAppEntryApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('IndexAppEntryApi列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    // get list
  }
  @del('/:id')
  @summary('删除IndexAppEntryApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('IndexAppEntryApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new IndexAppEntryApi().init()