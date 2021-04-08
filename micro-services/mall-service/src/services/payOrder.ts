/**
 * @description 支付订单 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import PayOrderManager from "@micro-services/mall-service/src/manager/payOrder";
const payOrderManager = new PayOrderManager();
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
}

export default PayOrderService;
