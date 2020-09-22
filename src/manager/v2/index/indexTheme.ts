/**
 * @description IndexThemeManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import IndexThemeDb from "@src/db/models/v2/index/indexTheme";
import { Product } from "@src/db/models";
import asyncForEach from "@src/utils/async_forEach";
import ProductManager from "../product";
const productManager = new ProductManager()
const placeholder = '首页主题'
const responseMsg = ResponseMsg(placeholder)
class IndexThemeManager implements CommonManager {
  async create(data: { title: string, goods: any }): Promise<ManagerResponse> {
    const cloneData = { ...data }
    const { title } = cloneData
    const item = await IndexThemeDb.findOne({
      where: {
        title
      }
    })
    if (item) {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    cloneData.goods = cloneData.goods.join('')
    const result = await IndexThemeDb.create(cloneData)
    if (result) {
      return new ManagerResponseSuccess({ data: result, msg: responseMsg.CREATE_SUCCESS })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
    }
  }
  edit(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageNo, pageSize } = data

    const list = await IndexThemeDb.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize })
    })
    const { rows, count } = list
    return await sequelize.transaction(async (t: any) => {
      const cloneRows = []

      for (const row of rows) {
        const item = row.toJSON() as any
        const goodsIds = item.goods.split(',')

        const goods: any[] = []
        for (const goodsId of goodsIds) {
          const goodsDetail = await productManager.getInfo(goodsId)
          if (goodsDetail.data) {
            goods.push(goodsDetail.data)

          }
        }

        item.goods = goods
        cloneRows.push(item)
      }

      return new ManagerResponseSuccess({
        data: new ListDataModel({ data: cloneRows, total: count, pageNo, pageSize }),
        msg: responseMsg.FETCH_LIST_SUCCESS
      })
    })

  }

}

export default IndexThemeManager