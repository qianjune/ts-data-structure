/**
 * @description IndexConfigManager orm
 */

import {
  CommonManager,
  ListFilterInterface,
  buildCommonListParams,
} from "@src/manager/interface/commonManager";
import {
  ManagerResponse,
  ManagerResponseSuccess,
  ListDataModel,
  ResponseMsg,
  ManagerResponseFailure,
} from "@src/manager/response";

import { IndexConfigDb } from "@src/db/models";

const placeholder = "IndexConfigManager";
const responseMsg = ResponseMsg(placeholder);
class IndexConfigManager implements CommonManager {
  async create(data: any): Promise<ManagerResponse> {
    console.log("---data---");
    console.log(data);

    const result = await IndexConfigDb.create({
      ...data,
      data: JSON.stringify(data.data),
    });
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: { a: 1 },
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }
  edit(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  del(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getInfo(id: number): Promise<ManagerResponse> {
    let result: any = await IndexConfigDb.findOne({
      where: {
        id,
      },
    });

    if (result) {
      result = result.toJSON();
      return new ManagerResponseSuccess({
        msg: responseMsg.GET_DETAIL_SUCCESS,
        data: { ...result, data: JSON.parse(result.data) },
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.GET_DETAIL_FAIL });
    }
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse> {
    const { pageSize = 10, pageNo = 1 } = data;
    const listParams = buildCommonListParams({ pageNo, pageSize });
    const result = await IndexConfigDb.findAndCountAll({
      ...listParams,
    });
    const { count, rows } = result;
    const brandList = rows.map((row) => {
      let data: any = row.toJSON();
      data = { ...data, data: JSON.parse(data.data) };
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

export default IndexConfigManager;
