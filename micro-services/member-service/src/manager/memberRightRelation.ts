/**
 * @description MemberRightRelation orm
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
import { MemberRightRelationDb } from "@src/db/models";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { omit } from "lodash";
import { ResponseHandler } from "@src/utils/responseHandler";

const placeholder = "MemberRightRelation";
const responseMsg = ResponseMsg(placeholder);

export interface createDataInterface {
  memberId: number;
  right: {
    id: number;
    name: string;
    num: any;
    pattern: string;
    img: string;
    expired: any;
    type: string;
    desc: string;
    amount: number;
  };
}

class MemberRightRelation implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await MemberRightRelationDb.findOne({
      where: { id },
    });
    if (!item) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
      );
    }
    return item;
  }

  /**
   * 创建
   * @param data
   */
  async create(
    data: createDataInterface,
    config?: {
      transaction: any;
    }
  ): Promise<ManagerResponse<any>> {
    const { memberId, right } = data;
    const handledRightData = omit(right, "id");
    // const item = await MemberRightRelationDb.findOne({
    //   where: {},
    // });
    // if (item) {
    //   return new ManagerResponseFailure({
    //     msg: responseMsg.CREATE_FAIL_BY_EXISTED,
    //   });
    // }
    const result = await MemberRightRelationDb.create(
      {
        memberId,
        ...handledRightData,
      },
      config ? { ...config } : {}
    );
    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }

  /**
   * 创建-数据源（数组）
   * @param data
   */
  async createForGroupData(
    data: createDataInterface[],
    config?: {
      transaction: any;
    }
  ): Promise<ManagerResponse<any>> {
    const createGroup = data.map((d) => this.create(d, config));
    const result = await Promise.all(createGroup);
    if (result) {
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
    const result = await MemberRightRelationDb.update(updateData, {
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
      const result = await MemberRightRelationDb.destroy({
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
      const result = await MemberRightRelationDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const MemberRightRelationList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: MemberRightRelationList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default MemberRightRelation;
