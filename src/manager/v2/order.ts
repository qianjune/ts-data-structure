/**
 * @description OrderManager orm
 */

import { CommonManager, ListFilterInterface, buildCommonListParams } from "@src/manager/interface/commonManager";
import { ManagerResponse, ManagerResponseSuccess, ListDataModel, ResponseMsg, ManagerResponseFailure } from "@src/manager/response";

import sequelize from "@root/core/db";
import OrderDb, { OrderStatus } from "@src/db/models/v2/order";
interface OrderInterface {
  shippingAddress: {

  },
  goods: {

  }[]
}
const placeholder = '订单'
const responseMsg = ResponseMsg(placeholder)
class OrderManager implements CommonManager {
  async create(data: OrderInterface): Promise<ManagerResponse> {

    let order: any = await OrderDb.create(data)
    console.log(order.toJSON())
    order = order.toJSON()
    order.goods = JSON.parse(order.goods)
    order.shippingAddress = JSON.parse(order.address)
    delete order.address
    if (order) {
      return new ManagerResponseSuccess({ data: order, msg: responseMsg.CREATE_SUCCESS })
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
  async getList?(data: ListFilterInterface & { status: OrderStatus }): Promise<ManagerResponse> {
    const { pageNo, pageSize, status } = data
    const where: any = global.util.lodash.omitNil({
      status
    })
    console.log('where', where)

    const list = await OrderDb.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
      where
    })
    const { count, rows } = list
    const result = rows.map(row => {
      const r = row.toJSON() as any
      r.address = JSON.parse(r.address)
      r.goods = JSON.parse(r.goods)
      return r
    })
    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: result, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS
    })
  }

}

export default OrderManager