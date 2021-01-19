/**
 * @description FavoritesManager orm
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

import sequelize from "@root/core/db";
import { FavoritesDb } from "@src/db/models";
import { FavoritesItemType } from "@src/db/models/v2/user/favorites";
interface FavoritesItem {
  type: FavoritesItemType;
  likeId: number;
  uid: number;
  id?: number;
}
const placeholder = "收藏";
const responseMsg = ResponseMsg(placeholder);
class FavoritesManager implements CommonManager {
  async _getInfo(id: number, config?: { msg?: string }): Promise<any> {
    const item = await FavoritesDb.findOne({
      where: { id },
    });
    if (!item) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    return item;
  }
  async create(data: FavoritesItem): Promise<ManagerResponse> {
    const { type, likeId, uid } = data;
    const item = await FavoritesDb.findOne({
      where: {
        type,
        likeId,
        uid,
      },
    });
    let result = null;
    console.log(item, "....");
    if (item) {
      if (item.getDataValue("disabled") === 1) {
        item.setDataValue("disabled", 0);
        console.log(item);
        result = await item.save();
      } else {
        result = item;
      }
    } else {
      result = await FavoritesDb.create(data);
    }

    if (result) {
      return new ManagerResponseSuccess({
        msg: responseMsg.CREATE_SUCCESS,
        data: result,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.CREATE_FAIL });
    }
  }
  edit(data: any): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async del(id: number): Promise<ManagerResponse> {
    const item = await this._getInfo(id);
    console.log("-------");

    const d = item.toJSON();
    console.log(d);
    const result = await FavoritesDb.update(
      { ...d, disabled: 1 },
      {
        where: {
          id,
        },
      }
    );
    if (result[0] > 0) {
      return new ManagerResponseSuccess({
        data: null,
        msg: responseMsg.EDIT_SUCCESS,
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.EDIT_FAIL });
    }
  }
  getInfo(id: number): Promise<ManagerResponse> {
    throw new Error("Method not implemented.");
  }
  async getList?(
    data: ListFilterInterface & {
      userId: number;
      type: FavoritesItemType;
    }
  ): Promise<ManagerResponse> {
    const { pageNo, pageSize, uid, type } = data;
    const where = global.util.lodash.omitNil({
      uid,
      type,
    });
    const list = await FavoritesDb.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
      where: { ...where, disabled: 0 },
    });
    const { rows, count } = list;
    return new ManagerResponseSuccess({
      data: new ListDataModel({ data: rows, total: count, pageNo, pageSize }),
      msg: responseMsg.FETCH_LIST_SUCCESS,
    });
  }
}

export default FavoritesManager;
