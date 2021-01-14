/**
 * @description category service
 */

import { CommonService } from "@src/services/interface/common";
import CategoryManager, {
  CategoryItemInterface,
  CategoryListParamsInterface,
} from "@src/manager/v2/category";
import { ResponseHandler } from "@src/utils/responseHandler";
import { RequestConfigInterface } from "@src/manager/interface/interface";
const categoryManager = new CategoryManager();
class CategoryService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(data: CategoryItemInterface): Promise<void> {
    const result = await categoryManager.create(data);
    ResponseHandler.send(result);
  }

  async del(id: number): Promise<void> {
    const result = await categoryManager.del(id);
    ResponseHandler.send(result);
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(
    data: CategoryListParamsInterface,
    config?: RequestConfigInterface
  ): Promise<void> {
    const result = await categoryManager.getList(data, config);
    ResponseHandler.send(result);
  }
}

export default CategoryService;
