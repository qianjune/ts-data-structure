/**
 * @description 快递物流服务 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import ExpressDeliveryManager from "@micro-services/common-service/src/manager/expressDelivery";
const expressDeliveryManager = new ExpressDeliveryManager();
class ExpressDeliveryService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await expressDeliveryManager.create(data);
    return result;
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await expressDeliveryManager.edit(data);
    return result;
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await expressDeliveryManager.del(id);
    return result;
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await expressDeliveryManager.getInfo(id);
    return result;
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await expressDeliveryManager.getList(data);
    return result;
  }
}

export default ExpressDeliveryService;
