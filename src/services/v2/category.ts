/**
 * @description category service
 */

import { CommonService } from "../interface/common";
import CategoryManager, { CategoryItemInterface } from "@src/manager/v2/category";
import { ResponseHandler } from "@src/utils/responseHandler";
const categoryManager = new CategoryManager()
class CategoryService implements CommonService {
  async create(data: CategoryItemInterface): Promise<void> {
    const result = await categoryManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): void {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default CategoryService