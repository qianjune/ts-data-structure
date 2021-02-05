/**
 * @description LevelGroupLevelRelation service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import LevelGroupLevelRelationManager from "@micro-services/member-service/src/manager/levelGroupLevelRelation";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const levelGroupLevelRelationManager = new LevelGroupLevelRelationManager();
class LevelGroupLevelRelationService implements CommonService {
  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<void> {
    const result = await levelGroupLevelRelationManager.create(data);
    ResponseHandler.send(result);
  }

  /**
   * 编辑
   * @param data
   */
  async edit<T>(data: T): Promise<void> {
    const result = await levelGroupLevelRelationManager.edit(data);
    ResponseHandler.send(result);
  }

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<void> {
    const result = await levelGroupLevelRelationManager.del(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<void> {
    const result = await levelGroupLevelRelationManager.getInfo(id);
    ResponseHandler.send(result);
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await levelGroupLevelRelationManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default LevelGroupLevelRelationService;
