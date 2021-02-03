/**
 * @description LevelGroup service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { LevelGroupManager } from "@root/micro-services/member-service/src/manager";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const levelGroupManager = new LevelGroupManager();
class LevelGroupService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await levelGroupManager.create(data);
    ResponseHandler.send(result);
  }

  async matchLevel(data: any): Promise<void> {
    const result = await levelGroupManager.testMatchLevel(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await levelGroupManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await levelGroupManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await levelGroupManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await levelGroupManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default LevelGroupService;
