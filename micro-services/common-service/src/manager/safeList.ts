/**
 * @description 安全名单 orm
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
  ListDataInterface,
} from "@src/manager/response";
import sequelize from "@root/core/db";
import { RequestConfigInterface } from "@src/manager/interface/interface";
import { ResponseHandler } from "@src/utils/responseHandler";
import SafeListDb from "@micro-services/common-service/src/db/safeList";
const placeholder = "SafeList";
const responseMsg = ResponseMsg(placeholder);
class SafeListManager implements CommonManager {
  /**
   * 获取详情（私有）
   * @param id
   * @param config
   */
  async _getInfo(
    where: { id: number },
    config?: { msg?: string }
  ): Promise<any> {
    const item = await SafeListDb.findOne({
      where,
    });
    if (!item) {
      ResponseHandler.send(
        new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
      );
    }
    return item.toJSON();
  }

  async match(data: {
    id: number;
    content: string;
  }): Promise<ManagerResponse<boolean>> {
    const { id, content } = data;
    const item: { keywordsList: string[] } = await this._getInfo({
      id,
    });
    item["keywordsList"];
    let result = false;
    for (let i = 0; i < item["keywordsList"].length; i++) {
      if (content.indexOf(item["keywordsList"][i]) > -1) {
        result = true;
        break;
      }
    }
    if (result) {
      return new ManagerResponseSuccess({
        data: true,
        msg: "匹配结果为：匹配到",
      });
    } else {
      return new ManagerResponseFailure({
        data: true,
        msg: "匹配结果为：未匹配到",
      });
    }
  }

  /**
   * 创建
   * @param data
   */
  async create(data: any): Promise<ManagerResponse<any>> {
    const { name, data: keywordsList, ...otherData } = data;
    const item = await SafeListDb.findOne({
      where: { name },
    });
    if (item) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_EXISTED,
      });
    }
    const result = await SafeListDb.create({
      name,
      keywordsList,
      ...otherData,
    });
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
  async edit(
    data: any,
    config: {
      type: "add" | "del";
    }
  ): Promise<ManagerResponse<any>> {
    const { id, data: keywordsList } = data;
    const item = await this._getInfo({ id });
    const updateData = global.util.lodash.omitNil(data);
    if (config?.type) {
      switch (config.type) {
        case "add":
          updateData["keywordsList"] = global.util.lodash.uniq([
            ...item["keywordsList"],
            ...keywordsList,
          ]);
          break;
        case "del":
          updateData["keywordsList"] = global.util.lodash.difference(
            [...item["keywordsList"]],
            keywordsList
          );
          break;
        default:
          break;
      }
    }
    const result = await SafeListDb.update(updateData, {
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
    const item = await await this._getInfo({ id });
    return await sequelize.transaction(async (t: any) => {
      const result = await SafeListDb.destroy({
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
    const item = await this._getInfo({ id });
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
  ): Promise<ManagerResponse<ListDataInterface>> {
    const { pageSize = 10, pageNo = 1 } = data;
    return await sequelize.transaction(async (t: any) => {
      const listParams = buildCommonListParams({ pageNo, pageSize }, config);
      const result = await SafeListDb.findAndCountAll({
        ...listParams,
      });
      const { count, rows } = result;
      const SafeListList = rows.map((row: any) => {
        const data: any = row.toJSON();
        return data;
      });

      return new ManagerResponseSuccess({
        data: new ListDataModel({
          data: SafeListList,
          total: count,
          pageNo,
          pageSize,
        }),
        msg: responseMsg.FETCH_LIST_SUCCESS,
      });
    });
  }
}

export default SafeListManager;
