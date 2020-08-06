import { CommonService } from "../interface/common";
import AttributeManager, { AttributeItemInterface } from "@src/manager/v2/attribute";
import { ResponseHandler } from "@src/utils/responseHandler";

const attributeManager = new AttributeManager()
class AttributeService implements CommonService {
  async create(data: AttributeItemInterface): Promise<void> {
    const result = await attributeManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<void> {
    const result = await attributeManager.del(id)
    ResponseHandler.send(result)
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    const result = await attributeManager.getList(data)
    ResponseHandler.send(result)
  }

}

export default AttributeService