/**
 * @description XXXXXX service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import XXXXXXManager from '@src/manager/v2/xXXXXX'
const xXXXXXManager = new XXXXXXManager()
class XXXXXXService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await xXXXXXManager.create(data)
    ResponseHandler.send(result)
  }
  async edit<T>(data: T): Promise<void> {
    const result = await xXXXXXManager.edit(data)
    ResponseHandler.send(result)
  }
  async del(id: number): Promise<void> {
    const result = await xXXXXXManager.del(id)
    ResponseHandler.send(result)
  }
  async getInfo(id: number): Promise<void> {
    const result = await xXXXXXManager.getInfo(id)
    ResponseHandler.send(result)
  }
  async getList?(data: any): Promise<void> {
    const result = await xXXXXXManager.getList(data)
    ResponseHandler.send(result)
  }

}

export default XXXXXXService