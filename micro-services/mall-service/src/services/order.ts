/**
 * @description OrderService service
 */
import {
  ManagerResponseFailure,
  ManagerResponseSuccess,
} from "@src/manager/response";
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { OrderStatus } from "../db/order";
import { PayPathNumber } from "../enum/order-number";
import OrderManager from "../manager/order";
import PayOrderManager from "../manager/payOrder";
import ProductManager from "../manager/product";
const orderManager = new OrderManager();
const productManager = new ProductManager();
const payOrderManager = new PayOrderManager();
class OrderService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(data: any): Promise<void> {
    const { goods = [], user } = data;
    // 根据商品id，查询商品是否是上架状态并且还有库存
    const checkResult = await productManager._canBuyForGroup(
      goods?.map((g: { id: number; amount: number }) => ({
        id: g.id,
        wantToBuyAmount: g.amount,
      }))
    );
    const errorItem = checkResult.find((r) => !r.success);
    if (!errorItem) {
      // （将可用库存模拟-1）
      // 如果检查商品相关通过，开始创建订单
      const createOrderResult = await orderManager.create(data);
      if (createOrderResult.success) {
        // 创建订单成功后，创建支付订单
        const { id: orderId, code, status } = createOrderResult.data;
        const payOrderResult = await payOrderManager.create(
          {
            orderId,
            payPath: PayPathNumber.NOT_SELECTED,
            userInfo: user,
          },
          {
            fetchOrderDetail: false,
            orderDetail: {
              status,
              code,
            },
          }
        );
        if (payOrderResult.success) {
          // const orderStatusResult = await orderManager.edit({
          //   id: createOrderResult.data.id,
          //   status: OrderStatus.PAY_PROCESS,
          // });
          // if (orderStatusResult.success) {
          //   ResponseHandler.send(
          //     new ManagerResponseSuccess({ msg: "订单创建成功", data: {} })
          //   );
          // }
          ResponseHandler.send(
            new ManagerResponseSuccess({ msg: "订单创建成功", data: {} })
          );
        }
      }
    }
    ResponseHandler.send(new ManagerResponseFailure({ msg: "创建订单失败" }));
  }

  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<void> {
    ResponseHandler.send(await orderManager.getInfo(id));
  }
  async getList?(data: any): Promise<void> {
    const result = await orderManager.getList(data);
    ResponseHandler.send(result);
  }

  async getAmount(userId: number): Promise<void> {
    ResponseHandler.send(await orderManager.getAmount(userId));
  }
}

export default OrderService;
