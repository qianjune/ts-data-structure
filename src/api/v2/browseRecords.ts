/**
 * @description BrowseRecords api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag, middleware } from '@src/lib/router-decorator';
import { Context } from 'koa';
import BrowseRecordsService from '@src/services/v2/browseRecords'
import SessionCookieHandler from '@src/utils/session_cookie';
const browseRecordsService = new BrowseRecordsService()
@prefix('/api/browseRecords')
@tag('BrowseRecords相关服务')
class BrowseRecordsApi extends BaseRouter {
  @post('/create')
  @summary('BrowseRecords创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({
    shopId: joi.string(),
    productId: joi.string()
  }), 'body')
  async create(ctx: Context): Promise<void> {
    // create item
    const { body } = ctx.request
    await browseRecordsService.create({ ...body, uid: global.state.userInfo.id })
  }
  @get('/detail/:id')
  @summary('BrowseRecords详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
    const { id } = ctx.state.parameter
    await browseRecordsService.getInfo(id)
  }
  @get('/list')
  @summary('BrowseRecords列表')
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    // get list
    const { parameter } = ctx.state
    await browseRecordsService.getList(parameter)
  }
  @del('/:id')
  @summary('删除BrowseRecords')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
    const { id } = ctx.state.parameter
    await browseRecordsService.del(id)
  }

  @post('/edit')
  @summary('BrowseRecords编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
    const { body } = ctx.request
    await browseRecordsService.edit(body)
  }
}

export default new BrowseRecordsApi().init()