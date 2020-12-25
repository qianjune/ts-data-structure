/**
 * @description shoppingCart orm
 */

import { buildCommonListParams, CommonManager, ListFilterInterface } from "@src/manager/interface/commonManager";
import sequelize from "@root/core/db";
import { Product, ShopModel, ShoppingCart } from "@src/db/models";
import R from 'ramda'
import { ResponseMsg, ManagerResponseSuccess, ManagerResponseFailure } from "../response";
import ProductManager from "./product";
const productManager = new ProductManager()
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
    const shoppingCartItem = await ShoppingCart.findOne({
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
      result = await ShoppingCart.create({
        userId, productId, sku, num, shopId
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
      ...listParams,
      include: [
        {
          model: ShopModel,
          as: 'shop',
          // attributes: ['name']
        },
      ],
    })
    const { rows, count } = result

    // 返回数据的格式定义
    const list = await Promise.all(
      rows.map(async row => {
        const d: any = row.toJSON()
        const productInfo = await productManager.getInfo(d.productId)
        const salePrice = productInfo.data.skuGroup.find((sku: { code: string }) => sku.code === d.sku)?.salePrice ?? null
        d.salePrice = salePrice
        d.productName = productInfo.data.name
        return d
      })
    )

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: ramda
    const groupByList = R.groupBy(R.prop('shopId'))(list)
    const shopIdGroup = Object.keys(groupByList)
    const finalData = shopIdGroup.map((shopId: string) => {
      const info = groupByList[shopId]
      const productsArr: any[] = []
      let shopInfo: any = {}
      info.forEach((p: any, index: number) => {
        if (index === 0) {
          shopInfo = p.shop
        }
        productsArr.push({
          id: p.productId,
          name: p.productName,
          sku: p.sku,
          num: p.num,
          salePrice: p.salePrice
        })
      })
      console.log(info.shop)
      const listItem = new ShoppingCartListItem({
        products: productsArr,
        shopInfo
      })
      return Object.assign({}, listItem)
    })
    return new ManagerResponseSuccess({ msg: 'ok', data: finalData })
  }

}

interface ShopInfo {
  id: number
  name: string
  logo: string
}
interface product {
  id: number
  name: string
  sku: string
  num: number
  salePrice: number
}
interface ShoppingCartListItemInterface {
  shopInfo: ShopInfo,
  products: product[]
}

class ShoppingCartListItem {
  shopInfo: ShopInfo
  products: product[]
  constructor(d: ShoppingCartListItemInterface) {
    const { shopInfo, products } = d
    this.shopInfo = shopInfo
    this.products = products
  }
}

export default shoppingCartManager