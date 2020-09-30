/**
 * @description OrderApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag, middleware } from '@src/lib/router-decorator';
import { Context } from 'koa';
import OrderApiService from '@src/services/v2/order'
import { AddressItem } from './address';
import SessionCookieHandler from '@src/utils/session_cookie';
import OrderService from '@src/services/v2/order';
const orderService = new OrderService()
@prefix('/api/order')
@tag('OrderApi相关服务')
class OrderApi extends BaseRouter {
  @post('/create')
  @summary('OrderApi创建')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({
    amount: joi.number().required(),
    totalPrice: joi.number().required(),
    shippingAddress: joi.object({
      id: joi.number().required(),
      provinceName: joi.string().required(),
      cityName: joi.string().required(),
      areaName: joi.string().required(),
      townName: joi.string().required(),
      address: joi.string().required(),
      tel: joi.number().required(),
      receiver: joi.string().required(),
    }).unknown(true),
    goods: joi.array().items(joi.object({
      shopInfo: joi.object({
        id: joi.number().required(),
        name: joi.string().required(),
        logo: joi.string().allow('', null)
      }),
      goodsGroup: joi.array().items(joi.object({
        id: joi.number().required(),
        amount: joi.number().required(),
        name: joi.string().required(),
        sku: joi.string().required(),
        price: joi.number().required(),
        mainImage: joi.string().required(),
      }))
    }))
  }), 'body')
  async create(ctx: Context): Promise<void> {
    // create api
    console.log(ctx.state.parameter);
    const { id } = global.state.userInfo
    await orderService.create({
      ...ctx.state.parameter,
      address: ctx.state.parameter.shippingAddress,
      userId: id
    })
  }
  @get('/detail/:id')
  @summary('OrderApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('OrderApi详情')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required(),
    status: joi.number().allow(null)
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    const { id } = global.state.userInfo
    await orderService.getList({ ...ctx.state.parameter, userId: id })
  }
  @del('/:id')
  @summary('删除OrderApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    // del item
  }

  @post('/edit')
  @summary('OrderApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }

  @get('/amount')
  @summary('获取订单数量')
  @middleware(SessionCookieHandler.loginCheck)
  async getOrderAmount(ctx: Context) {
    await orderService.getAmount(global.state.userInfo.id)
  }
}

export default new OrderApi().init()