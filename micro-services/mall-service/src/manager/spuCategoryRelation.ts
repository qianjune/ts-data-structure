/**
 * @description SpuCategoryRelation orm
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
import { SpuCategoryRelation as SpuCategoryRelationDb } from "@src/db/models";
import { RequestConfigInterface } from "@src/manager/interface/interface";

const placeholder = "SpuCategoryRelation";
const responseMsg = ResponseMsg(placeholder);
class SpuCategoryRelation implements CommonManager {
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await SpuCategoryRelationDb.findOne({
      where: { id },
    });
    if (!item) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    return item;
  }
  async create(data: any): Promise<ManagerResponse<any>> {
    const { spuId, categoryId } = data;
    const item = await SpuCategoryRelationDb.findOne({
      where: { spuId, categoryId },
    });
    if (item) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_EXISTED,
      });
    }
    const result = await SpuCategoryRelationDb.create(data);
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const item = await this._getInfo(id);
    const updateData = global.util.lodash.omitNil({});
    const result = await SpuCategoryRelationDb.update(updateData, {
      where: {
        id,
      },
    });
    if (result[0] > 0) {
      return new ManagerResponseSuccess({
        data: null,
        msg: responseMsg.EDIT_SUCCESS,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL });
    }
  }
  async del(id: number): Promise<ManagerResponse<any>> {
    const item = await await this._getInfo(id);
    const result = await SpuCategoryRelationDb.destroy({
      where: {
        id,
      },
    });
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.DELETE_SUCCESS,
        data: true,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.DELETE_FAIL });
    }
  }
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const item = await this._getInfo(id);
    return new ManagerResponseSuccess({
      msg: responseMsg.GET_DETAIL_SUCCESS,
      data: item,
    });
  }
  async getList?(
    data: ListFilterInterface,
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1 } = data;
    const listParams = buildCommonListParams({ pageNo, pageSize }, config);
    const result = await SpuCategoryRelationDb.findAndCountAll({
      ...listParams,
    });
    const { count, rows } = result;
    const SpuCategoryRelationList = rows.map((row: any) => {
      const data: any = row.toJSON();
      return data;
    });

    return new ManagerResponseSuccess({
      data: new ListDataModel({
        data: SpuCategoryRelationList,
        total: count,
        pageNo,
        pageSize,
      }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default SpuCategoryRelation;
