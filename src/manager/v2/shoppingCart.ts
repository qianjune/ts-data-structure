/**
 * @description shoppingCart orm
 */

import { CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import sequelize from "@root/core/db";
import { ShoppingCartModel } from "@src/db/models";
import { ResponseMsg, ManagerResponseSuccess, ManagerResponseFailure } from "../response";
interface shoppingCartItem {
  id?: number
  uid: number
  productId: number
  sku: string
  num: number
}

const placeholder = '购物车'
const responseMsg = ResponseMsg(placeholder)
class shoppingCartManager implements CommonManager {
  /**
   * 包含新增数量和新增商品
   * @param data 
   */
  async create(data: shoppingCartItem): Promise<import("../../../src/manager/response").ManagerResponse> {
    const { uid, productId, sku, num } = data
    const shoppingCartItem = await ShoppingCartModel.findOne({
      where: {
        uid,
        productId,
        sku
      }
    })
    let result = null
    if (shoppingCartItem) {
      shoppingCartItem.setDataValue('num', shoppingCartItem.getDataValue('num') + num)
      result = await shoppingCartItem.save()
    } else {
      result = await ShoppingCartModel.create({
        uid, productId, sku, num
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
  getList?(data: ListFilterInterface & { uid: number }): Promise<import("../../../src/manager/response").ManagerResponse> {
    throw new Error("Method not implemented.");
  }

}

export default shoppingCartManager