import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { ManagerResponse, ResponseMsg } from "../response";
import ProductBrand from "@src/db/models/v2/product/brand";
import sequelize from "@root/core/db";

export interface BrandItemInterface {
  name: string
  desc: string
  logo: string
}
const placeholder = '品牌'
const responseMsg = ResponseMsg(placeholder)
class BrandManager implements CommonManager {
  async create(data: BrandItemInterface): Promise<ManagerResponse> {
    const brand = await ProductBrand.findOne({
      where: {
        name: data.name
      }
    })
    if (brand) {
      return new ManagerResponse({ success: false, msg: responseMsg.FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await ProductBrand.create(data, { transaction: t })
      if (result) {
        return new ManagerResponse({ success: true, msg: responseMsg.SUCCESS, data: result })
      } else {
        return new ManagerResponse({ success: true, msg: responseMsg.FAIL, data: result })
      }
    })
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
  getList?(data: ListFilterInterface): void {
    throw new Error("Method not implemented.");
  }

}

export default BrandManager