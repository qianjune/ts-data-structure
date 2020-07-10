/**
 * @description 店铺 orm
 */
import { ShopModel } from '@src/db/models'
import { CommonManager } from "../interface/commonManager";
import { ManagerResponse } from '../response';

class ShopManager implements CommonManager {
  async create(data: object): Promise<ManagerResponse> {
    const result = await ShopModel.create(data)
    return new ManagerResponse({ success: true, msg: '创建店铺成功', data: result })
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): void {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): void {
    throw new Error("Method not implemented.");
  }

}

export default ShopManager