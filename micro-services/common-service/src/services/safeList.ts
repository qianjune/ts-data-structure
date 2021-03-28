/**
 * @description 安全名单 service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import SafeListManager from "@micro-services/common-service/src/manager/safeList";
const safeListManager = new SafeListManager();
class SafeListService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await safeListManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(
    data: T,
    config?: {
      type: "add" | "del";
    }
  ): Promise<void> {
    const result = await safeListManager.edit(data, config);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await safeListManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await safeListManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await safeListManager.getList(data);
    ResponseHandler.send(result);
  }

  /**
   * 匹配内容
   * @param data
   * @param config
   */
  async match?(data: { id: number; content: string }): Promise<void> {
    const result = await safeListManager.match(data);
    ResponseHandler.send(result);
  }
}

export default SafeListService;
