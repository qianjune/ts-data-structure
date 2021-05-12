/**
 * @description 钱包服务 数据库模型
 */
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import bcrypt from "bcryptjs";

@Table({
  sequelize,
  tableName: "wallet",
})
class Wallet extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    set(val: string) {
      const salt = bcrypt.genSaltSync(10);
      const psw = bcrypt.hashSync(val, salt);
      this.setDataValue("password", psw);
    },
    defaultValue: "NO_SET_PASSWORD",
    allowNull: false,
    comment: "支付密码",
  })
  password: number;
  @Column({
    type: TYPES.INTEGER,
    defaultValue: 0,
    comment: "金额",
  })
  amount: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "所属用户id",
  })
  userId: number;
}

init(Wallet);

Wallet.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Wallet;
