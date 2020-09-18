/**
 * @description IndexCarouselService service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import IndexCarouselManager from "@src/manager/v2/index/indexCarousel";

const indexCarouselManager = new IndexCarouselManager()
class IndexCarouselService implements CommonService {
  async create(data: any): Promise<void> {
    ResponseHandler.send(await indexCarouselManager.create(data))
  }
  edit<T>(data: T): Promise<void> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    ResponseHandler.send(await indexCarouselManager.getList(data))

  }

}

export default IndexCarouselService