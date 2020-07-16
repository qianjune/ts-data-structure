/**
 * @description 产品 orm
 */

import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { Product } from "@src/db/models";
import { ManagerResponse } from "../response";
import sequelize from "@root/core/db";

class ProductManager implements CommonManager {
  async create(data: {
    name: string;
    shopId: number;
  }): Promise<ManagerResponse> {
    const productInfo = await Product.findOne({
      where: {
        name: data.name
      }
    })
    if (productInfo) {
      return new ManagerResponse({ success: false, msg: '创建商品失败，商品名已被占用' })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await Product.create(data, { transaction: t })
      // const bindRelationWithShop = await ShopProductRelation.create({
      //   shopId: data.shopId,
      //   productId: result.getDataValue('id')
      // }, { transaction: t })
      if (result) {
        return new ManagerResponse({ success: true, msg: '创建商品成功', data: result })
      } else {
        return new ManagerResponse({ success: true, msg: '创建商品失败，请稍后再试', data: result })
      }
    })
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): void {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  async getList(data: ListFilterInterface & { shopId: number }): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1, shopId } = data
    console.log('pageSize', pageSize)
    console.log('pageNo', pageNo)
    console.log('shopId', shopId)
    const result = await Product.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (pageNo - 1),
      order: [
        ['id', 'desc']
      ],
      where: {
        shopId
      }
    })
    const productList = result.rows.map(row => row.toJSON())
    return new ManagerResponse({ success: true, data: productList, msg: '商品列表请求成功' })
  }

}

export default ProductManager