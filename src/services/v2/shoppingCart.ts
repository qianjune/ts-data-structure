/**
 * @description shoppingCart service
 */
import { CommonService } from "@src/services/interface/common";
import ShoppingCartManager from "@src/manager/v2/shoppingCart";
import { ResponseHandler } from "@src/utils/responseHandler";
const shoppingCartManager = new ShoppingCartManager()
class shoppingCartService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await shoppingCartManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
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

export default shoppingCartService