/**
 * @description IndexThemeManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import IndexThemeDb from "@src/db/models/v2/index/indexTheme";

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
    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: rows, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default IndexThemeManager