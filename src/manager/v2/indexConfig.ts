/**
 * @description IndexConfigManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import { IndexConfigDb } from "@src/db/models";

const placeholder = 'IndexConfigManager'
const responseMsg = ResponseMsg(placeholder)
class IndexConfigManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {
    console.log('---data---')
    console.log(data)

    const result = await IndexConfigDb.create({ ...data, data: JSON.stringify(data.data) })
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: { a: 1 } })
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
  async getInfo(id: number): Promise<ManagerResponse> {
    const result = await IndexConfigDb.findOne({
      where: {
        id
      }
    })
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.GET_DETAIL_SUCCESS, data: { a: 1 } })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.GET_DETAIL_FAIL })
    }
  }
  getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }

}

export default IndexConfigManager