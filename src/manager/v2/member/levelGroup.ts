/**
 * @description LevelGroup orm
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
import { LevelGroupDb } from "@src/db/models";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";

const placeholder = "LevelGroup";
const responseMsg = ResponseMsg(placeholder);
class LevelGroup implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await LevelGroupDb.findOne({
      where: { id },
    });
    if (!item) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    return item;
  }

  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    const { name } = data;
    const item = await LevelGroupDb.findOne({
      where: { name },
    });
    if (item) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_EXISTED,
      });
    }
    let result: any = await LevelGroupDb.create(data);
    if (result) {
      result = result.toJSON();
      result.levelGroup = JSON.parse(result.levelGroup);
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }

  /**
   * 编辑
   * @param data
   */
  async edit(data: any): Promise<ManagerResponse<any>> {
    const { id } = data;
    const item = await this._getInfo(id);
    const updateData = global.util.lodash.omitNil({});
    const result = await LevelGroupDb.update(updateData, {
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

  /**
   * 删除
   * @param id
   */
  async del(id: number): Promise<ManagerResponse<any>> {
    const item = await await this._getInfo(id);
    return await sequelize.transaction(async (t: any) => {
      const result = await LevelGroupDb.destroy({
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
    });
  }

  /**
   * 获取详情
   * @param id
   */
  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const item = await this._getInfo(id);
    return new ManagerResponseSuccess({
      msg: responseMsg.GET_DETAIL_SUCCESS,
      data: item,
    });
  }

  /**
   * 获取列表
   * @param data
   * @param config
   */
  async getList?(
    data: ListFilterInterface,
    config?: RequestConfigInterface
  ): Promise<ManagerResponse<any>> {
    const { pageSize = 10, pageNo = 1 } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      const result = await LevelGroupDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const LevelGroupList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: LevelGroupList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default LevelGroup;
