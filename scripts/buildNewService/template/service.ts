/**
 * @description XXXXXX service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";

class XXXXXX implements CommonService{
  async create(data: any): Promise<void> {
    const result = await 
    ResponseHandler.send(result)
  }
  async edit<T>(data: T): Promise<void> {
    const result = await 
    ResponseHandler.send(result)
  }
  async del(id: number): Promise<void> {
    const result = await 
    ResponseHandler.send(result)
  }
  async getInfo(id: number): Promise<void> {
    const result = await 
    ResponseHandler.send(result)
  }
  async getList?(data: any): Promise<void> {
    const result = await 
    ResponseHandler.send(result)
  }

}

export default XXXXXX