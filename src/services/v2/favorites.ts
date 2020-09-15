/**
 * @description FavoritesService service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import FavoritesManager from "@src/manager/v2/favorites";
const favoritesManager = new FavoritesManager()
class FavoritesService implements CommonService {
  async create(data: any): Promise<void> {
    ResponseHandler.send(await favoritesManager.create(data))
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
    ResponseHandler.send(await favoritesManager.getList(data))
  }

}

export default FavoritesService