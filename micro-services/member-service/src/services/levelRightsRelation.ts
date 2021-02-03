/**
 * @description LevelRightsRelation service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import { LevelRightsRelationManager } from "@root/micro-services/member-service/src/manager";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const levelRightsRelationManager = new LevelRightsRelationManager();
class LevelRightsRelationService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await levelRightsRelationManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await levelRightsRelationManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await levelRightsRelationManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await levelRightsRelationManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await levelRightsRelationManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default LevelRightsRelationService;
