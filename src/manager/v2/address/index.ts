/**
 * @description Address-Manager orm
 */

import { CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";
import province from 'province-city-china/dist/province.json'
import city from 'province-city-china/dist/city.json'
import area from 'province-city-china/dist/area.json'
import town from 'province-city-china/dist/town.json'
import level from 'province-city-china/dist/level.json'

import sequelize from "@root/core/db";
import { FetchAddressType, ZhiXiaShi, AddressItem } from "./interface";
import { Address } from "@src/db/models";

const placeholder = '地址'
const responseMsg = ResponseMsg(placeholder)
class AddressManager implements CommonManager {
  async create(data: AddressItem): Promise<ManagerResponse> {
    const result = await Address.create(data)
    if (result) {
      return new ManagerResponseSuccess({ data: result, msg: responseMsg.CREATE_SUCCESS })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
    }
  }
  edit(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<ManagerResponse> {
    const address = await Address.findOne({
      where: {
        id
      }
    })
    if (!address) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getCommonAddressList(data: { id: number, type: FetchAddressType }): ManagerResponse {
    const { id, type } = data
    let fetchList = this._getChineseList
    switch (type) {
      case FetchAddressType.PROVINCE:
        fetchList = this._getProvinceList
        break;
      case FetchAddressType.CITY:
        fetchList = this._getCityList
        break;
      case FetchAddressType.AREA:
        fetchList = this._getAreaList
        break;
      case FetchAddressType.TOWN:
        fetchList = this._getTownList
        break;
      default:
        break;
    }
    const result = fetchList(id)
    return result
  }
  _getChineseList(id?: number): ManagerResponse {
    const result = level

    return new ManagerResponseSuccess({ msg: responseMsg.ADDRESS_ALL_LIST_SUCCESS, data: result })
  }
  _getCityList(id?: number): ManagerResponse {
    let result = [...city, ...ZhiXiaShi]
    if (id) {
      result = result.filter(item => item.code.startsWith(id.toString()))
    }
    result = result.map(item => ({
      ...item,
      id: item.province + item.city
    }))
    return new ManagerResponseSuccess({ msg: responseMsg.CITY_LIST_SUCCESS, data: result })
  }
  _getAreaList(id?: number): ManagerResponse {
    let result = area
    if (id) {
      result = result.filter(item => item.code.startsWith(id.toString()))
    }
    result = result.map(item => ({
      ...item,
      id: item.province + item.city + item.area
    }))
    return new ManagerResponseSuccess({ msg: responseMsg.AREA_LIST_SUCCESS, data: result })
  }
  _getProvinceList(id?: number): ManagerResponse {
    let result = province
    // if (id) {
    //   result = result.filter(item => item.province === id.toString())
    // }
    result = result.map(item => ({
      ...item,
      id: item.province
    }))
    return new ManagerResponseSuccess({ msg: responseMsg.PROVINCE_LIST_SUCCESS, data: result })
  }
  _getTownList(id?: number): ManagerResponse {
    let result = town
    if (id) {
      result = result.filter(item => item.code.startsWith(id.toString()))
    }
    result = result.map(item => ({
      ...item,
      id: item.province + item.city + item.area + item.town
    }))
    return new ManagerResponseSuccess({ msg: responseMsg.TOWN_LIST_SUCCESS, data: result })
  }

}

export default AddressManager