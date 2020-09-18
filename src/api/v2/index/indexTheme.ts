/**
 * @description IndexThemeApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag } from '@src/lib/router-decorator';
import { Context } from 'koa';
import IndexThemeService from '@src/services/v2/indexTheme';
const indexThemeService = new IndexThemeService()
@prefix('/api/index/theme')
@tag('IndexThemeApi相关服务')
class IndexThemeApi extends BaseRouter {
  @post('/create')
  @summary('IndexThemeApi创建')
  @parameter(joi.object({
    title: joi.string().required(),
    goods: joi.array(),
    key: joi.string().required()
  }), 'body')
  async create(ctx: Context): Promise<void> {
    await indexThemeService.create(ctx.state.parameter)
  }
  @get('/detail/:id')
  @summary('IndexThemeApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('IndexThemeApi列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    await indexThemeService.getList(ctx.state.parameter)
  }
  @del('/:id')
  @summary('删除IndexThemeApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('IndexThemeApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }
}

export default new IndexThemeApi().init()