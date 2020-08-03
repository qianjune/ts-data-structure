import { CommonService } from "../interface/common";

class AttributeService implements CommonService{
  create(data: any): Promise<void> {
    throw new Error("Method not implemented.");
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