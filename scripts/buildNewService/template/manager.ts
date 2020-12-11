/**
 * @description XXXXXX orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";
import { XXXXXXDb } from '@src/db/models'
import sequelize from "@root/core/db";

const placeholder = 'XXXXXX'
const responseMsg = ResponseMsg(placeholder)
class XXXXXX implements CommonManager {
  create(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
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
    const { pageSize = 10, pageNo = 1 } = data
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize })
      const result = await XXXXXXDb.findAndCountAll({
        ...listParams,
      })
      const { count, rows } = result
      const XXXXXXList = rows.map(row => {
        const data: any = row.toJSON()
        return data
      })

      return new ManagerResponseSuccess({
        data: new ListDataModel({ data: XXXXXXList, total: count, pageNo, pageSize }),
        msg: responseMsg.FETCH_LIST_SUCCESS
      })
    })
  }

}

export default XXXXXX