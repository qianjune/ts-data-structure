import {
  ListDataModel,
  ManagerResponse,
  ManagerResponseFailure,
  ManagerResponseSuccess,
  ResponseMsg,
} from "@src/manager/response";
import { Member } from "@src/db/models";
import { v1 } from "uuid";
import {
  buildCommonListParams,
  CommonManager,
  ListFilterInterface,
} from "@src/manager/interface/commonManager";
import { ResponseHandler } from "@src/utils/responseHandler";
import { omit } from "lodash";
/**
 * @description 会员 controller
 * @author June
 */

const placeholder = "会员";
const responseMsg = ResponseMsg(placeholder);
class MemberManager implements CommonManager {
  async create(
    data: any,
    config?: {
      transaction?: any;
      [keyName: string]: any;
    }
  ): Promise<ManagerResponse<any>> {
    const { userId } = data;
    const member = await Member.findOne({
      where: {
        userId,
      },
    });
    if (member) {
      return new ManagerResponseFailure({
        msg: responseMsg.CREATE_FAIL_BY_EXISTED,
      });
    }
    const memberCardCode = v1();
    data.memberCardCode = memberCardCode;
    const result = await Member.create(data, {
      transaction: config.transaction,
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
   * 更新会员信息
   * @param data
   */
  async edit(
    data: any,
    config?: {
      transaction: any;
    }
  ): Promise<ManagerResponse<any>> {
    const {
      growthValue,
      id,
      userId,
      nickName,
      sex,
      tel,
      birthday,
      points,
      avatarUrl,
      residence,
    } = data;
    console.log("开始更新成长值");
    const updateData = global.util.lodash.omitNil({
      nickName,
      sex,
      tel,
      birthday,
      growthValue,
      points,
      avatarUrl,
      residence,
    });
    const where = global.util.lodash.omitNil({
      userId,
      id,
    });
    const member = await Member.findOne({
      where,
    });
    if (!member) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    const updateConfig: any = {};
    if (config?.transaction) {
      updateConfig.transaction = config.transaction;
    }
    const result = await Member.update(updateData, {
      where: {
        id,
      },
      ...updateConfig,
    });
    console.log(result);
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
   * 会员删除（改变disable，做假删除）
   * @param id
   */
  del(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  async _getInfo(
    data: { id?: number; userId?: number },
    config?: { returnFail?: boolean }
  ): Promise<any> {
    const validData = global.util.lodash.omitNil(data);
    console.log(validData, "validData...");
    const info = await Member.findOne({
      where: validData,
    });
    console.log(info, "info...");
    if (info) {
      return info;
    } else {
      if (config.returnFail) {
        return false;
      } else {
        ResponseHandler.send(
          new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND })
        );
      }
    }
  }
  async getInfoOrCreateMember(data: {
    userId: number;
    sex?: number;
    nickName?: string;
    residence?: string;
    avatarUrl?: string;
  }): Promise<ManagerResponse<any>> {
    const { userId } = data;
    let info = await this._getInfo({ userId }, { returnFail: true });
    if (info) {
      const { sex, nickName, residence, avatarUrl } = data;
      if (nickName || residence || avatarUrl || sex) {
        const updateData = omit({ id: info.id, ...data });
        console.log(updateData, "updateData...");
        info = this.edit(updateData);
      }
      return new ManagerResponseSuccess({
        msg: responseMsg.GET_DETAIL_SUCCESS,
        data: info,
      });
    } else {
      return await this.create(data);
    }
  }

  async getInfo(id: number): Promise<ManagerResponse<any>> {
    const info = await this._getInfo({ id });
    if (info) {
      return new ManagerResponseSuccess({
        data: info,
        msg: responseMsg.GET_DETAIL_SUCCESS,
      });
    }
  }
  async getList?(data: ListFilterInterface): Promise<ManagerResponse<any>> {
    const { pageNo, pageSize } = data;
    const res = await Member.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
    });
    if (res) {
      const { count, rows } = res;
      return new ManagerResponseSuccess({
        msg: responseMsg.FETCH_LIST_SUCCESS,
        data: new ListDataModel({ pageNo, pageSize, data: rows, total: count }),
      });
    } else {
      return new ManagerResponseFailure({ msg: responseMsg.FETCH_LIST_FAIL });
    }
  }
  // static async addNewMember(data: any) {
  //   const result = await MemberService.create(data)
  //   if (!result) {
  //     return new ErrorModel(ErrorInfo.addMemberFailInfo)
  //   }
  //   return new SuccessModel(result)
  // }
}

export default MemberManager;
