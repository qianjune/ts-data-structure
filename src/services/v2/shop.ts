/**
 * @description 店铺 Service
 */
import { CommonService } from '@src/services/interface/common'
import ShopManager from '@src/manager/v2/shop'
import { ResponseHandler } from '@src/utils/responseHandler'
const shopManger = new ShopManager()
class ShopService implements CommonService {
  async create(data: object): Promise<void> {
    const result = await shopManger.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.")
  }
  del(id: number): void {
    throw new Error("Method not implemented.")
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.")
  }

}

export default ShopService