import { CommonManager, ListFilterInterface } from "../interface/commonManager";
import { ManagerResponse, ResponseMsg, ManagerResponseSuccess, ListDataModel } from "../response";
import sequelize from "@root/core/db";
import { ShopModel, ProductBrand } from "@src/db/models";

export interface BrandItemInterface {
  name: string
  desc: string
  logo: string
  shopId?: number
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
      return new ManagerResponse({ success: false, msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED })
    }
    return await sequelize.transaction(async (t: any) => {
      const result = await ProductBrand.create(data, { transaction: t })
      console.log(result, '.....')
      if (result) {
        return new ManagerResponse({ success: true, msg: responseMsg.CREATE_SUCCESS, data: result })
      } else {
        return new ManagerResponse({ success: true, msg: responseMsg.CREATE_FAIL, data: result })
      }
    })
  }
  edit<T>(data: T): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1 } = data
    return await sequelize.transaction(async (t: any) => {
      const result = await ProductBrand.findAndCountAll({
        limit: pageSize,
        offset: pageSize * (pageNo - 1),
        order: [
          ['id', 'desc']
        ],
        include: [
          {
            model: ShopModel,
            as: 'shopDetail',
            attributes: ['name']
          }
        ]
      })
      const { count, rows } = result
      const brandList = rows.map(row => {
        const data: any = row.toJSON()
        // data.shopName = data.shopModel.name
        // delete data.shopModel
        return data
      })

      return new ManagerResponseSuccess({
        data: new ListDataModel({ data: brandList, total: count, pageNo, pageSize }),
        msg: responseMsg.FETCH_LIST_SUCCESS
      })
    })

  }
}

export default BrandManager