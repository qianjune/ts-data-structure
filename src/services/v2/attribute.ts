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
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default AttributeService