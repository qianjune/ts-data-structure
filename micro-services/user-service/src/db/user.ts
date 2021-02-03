import { Model } from "sequelize";
import sequelize from "@root/core/db";
import bcrypt from "bcryptjs";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class User extends Model {
  // custom property here
}

User.init(
  {
    id: {
      type: TYPES.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "用户id",
    },
    mobile: {
      type: TYPES.BIGINT(11 as any),
      comment: "用户手机号",
    },
    password: {
      type: TYPES.STRING,
      set(val: string) {
        const salt = bcrypt.genSaltSync(10);
        const psw = bcrypt.hashSync(val, salt);
        this.setDataValue("password", psw);
      },
      comment: "用户密码",
    },
    email: {
      type: TYPES.STRING,
      comment: "用户邮箱",
    },
    status: {
      type: TYPES.STRING,
      comment: "用户状态",
      defaultValue: "active",
    },
    // openid: {
    //   type: Sequelize.STRING(64),
    //   unique: true
    // }
  },
  {
    sequelize,
    tableName: "user",
    indexes: [
      {
        unique: true,
        fields: ["email", "mobile"],
      },
    ],
  }
);

User.sync({
  alter: true,
}).catch(sequelizeErrHandler);
export default User;
