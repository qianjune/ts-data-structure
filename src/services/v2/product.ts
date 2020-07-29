import { CommonService } from "../interface/common";
import ProductManager from "@src/manager/v2/product";
import { ResponseHandler } from "@src/utils/responseHandler";

const productManager = new ProductManager

class ProductService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await productManager.create(data)
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
  async getList(data: any): Promise<void> {
    const result = await productManager.getList(data)
    ResponseHandler.send(result)
  }

}

export default ProductService