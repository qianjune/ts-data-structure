import { CommonService } from "@src/services/interface/common";
import ProductManager from "@src/manager/v2/product";
import { ResponseHandler } from "@src/utils/responseHandler";
import { omit, cloneDeep } from "lodash";

const productManager = new ProductManager()

class ProductService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }


  async create(data: any): Promise<void> {
    const result = await productManager.create(data)
    ResponseHandler.send(result)
  }

  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<void> {
    const result = await productManager.getInfo(id)
    const cloneResult = { ...result }
    console.log(cloneResult)
    ResponseHandler.send(cloneResult)
  }
  async getList(data: any): Promise<void> {
    const result = await productManager.getList(data)
    ResponseHandler.send(result)
  }
  async getListForApp(data: any): Promise<void> {
    const result = await productManager.getList(data)
    const cloneResult = { ...result }
    ResponseHandler.send(cloneResult)
  }

}

export default ProductService