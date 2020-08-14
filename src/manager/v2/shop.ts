/**
 * @description 店铺 orm
 */
import { ShopModel } from '@src/db/models'
import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg } from '../response';
import ShopUserRelation from '@src/db/models/v2/shopUserRelation';
import sequelize from '@root/core/db';
const placeholder = '店铺'
const responseMsg = ResponseMsg(placeholder)
class ShopManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {
    console.log('data', data)

    const shopInfo = await ShopModel.findOne({
      where: {
        name: data.name
      }
    })
    if (shopInfo) {
      return new ManagerResponse({ success: false, msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await ShopModel.create(data, { transaction: t })
      console.log('result', result)
      const bindRelation = await ShopUserRelation.create({
        uid: global.state.userInfo.id,
        shopId: result.getDataValue('id' as any)
      }, { transaction: t })
      if (bindRelation) {
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
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1 } = data
    const result = await ShopModel.findAndCountAll({
      limit: pageSize,
      offset: pageSize * (pageNo - 1),
      order: [
        ['id', 'desc']
      ]
    })
    const { count, rows } = result
    const brandList = rows.map(row => row.toJSON())

    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: brandList, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }
}

export default ShopManager