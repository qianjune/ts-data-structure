// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import bcrypt from "bcryptjs";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
import EncryptBox from "@src/utils/encrypt_box";

@Table({
  sequelize,
  tableName: "user",
  indexes: [
    {
      unique: true,
      fields: ["email", "mobile", "openid"],
    },
  ],
})
class User extends Model {
  @Column({
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "用户id",
  })
  id: number;
  @Column({
    type: TYPES.BIGINT(11 as any),
    comment: "用户手机号",
  })
  mobile: number;
  @Column({
    type: TYPES.STRING,
    set(val: string) {
      const psw = EncryptBox.buildEncryptCode(val);
      this.setDataValue("password", psw);
    },
    comment: "用户密码",
  })
  password: string;
  @Column({
    type: TYPES.STRING,
    comment: "用户邮箱",
  })
  email: string;
  @Column({
    type: TYPES.STRING,
    comment: "用户状态",
    defaultValue: "active",
  })
  status: string;
  @Column({
    type: TYPES.STRING,
    comment: "微信openid",
  })
  openid: string;
}

init(User);

User.sync({
  alter: true,
}).catch(sequelizeErrHandler);
export default User;
