/**
 * @description OrderService service
 */
import { CommonService } from "@src/services/interface/common";
import OrderManager from "@src/manager/v2/order";
import { ResponseHandler } from "@src/utils/responseHandler";
const orderManager = new OrderManager()
class OrderService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async create(data: any): Promise<void> {
    const result = await orderManager.create(data)
    console.log(result)
    ResponseHandler.send(result)
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

export default OrderService