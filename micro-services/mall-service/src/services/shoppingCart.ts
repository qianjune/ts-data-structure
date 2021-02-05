/**
 * @description shoppingCart service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import ShoppingCartManager from "../manager/shoppingCart";
const shoppingCartManager = new ShoppingCartManager();
class shoppingCartService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(data: any): Promise<void> {
    const result = await shoppingCartManager.create(data);
    ResponseHandler.send(result);
  }

  async del(id: number): Promise<void> {
    const result = await shoppingCartManager.del(id);
    ResponseHandler.send(result);
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList(data: any): Promise<void> {
    const result = await shoppingCartManager.getList(data);
    ResponseHandler.send(result);
  }
}

export default shoppingCartService;
