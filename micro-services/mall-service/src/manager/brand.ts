import {
  ManagerResponse,
  ResponseMsg,
  ManagerResponseSuccess,
  ListDataModel,
  ManagerResponseFailure,
} from "@src/manager/response";
import { ShopModel, ProductBrand } from "@src/db/models";
import {
  buildCommonListParams,
  CommonManager,
  ListFilterInterface,
} from "@src/manager/interface/commonManager";

export interface BrandItemInterface {
  name: string;
  desc: string;
  logo: string;
  shopId?: number;
}
const placeholder = "品牌";
const responseMsg = ResponseMsg(placeholder);
class BrandManager implements CommonManager {
  async create(data: BrandItemInterface): Promise<ManagerResponse<any>> {
    const brand = await ProductBrand.findOne({
      where: {
        name: data.name,
      },
    });
    if (brand) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_NAME_OCCUPIED,
      });
    }
    const result = await ProductBrand.create(data);
    console.log(result, ".....");
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_FAIL,
        data: result,
      });
    }
  }
  edit<T>(data: T): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  getInfo(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1 } = data;

    const listParams = buildCommonListParams({ pageNo, pageSize });
    const result = await ProductBrand.findAndCountAll({
      ...listParams,
      include: [
        {
          model: ShopModel,
          as: "shopDetail",
          attributes: ["name"],
        },
      ],
    });
    const { count, rows } = result;
    const brandList = rows.map((row) => {
      const data: any = row.toJSON();
      // data.shopName = data.shopModel.name
      // delete data.shopModel
      return data;
    });

    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: brandList,
        total: count,
        pageNo,
        pageSize,
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default BrandManager;
