/**
 * @description BrowseRecords orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";
import BrowseRecordsDb from '@src/db/models/v2/user/browseRecords'
import sequelize from "@root/core/db";

const placeholder = 'BrowseRecords'
const responseMsg = ResponseMsg(placeholder)
class BrowseRecords implements CommonManager {
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await BrowseRecordsDb.findOne({
      where: { id }
    })
    if (!item) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
    }
    return item
  }
  async create(data: any): Promise<ManagerResponse> {
    const { uid, shopId, productId } = data;

    const searchParams = global.util.lodash.omitNil({
      uid, shopId, productId
    })
    if (Object.keys(searchParams).length < 2) {
      return new ManagerResponseFailure({ msg: '参数缺失' })
    }
    const item = await BrowseRecordsDb.findOne({
      where: {
        ...searchParams
      }
    })
    if (item) {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL_BY_EXISTED })
    }
    const result = await BrowseRecordsDb.create(data)
    if (result) {
      return new ManagerResponseSuccess({ msg: responseMsg.CREATE_SUCCESS, data: result })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL })
    }
  }
  async edit(data: any): Promise<ManagerResponse> {
    const { id } = data
    const item = await this._getInfo(id)
    const d = item.toJSON()
    const result = await BrowseRecordsDb.update({ ...d, diabled: !d.disbaled }, {
      where: {
        id
      }
    })
    if (result[0] > 0) {
      return new ManagerResponseSuccess({ data: null, msg: responseMsg.EDIT_SUCCESS })
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL })
    }
  }
  async del(id: number): Promise<ManagerResponse> {
    const item = await await this._getInfo(id)
    return await sequelize.transaction(async (t: any) => {
      const result = await BrowseRecordsDb.destroy({
        where: {
          id
        }
      })
      if (result) {
        return new ManagerResponseSuccess({ msg: responseMsg.DELETE_SUCCESS, data: true })
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL })
      }
    })
  }
  async getInfo(id: number): Promise<ManagerResponse> {
    const item = await this._getInfo(id)
    return new ManagerResponseSuccess({ msg: responseMsg.GET_DETAIL_SUCCESS, data: item })
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1 } = data
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize })
      const result = await BrowseRecordsDb.findAndCountAll({
        ...listParams,
      })
      const { count, rows } = result
      const BrowseRecordsList = rows.map((row: any) => {
        const data: any = row.toJSON()
        return data
      })

      return new ManagerResponseSuccess({
        data: new ListDataModel({ data: BrowseRecordsList, total: count, pageNo, pageSize }),
        msg: responseMsg.FETCH_LIST_SUCCESS
      })
    })
  }

}

export default BrowseRecords