/**
 * @description 逆向订单 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import ReverseOrderManager from "@micro-services/mall-service/src/manager/reverseOrder";
const reverseOrderManager = new ReverseOrderManager();
class ReverseOrderService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await reverseOrderManager.create(data);
    return result;
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await reverseOrderManager.edit(data);
    return result;
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await reverseOrderManager.del(id);
    return result;
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await reverseOrderManager.getInfo(id);
    return result;
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await reverseOrderManager.getList(data);
    return result;
  }
}

export default ReverseOrderService;
