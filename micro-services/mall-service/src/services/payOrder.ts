/**
 * @description 支付订单 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import PayOrderManager from "@micro-services/mall-service/src/manager/payOrder";
import { ManagerResponse, ManagerResponseFailure } from "@src/manager/response";
import WalletManager from "@root/micro-services/user-service/src/manager/wallet";
import WalletService from "@root/micro-services/user-service/src/services/wallet";
import { PayPathNumber } from "../enum/order-number";
import { PayOrderStatus } from "../db/payOrder";
import OrderManager from "../manager/order";
import { OrderStatus } from "../db/order";
const payOrderManager = new PayOrderManager();
const walletService = new WalletService();
const orderManager = new OrderManager();
class PayOrderService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await payOrderManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await payOrderManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await payOrderManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await payOrderManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await payOrderManager.getList(data);
    ResponseHandler.send(result);
  }

  /**
   * 支付订单
   * @param data
   */
  async pay(data: {
    id: number;
    payPath: string;
    userId: number;
    password: string;
  }): Promise<ManagerResponse<any>> {
    const { id, payPath, userId, password } = data;
    // 判断订单是否是可支付状态
    let canPay = false;
    const item = await payOrderManager._getInfo({ id });
    if (item.status === PayOrderStatus.PENDING_PAYMENT) {
      canPay = true;
    }
    if (!canPay)
      return new ManagerResponseFailure({ msg: "订单不是未支付状态" });
    // 根据选择的支付方式执行不同的方法
    if (payPath === PayPathNumber.SELF) {
      // 执行app内支付
      const walletPayResult = await walletService.pay({
        userId,
        amount: item.totalPrice,
        password,
      });
      if (walletPayResult.success) {
        // 钱包支付成功后，支付订单状态修改为已支付
        const payOrderResult = await payOrderManager.edit({
          id,
          status: PayOrderStatus.PAID,
        });
        if (payOrderResult.success) {
          // 支付订单状态修改成功后修改订单状态为待发货
          return orderManager.edit({
            id: item.orderId,
            status: OrderStatus.TO_BE_DELIVERED,
          });
        }
      }
    } else if (
      payPath === PayPathNumber.ALIPAY ||
      payPath === PayPathNumber.WECHAT
    ) {
      //走支付宝或微信支付
    }
  }
}

export default PayOrderService;
