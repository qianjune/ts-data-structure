/**
 * @description IndexConfigService service
 */
import IndexConfigManager from "@src/manager/v2/indexConfig";
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
const indexConfigManager = new IndexConfigManager()
class IndexConfigService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await indexConfigManager.create(data)
    ResponseHandler.send(result)
  }
  async edit<T>(data: T): Promise<void> {
    const result = await indexConfigManager.edit(data)
    ResponseHandler.send(result)
  }
  async del(id: number): Promise<void> {
    const result = await indexConfigManager.del(id)
    ResponseHandler.send(result)
  }
  async getInfo(id: number): Promise<void> {
    const result = await indexConfigManager.getInfo(id)
    ResponseHandler.send(result)
  }
  async getList?(data: any): Promise<void> {
    const result = await indexConfigManager.getList(data)
    ResponseHandler.send(result)
  }

}

export default IndexConfigService