/**
 * @description 用户 manager
 */

import { User } from "@src/db/models";
// import JwtHandler from "@src/utils/jwt_handler";
import EncryptBox from "@src/utils/encrypt_box";
import sequelize from "@root/core/db";
import moment from "moment";
import { CommonManagerInterface } from "./interface/interface";
import {
  ManagerResponseSuccess,
  ManagerResponseFailure,
  ManagerResponse,
  ResponseMsg,
  ListDataModel,
} from "./response";
import {
  CommonManager,
  ListFilterInterface,
  buildCommonListParams,
} from "./interface/commonManager";
import { MemberManager } from "./v2/member";
const memberManager = new MemberManager();
interface UserBody {
  mobile?: number | string;
  password?: string;
  email?: string;
}
interface UserPutBody {
  mobile?: number;
  password?: string;
  email?: string;
  id: string;
}
type UserServiceInterface = CommonManagerInterface<UserBody, UserPutBody>;

const placeholder = "用户";
const responseMsg = ResponseMsg(placeholder);
class UserManager implements CommonManager {
  async getValidateData(
    data: { [propKey: string]: any },
    mode?: string
  ): Promise<any> {
    console.log("--------user-------", data);
    const user = await User.findOne({
      where: data,
      attributes: {
        exclude: ["password"],
      },
    });
    console.log("--------user-------", user);
    if (mode === "self") {
      return user;
    }
    if (user) {
      return new ManagerResponseSuccess({ data: user, msg: "用户存在" });
    } else {
      return new ManagerResponseFailure({ msg: "用户不存在" });
    }
  }
  /**
   * 创建账户
   * 内含会员创建（未来优化目标，用mq去发送，不用包含在账户服务内）
   * @param data
   */
  async create(data: UserBody): Promise<any> {
    let user = await this.getValidateData({ mobile: data.mobile }, "self");
    if (user) {
      // 该手机已注册
      console.log("用户已存在");
      return user.toJSON();
    }
    return await sequelize.transaction(async (t: any) => {
      user = await User.create(data, { transaction: t });
      // 账户创建完成后，创建相应的会员 begin
      const member = await memberManager.create(
        {
          nickName: `用户${data.mobile}`,
          birthday: moment(Date.now()).format("YYYY-MM-DD"),
          userId: user.id,
        },
        { transaction: t }
      );
      // 账户创建完成后，创建相应的会员 end
      if (member.success && user) {
        console.log("成功创建");
        return user.toJSON();
      } else {
        return false;
      }
    });
  }
  async edit(data: UserPutBody): Promise<ManagerResponse<any>> {
    const user = await User.findOne({
      where: {
        id: data.id,
      },
    });
    if (!user) {
      return new ManagerResponseFailure({ msg: responseMsg.ITEM_NOT_FOUND });
    }
    // user.setDataValue('password', data.password)
    if (data.password) {
      data.password = EncryptBox.buildEncryptCode(data.password);
    }

    const result = await user.update({ ...data });
    if (result) {
      return new ManagerResponseSuccess({ msg: "更新成功", data: {} });
    } else {
      return new ManagerResponseFailure({ msg: "更新失败" });
    }
  }
  async del(id: number): Promise<ManagerResponse<any>> {
    const user = await this.getValidateData({ id }, "self");
    if (user) {
      const result = await User.update(
        { status: "destroy" },
        { where: { id } }
      );
      if (result[0] > 0) {
        // 修改成功
      } else {
        // 修改失败
      }
    } else {
      // 没有该用户
    }
    return new ManagerResponseFailure({ msg: "销毁账户失败" });
  }
  getInfo(id: number): Promise<ManagerResponse<any>> {
    throw new Error("Method not implemented.");
  }
  // 之后需要运营人员权限
  async getList?(data: ListFilterInterface): Promise<ManagerResponse<any>> {
    const { pageSize, pageNo } = data;
    const result = await User.findAndCountAll({
      ...buildCommonListParams({ pageNo, pageSize }),
      attributes: ["id", "mobile", "email", "status"],
    });
    const { count, rows } = result;
    const userList = rows.map((row) => {
      return row.toJSON();
    });
    return new ManagerResponseSuccess({
      msg: responseMsg.FETCH_LIST_SUCCESS,
      data: new ListDataModel({
        data: userList,
        total: count,
        pageNo,
        pageSize,
      }),
    });
  }
}

export { UserManager };
