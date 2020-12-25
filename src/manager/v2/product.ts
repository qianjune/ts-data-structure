/**
 * @description 产品 orm
 */

import { buildCommonListParams, CommonManager, ListFilterInterface } from "../interface/commonManager";
import { Product, ShopModel } from "@src/db/models";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";
import sequelize from "@root/core/db";
import { omit, cloneDeep } from "lodash";

const placeholder = '商品'
const responseMsg = ResponseMsg(placeholder)

interface goodsInfo {
  skuGroup: string, shopDetail: { name: string }, [propsName: string]: any
}

class ProductManager implements CommonManager {

  public skuGroupOriginDataToCodeHandler = (crd: any) => {
    if (crd.skuGroup) {
      crd.skuGroup = crd.skuGroup
        .filter((sg: any) => sg.enabled === 1)
        .map((sg: any, j: number) => {
          const attributeGroup = omit(sg, ['enabled', 'salePrice'])
          const attributeKeys = Object.keys(attributeGroup)
          const attributeLen = attributeKeys.length
          let attributeCode = ''
          if (attributeLen > 0) {
            attributeKeys.forEach((key, keyIndex) => {
              attributeCode += `${key}|${attributeGroup[key]}`
              if (keyIndex < attributeLen - 1)
                attributeCode += '-'
            })
          }
          sg.code = attributeCode
          sg = omit(sg, [...attributeKeys, 'enabled'])
          return sg
        })
    }
  }

  _shopInfoHandler(row: goodsInfo): goodsInfo {
    const cloneRow = { ...row }
    cloneRow.shopName = cloneRow.shopDetail.name
    delete cloneRow.shopDetail
    return cloneRow
  }
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
      },
      include: [
        {
          model: ShopModel,
          as: 'shopDetail',
          attributes: ['name']
        }
      ],
    })
    if (!productInfo) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
    let cloneProduct: any = productInfo.toJSON()
    cloneProduct = this._shopInfoHandler(cloneProduct)
    cloneProduct.skuGroup = JSON.parse(cloneProduct.skuGroup)
    this.skuGroupOriginDataToCodeHandler(cloneProduct)
    return new ManagerResponseSuccess({ data: cloneProduct, msg: responseMsg.GET_DETAIL_SUCCESS })
  }
  async getList(data: ListFilterInterface & { shopId?: number }): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1, shopId, belong } = data
    const where = global.util.lodash.omitNil({ shopId, belong })
    const listParams = buildCommonListParams({ pageNo, pageSize })
    const result = await Product.findAndCountAll({
      ...listParams,
      include: [
        {
          model: ShopModel,
          as: 'shopDetail',
          attributes: ['name']
        }
      ],
      where
    })
    const { rows, count } = result
    const productList = rows.map(row => {
      let cloneRow = { ...row.toJSON() } as goodsInfo
      cloneRow = this._shopInfoHandler(cloneRow)

      if (cloneRow.skuGroup) {
        cloneRow.skuGroup = JSON.parse(cloneRow.skuGroup)
      }
      this.skuGroupOriginDataToCodeHandler(cloneRow)
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