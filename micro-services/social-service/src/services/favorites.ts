/**
 * @description FavoritesService service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import FavoritesManager from "@micro-services/social-service/src/manager/favorites";
const favoritesManager = new FavoritesManager();
class FavoritesService implements CommonService {
  async create(data: any): Promise<void> {
    ResponseHandler.send(await favoritesManager.create(data));
  }
  async edit<T>(data: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<void> {
    ResponseHandler.send(await favoritesManager.del(id));
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    const result = await favoritesManager.getList(data);
    ResponseHandler.send(result);
  }
  async getShopListByUser(data: any): Promise<void> {
    const result = await favoritesManager.getShopListByUser(data);
    ResponseHandler.send(result);
  }
}

export default FavoritesService;