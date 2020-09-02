/**
 * @description Address service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import AddressManager from "@src/manager/v2/address";
const addressManager = new AddressManager()


class AddressService implements CommonService {
  async create(data: any): Promise<void> {
    const result = await addressManager.create(data)
    ResponseHandler.send(result)
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<void> {
    ResponseHandler.send(await addressManager.del(id))
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: any): Promise<void> {
    const result = await addressManager.getList(data)
    ResponseHandler.send(result)
  }
  getCommonAddressList(data: any): void {
    const result = addressManager.getCommonAddressList(data)
    ResponseHandler.send(result)
  }
}

export default AddressService