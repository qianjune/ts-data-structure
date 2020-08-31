/**
 * @description Address service
 */
import { CommonService } from "@src/services/interface/common";
import { ResponseHandler } from "@src/utils/responseHandler";
import AddressManager, { FetchAddressType } from "@src/manager/v2/address";
const addressManager = new AddressManager()


class AddressService implements CommonService {
  create(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  edit<T>(data: T): void {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getList?(data: any): Promise<void> {
    throw new Error("Method not implemented.");
  }
  getCommonAddressList(data: any): void {
    const result = addressManager.getCommonAddressList(data)
    ResponseHandler.send(result)
  }
}

export default AddressService