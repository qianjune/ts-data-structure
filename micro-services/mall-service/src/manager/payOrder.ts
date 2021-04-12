/**
 * @description 支付订单 orm
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
  ListDataInterface,
} from "@src/manager/response";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { ResponseHandler } from "@src/utils/responseHandler";
import PayOrderDb, {
  PayOrderStatus,
} from "@micro-services/mall-service/src/db/payOrder";
import { OrderStatus } from "../db/order";
import { OrderNumberBuilder } from "../enum/order-number";
import OrderManager from "./order";
const orderManager = new OrderManager();
const placeholder = "PayOrder";
const responseMsg = ResponseMsg(placeholder);
class PayOrderManager implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(
    where: { id?: number; orderCode?: string; orderId?: number },
    config?: { msg?: string }
  ): Promise<any> {
    const item = await PayOrderDb.findOne({
      where,
    });
    if (!item) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
      );
    }
    return item.toJSON();
  }

  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    const { orderId, orderCode, payPath, userInfo } = data;
    const orderInfo = await orderManager._getInfo({
      id: orderId,
      code: orderCode,
    });
    console.log(orderInfo, "orderInfo...");
    let result = null;
    // https://cloud.tencent.com/developer/article/1522935
    // 获取商品订单详情
    // 判断订单status是否是PENDING_PAYMENT
    if (orderInfo.status === OrderStatus.PENDING_PAYMENT) {
      // 如果是则生成新的支付订单，并且修改商品订单状态未PAY_PROCESS
      result = await sequelize.transaction(async (t: any) => {
        const payOrder = await PayOrderDb.create(
          {
            code: OrderNumberBuilder.buildPayOrderNumber({
              orderCode,
              userInfo,
              payPath,
            }),
            orderCode,
            orderId,
            totalPrice: orderInfo.totalPrice,
            userId: userInfo.id,
          },
          { transaction: t }
        );
        if (payOrder) {
          // transaction 需要 事物处理
          const orderStatusEditResult = await orderManager.edit(
            {
              id: orderInfo.id,
              status: OrderStatus.PAY_PROCESS,
            },
            { transaction: t }
          );
          if (orderStatusEditResult) {
            return payOrder;
          }
        }
        return null;
      });
    }

    // 如果订单status是PAY_PROCESS，贼查询到该订单相应的支付订单，返回
    else if (orderInfo.status === OrderStatus.PAY_PROCESS) {
      result = await this._getInfo({
        orderCode,
        orderId,
      });
    }
    // 如果支付订单被取消，贼将相应的商品订单改变状体或者隐藏
    // const item = await PayOrderDb.findOne({
    //   where: {},
    // });
    // if (item) {
    //   return new ManagerResponseFailure({
    //     msg: responseMsg.CREATE_FAIL_BY_EXISTED,
    //   });
    // }

    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }

  /**
   * 编辑
   * @param data
   */
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id, status } = data;
    const item = await this._getInfo({ id });
    const updateData = global.util.lodash.omitNil(data);
    let msg = responseMsg.EDIT_FAIL;
    // 退款处理 (先确认该支付订单是否已经支付成功)
    if (item["status"] === PayOrderStatus.PAID && status === "refund") {
      // 1. 调用退款流程（第三方/自带服务) 之后退款成功后调用支付订单修改状态为 已退款
      // 2. 修改订单状态成 退款中
      updateData["status"] = PayOrderStatus.REFUNDING;
    }
    const result = await PayOrderDb.update(updateData, {
      where: {
        id,
      },
    });
    if (result[0] > 0) {
      msg = responseMsg.EDIT_SUCCESS;
      return new ManagerResponseSuccess({
        data: null,
        msg,
      });
    } else {
      return new ManagerResponseFailure({ msg });
    }
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<ManagerResponse<any>> {
    const item = await await this._getInfo({ id });
    return await sequelize.transaction(async (t: any) => {
      const result = await PayOrderDb.destroy({
        where: {
          id,
        },
      });
      if (result) {
        return new ManagerResponseSuccess({
          msg: responseMsg.DELETE_SUCCESS,
          data: true,
        });
      } else {
        return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL });
      }
    });
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const item = await this._getInfo({ id });
    return new ManagerResponseSuccess({
      msg: responseMsg.GET_DETAIL_SUCCESS,
      data: item,
    });
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(
    data: ListFilterInterface,
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<ListDataInterface>> {
    const { pageSize = 10, pageNo = 1 } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      const result = await PayOrderDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const PayOrderList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: PayOrderList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default PayOrderManager;
