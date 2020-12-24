/**
 * @description shoppingCart orm
 */

import { buildCommonListParams, CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import sequelize from "@root/core/db";
import { ShoppingCartModel } from "@src/db/models";
import { ResponseMsg, ManagerResponseSuccess, ManagerResponseFailure } from "../response";
import ShoppingCart from "@src/db/models/v2/shoppingCart";
interface shoppingCartItem {
  id?: number
  userId: number
  productId: number
  sku: string
  num: number
  shopId: number
}

const placeholder = '购物车'
const responseMsg = ResponseMsg(placeholder)
class shoppingCartManager implements CommonManager {
  /**
   * 包含新增数量和新增商品
   * @param data 
   */
  async create(data: shoppingCartItem): Promise<import("../../../src/manager/response").ManagerResponse> {
    const { userId, productId, sku, num, shopId } = data
    const shoppingCartItem = await ShoppingCartModel.findOne({
      where: {
        userId,
        productId,
        sku,
        shopId
      }
    })
    let result = null
    if (shoppingCartItem) {
      shoppingCartItem.setDataValue('num', shoppingCartItem.getDataValue('num') + num)
      result = await shoppingCartItem.save()
    } else {
      result = await ShoppingCartModel.create({
        userId, productId, sku, num
      })
    }
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.ADD_SUCCESS, data: result })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.ADD_FAIL })
    }
  }
  edit(data: any): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList(data: ListFilterInterface & { userId: number }): Promise<import("../../../src/manager/response").ManagerResponse> {
    const { pageSize = 10, pageNo = 1 } = data
    // const where = global.util.lodash.omitNil({})
    const listParams = buildCommonListParams({ pageNo, pageSize })
    const result = await ShoppingCart.findAndCountAll({
      ...listParams
    })
    const { rows, count } = result

    // 返回数据的格式定义
    const list = rows.map(row => {
      return row.toJSON()
    })
    return new ManagerResponseSuccess({ msg: 'ok', data: list })
  }

}

interface ShoppingCartListItemInterface {
  data: {
    shopInfo: {
      id: number
      name: string
    },
    products: {
      name: string
      sku: string
      num: number
    }[]
  }
}

class ShoppingCartListItem {
  shopInfo: {
    id: number
    name: string
  }
  constructor(d: ShoppingCartListItemInterface) {

  }
}

export default shoppingCartManager