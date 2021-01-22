/**
 * @description RightsRelation service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import RightsRelationManager from "@src/manager/v2/rightsRelation";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const rightsRelationManager = new RightsRelationManager();
class RightsRelationService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await rightsRelationManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await rightsRelationManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await rightsRelationManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await rightsRelationManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await rightsRelationManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default RightsRelationService;
