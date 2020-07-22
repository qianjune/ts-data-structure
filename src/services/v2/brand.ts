import { CommonService } from "../interface/common";
import BrandManager, { BrandItemInterface } from "@src/manager/v2/brand";
import { ResponseHandler } from "@src/utils/responseHandler";
const brandManager = new BrandManager()
class BrandService implements CommonService {
  async create(data: BrandItemInterface): Promise<void> {
    const result = await brandManager.create(data)
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

}

export default BrandService