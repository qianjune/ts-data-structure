/**
 * @description IndexThemeService service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import IndexThemeManager from "@src/manager/v2/index/indexTheme";
const indexThemeManager = new IndexThemeManager()
class IndexThemeService implements CommonService {
  async create(data: any): Promise<void> {
    ResponseHandler.send(await indexThemeManager.create(data))
  }
  async edit<T>(data: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    ResponseHandler.send(await indexThemeManager.getList(data))
  }

}

export default IndexThemeService