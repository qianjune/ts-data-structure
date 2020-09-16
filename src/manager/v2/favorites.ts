/**
 * @description FavoritesManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import FavoritesDb, { FavoritesItemType } from "@src/db/models/v2/favorites";
interface FavoritesItem {
  type: FavoritesItemType
  likeId: number
  userId: number
}
const placeholder = '收藏'
const responseMsg = ResponseMsg(placeholder)
class FavoritesManager implements CommonManager {
  async create(data: FavoritesItem): Promise<ManagerResponse> {
    const { type, likeId, userId } = data
    const item = await FavoritesDb.findOne({
      where: {
        type, likeId, userId
      }
    })
    if (item) {
      return new ManagerResponseFailure({ msg: responseMsg.HAVE_COLLECTED })
    }
    const result = await FavoritesDb.create(data)
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
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
  async getList?(data: ListFilterInterface & {
    userId: number
    type: FavoritesItemType
  }): Promise<ManagerResponse> {
    const { pageNo, pageSize, userId, type } = data
    const where = global.util.lodash.omitNil({
      userId, type
    })
    const list = await FavoritesDb.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
      where
    })
    const { rows, count } = list
    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: rows, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default FavoritesManager