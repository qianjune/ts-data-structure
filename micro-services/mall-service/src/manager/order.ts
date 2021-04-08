/**
 * @description OrderManager orm
 */

import {
  CommonManager,
  ListFilterInterface,
  buildCommonListParams,
} from "@src/manager/interface/commonManager";
import {
  ManagerResponse,
  ManagerResponseSuccess,
  ListDataModel,
  ResponseMsg,
  ManagerResponseFailure,
} from "@src/manager/response";
import OrderDb, {
  OrderStatus,
} from "@micro-services/mall-service/src/db/order";
interface OrderInterface {
  shippingAddress: { [keyName: string]: any };
  goods: { [keyName: string]: any }[];
}
const placeholder = "订单";
const responseMsg = ResponseMsg(placeholder);
class OrderManager implements CommonManager {
  _dataFormatHandler(d: any): any {
    const r = d.toJSON() as any;
    r.address = JSON.parse(r.address);
    r.goods = JSON.parse(r.goods);
    return r;
  }
  _buildOrderNumber = (data: {
    platform: number;
    payPath: number;
    businessType: number;
    timestap: string;
  }): string => {
    const { platform, payPath, businessType, timestap } = data;
    return `${platform}${payPath}${businessType}${timestap}`;
  };
  async create(data: OrderInterface): Promise<ManagerResponse<any>> {
    let order: any = await OrderDb.create(data);
    console.log(order.toJSON());
    order = order.toJSON();
    order.goods = JSON.parse(order.goods);
    order.shippingAddress = JSON.parse(order.address);
    /**
     * todo list
     * 添加一个加密生成的订单编码 包含 用户id + 订单时间 + 用户ip
     */
    delete order.address;
    if (order) {
      return new ManagerResponseSuccess({
        data: order,
        msg: responseMsg.CREATE_SUCCESS,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }
  edit(data: any): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const result = await OrderDb.findOne({
      where: { id },
    });
    if (!result) {
      return new ManagerResponseFailure({ msg: responseMsg.GET_DETAIL_FAIL });
    }
    return new ManagerResponseSuccess({
      msg: responseMsg.GET_DETAIL_SUCCESS,
      data: this._dataFormatHandler(result),
    });
  }
  async getList?(
    data: ListFilterInterface & { status: OrderStatus; userId: number }
  ): Promise<ManagerResponse<any>> {
    const { pageNo, pageSize, status, userId } = data;
    const where: any = global.util.lodash.omitNil({
      status,
      userId,
    });
    console.log("where", where);

    const list = await OrderDb.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
      where,
    });
    const { count, rows } = list;
    const result = rows.map((row) => {
      return this._dataFormatHandler(row);
    });
    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: result, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }

  /**
   * 获取用户每种订单的数量
   * @param userId
   */
  async getAmount(userId: number): Promise<ManagerResponse<any>> {
    const listParams = buildCommonListParams({ pageNo: 1, pageSize: 50 });
    // 搜四次列表太慢，应该在每次单个订单有状态有变化的时候就进行记录
    const pendingPaymentList = await OrderDb.findAndCountAll({
      ...listParams,
      where: {
        userId,
        status: OrderStatus.PENDING_PAYMENT,
      },
    });
    const deliveredList = await OrderDb.findAndCountAll({
      ...listParams,
      where: {
        userId,
        status: OrderStatus.TO_BE_DELIVERED,
      },
    });
    const receivedList = await OrderDb.findAndCountAll({
      ...listParams,
      where: {
        userId,
        status: OrderStatus.TO_BE_RECEIVED,
      },
    });
    const commentList = await OrderDb.findAndCountAll({
      ...listParams,
      where: {
        userId,
        status: OrderStatus.COMMENT,
      },
    });
    return new ManagerResponseSuccess({
      data: {
        pendingPayment: pendingPaymentList.count,
        delivered: deliveredList.count,
        received: receivedList.count,
        comment: commentList.count,
      },
      msg: "订单数量",
    });
  }
}

export default OrderManager;
