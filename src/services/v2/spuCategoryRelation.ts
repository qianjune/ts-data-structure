/**
 * @description SpuCategoryRelation service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import SpuCategoryRelationManager from "@src/manager/v2/spuCategoryRelation";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const spuCategoryRelationManager = new SpuCategoryRelationManager();
class SpuCategoryRelationService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await spuCategoryRelationManager.create(data);
    ResponseHandler.send(result);
  }
  async edit<T>(data: T): Promise<void> {
    const result = await spuCategoryRelationManager.edit(data);
    ResponseHandler.send(result);
  }
  async del(id: number): Promise<void> {
    const result = await spuCategoryRelationManager.del(id);
    ResponseHandler.send(result);
  }
  async getInfo(id: number): Promise<void> {
    const result = await spuCategoryRelationManager.getInfo(id);
    ResponseHandler.send(result);
  }
  async getList?(data: any, config?: RequestConfigInterface): Promise<void> {
    const result = await spuCategoryRelationManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default SpuCategoryRelationService;
