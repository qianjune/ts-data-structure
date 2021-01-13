import { CommonService } from "@src/services/interface/common";
import BrandManager, { BrandItemInterface } from "@src/manager/v2/brand";
import { ResponseHandler } from "@src/utils/responseHandler";
import { ListParamsInterface } from "@src/manager/interface";
const brandManager = new BrandManager()
class BrandService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(data: BrandItemInterface): Promise<void> {
    const result = await brandManager.create(data)
    ResponseHandler.send(result)
  }

  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList(data: ListParamsInterface): Promise<void> {
    const result = await brandManager.getList(data)
    ResponseHandler.send(result)
  }
}

export default BrandService