/**
 * @description XXXXXX api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag } from '@src/lib/router-decorator';
import { Context } from 'koa';

@prefix('/api/XXXXXX')
@tag('XXXXXX相关服务')
class XXXXXX extends BaseRouter {
  @post('/create')
  @summary('XXXXXX创建')
  @parameter(joi.object({}), 'body')
  async create(ctx: Context): Promise<void> {
    // create api
  }
  @get('/detail/:id')
  @summary('XXXXXX详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('XXXXXX列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    // get list
  }
  @del('/:id')
  @summary('删除XXXXXX')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('XXXXXX编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new XXXXXX().init()