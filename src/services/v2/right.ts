/**
 * @description Right service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import RightManager from "@src/manager/v2/right";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const rightManager = new RightManager();
class RightService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await rightManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await rightManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await rightManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await rightManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await rightManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default RightService;
