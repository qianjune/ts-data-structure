/**
 * @description IndexCarouselManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import IndexCarouselDb from "@src/db/models/v2/index/indexCarousel";

const placeholder = 'IndexCarouselManager'
const responseMsg = ResponseMsg(placeholder)
class IndexCarouselManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {
    const result = await IndexCarouselDb.create(data)
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
    const list = await IndexCarouselDb.findAndCountAll({
      ...buildCommonListParams({
        pageNo, pageSize, order: [
          ['weights', 'desc'],
          ['updatedAt', 'desc']
        ]
      })
    })
    const { rows, count } = list
    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: rows,
        total: count,
        pageNo,
        pageSize
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default IndexCarouselManager