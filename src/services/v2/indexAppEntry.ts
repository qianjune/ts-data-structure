/**
 * @description IndexAppEntryService service
 */
import { CommonService } from "@src/services/interface/common";

class IndexAppEntryService implements CommonService {
  create(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit<T>(data: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }

}

export default IndexAppEntryService