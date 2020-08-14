/**
 * @description 产品 orm
 */

import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { Product } from "@src/db/models";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "../response";
import sequelize from "@root/core/db";

const placeholder = '商品'
const responseMsg = ResponseMsg(placeholder)
class ProductManager implements CommonManager {
  async create(data: {
    name: string;
    shopId: number;
    skuGroup: any[] | string
  }): Promise<ManagerResponse> {
    const productInfo = await Product.findOne({
      where: {
        name: data.name,
        shopId: data.shopId
      }
    })
    if (productInfo) {
      return new ManagerResponse({ success: false, msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      const cloneData = { ...data }
      cloneData.skuGroup = JSON.stringify(cloneData.skuGroup)
      const result = await Product.create(cloneData, { transaction: t })
      // const bindRelationWithShop = await ShopProductRelation.create({
      //   shopId: data.shopId,
      //   productId: result.getDataValue('id')
      // }, { transaction: t })
      if (result) {
        return new ManagerResponse({ success: true, msg: responseMsg.CREATE_SUCCESS, data: result })
      } else {
        return new ManagerResponse({ success: true, msg: responseMsg.CREATE_FAIL, data: result })
      }
    })
  }
  edit<T>(data: T): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<ManagerResponse> {
    const productInfo = await Product.findOne({
      where: {
        id
      }
    })
    if (!productInfo) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
    const cloneProduct: any = productInfo.toJSON()
    cloneProduct.skuGroup = JSON.parse(cloneProduct.skuGroup)
    return new ManagerResponseSuccess({ data: cloneProduct, msg: responseMsg.GET_DETAIL_SUCCESS })
  }
  async getList(data: ListFilterInterface & { shopId: number }): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1, shopId } = data
    console.log('pageSize', pageSize)
    console.log('pageNo', pageNo)
    console.log('shopId', shopId)
    const where = global.util.lodash.omitNil({ shopId })
    console.log('where', where)
    const result = await Product.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (pageNo - 1),
      order: [
        ['id', 'desc']
      ],
      where
    })
    const { rows, count } = result
    const productList = rows.map(row => {
      const cloneRow = { ...row.toJSON() } as { skuGroup: string }
      console.log(cloneRow)
      if (cloneRow.skuGroup) {
        cloneRow.skuGroup = JSON.parse(cloneRow.skuGroup)
      }
      return cloneRow
    })
    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: productList, total: count, pageNo, pageSize
      }), msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default ProductManager