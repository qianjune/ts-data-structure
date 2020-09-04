/**
 * @description OrderService service
 */
import { CommonService } from "@src/services/interface/common";

class OrderServiceService implements CommonService{
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  create(data: any): Promise<void> {
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

export default OrderServiceService