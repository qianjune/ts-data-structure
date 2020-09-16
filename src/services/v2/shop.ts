/**
 * @description 店铺 Service
 */
import { CommonService } from '@src/services/interface/common'
import ShopManager from '@src/manager/v2/shop'
import { ResponseHandler } from '@src/utils/responseHandler'
import { ListParamsInterface } from '@src/manager/interface'
const shopManger = new ShopManager()
class ShopService implements CommonService {
  edit(data: any): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async create(data: any): Promise<void> {
    const result = await shopManger.create(data)
    ResponseHandler.send(result)
  }
 
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.")
  }
  async getInfo(id: number): Promise<void> {
    ResponseHandler.send(await shopManger.getInfo(id))
  }
  async getList(data: ListParamsInterface): Promise<void> {
    const result = await shopManger.getList(data)
    ResponseHandler.send(result)
  }
}

export default ShopService