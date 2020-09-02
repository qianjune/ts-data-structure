/**
 * @description AddressApi api
 */

import joi from '@hapi/joi'
import BaseRouter, { post, parameter, get, summary, del, prefix, tag, middleware } from '@src/lib/router-decorator';
import { Context } from 'koa';
import AddressService from '@src/services/v2/address';
import { FetchAddressType } from '@src/manager/v2/address/interface';
import SessionCookieHandler from '@src/utils/session_cookie';
const addressService = new AddressService()
@prefix('/api/address')
@tag('AddressApi相关服务')
class AddressApi extends BaseRouter {
  @post('/create')
  @middleware(SessionCookieHandler.loginCheck)
  @summary('收件地址创建')
  @parameter(joi.object({
    countryId: joi.string(),
    provinceId: joi.string().required(),
    cityId: joi.string().required(),
    areaId: joi.string().required(),
    townId: joi.string(),
    address: joi.string().required(),
    tel: joi.string().required(),
    receiver: joi.string().required()
  }), 'body')
  async create(ctx: Context): Promise<void> {
    const { body } = ctx.request

    await addressService.create({ ...body, memberId: global.state.userInfo.id })
  }
  @get('/detail/:id')
  @summary('AddressApi详情')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async getInfo(ctx: Context): Promise<void> {
    // get info
  }
  @get('/list')
  @summary('Address列表')
  @middleware(SessionCookieHandler.loginCheck)
  @parameter(joi.object({
    pageSize: joi.number().required(),
    pageNo: joi.number().required()
  }), 'query')
  async getList(ctx: Context): Promise<void> {
    const { parameter } = ctx.state
    await addressService.getList(parameter)
  }
  @del('/:id')
  @summary('删除AddressApi')
  @parameter(joi.object({
    id: joi.string().required()
  }), 'params')
  async del(ctx: Context): Promise<void> {
    await addressService.del(ctx.state.parameter.id)
  }

  @post('/edit')
  @summary('AddressApi编辑')
  @parameter(joi.object({}), 'body')
  async edit(ctx: Context): Promise<void> {
    // edit item
  }

  @get('/cn/list')
  @summary('获取中华人民共和国行政区划代码')
  async getChineseAddressList(ctx: Context): Promise<void> {
    addressService.getCommonAddressList({})
  }

  @get('/province/list')
  @summary('获取中华人民共和国-省份列表')
  async getProvinceList(ctx: Context): Promise<void> {

    addressService.getCommonAddressList({ type: FetchAddressType.PROVINCE })
  }

  @get('/city/list')
  @summary('获取中华人民共和国-市列表')
  @parameter(joi.object({
    provinceId: joi.number()
  }), 'query')
  async getCityList(ctx: Context): Promise<void> {
    const { provinceId } = ctx.state.parameter

    addressService.getCommonAddressList({ id: provinceId, type: FetchAddressType.CITY })
  }

  @get('/area/list')
  @summary('获取中华人民共和国-区列表')
  @parameter(joi.object({
    cityId: joi.number()
  }), 'query')
  async getAreaList(ctx: Context): Promise<void> {
    const { cityId } = ctx.state.parameter

    addressService.getCommonAddressList({ id: cityId, type: FetchAddressType.AREA })
  }

  @get('/town/list')
  @summary('获取中华人民共和国-街道列表')
  @parameter(joi.object({
    areaId: joi.number()
  }), 'query')
  async getTownList(ctx: Context): Promise<void> {
    const { areaId } = ctx.state.parameter
    addressService.getCommonAddressList({ id: areaId, type: FetchAddressType.TOWN })
  }
}

export default new AddressApi().init()