import Sequelize from "sequelize";
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;
@Table({
  sequelize,
  tableName: "member",
})
class Member extends Model {
  @Column({
    autoIncrement: true,
    type: TYPES.INTEGER,
    primaryKey: true,
    comment: "会员id",
  })
  id: number;
  @Column({
    allowNull: false,
    type: INTEGER,
    comment: "用户id",
  })
  userId: number;
  @Column({
    type: STRING,
    comment: "昵称",
    allowNull: false,
  })
  nickName: string;
  @Column({
    type: DECIMAL,
    allowNull: false,
    comment: "性别(1.男性 2.女性 3.保密)",
    defaultValue: 3,
  })
  sex: number;
  @Column({
    type: STRING,
    allowNull: false,
    comment: "会员卡号",
  })
  memberCardCode: string;
  @Column({
    type: INTEGER,
    comment: "成长值",
    allowNull: false,
    defaultValue: 0,
  })
  growthValue: number;
  @Column({
    comment: "当前积分",
    defaultValue: 0,
    type: INTEGER,
  })
  points: number;

  @Column({
    type: STRING,
    comment: "姓名",
  })
  realName: string;
  @Column({
    type: TYPES.DATE,
    comment: "生日",
    defaultValue: Sequelize.NOW,
  })
  birthday: string;
  @Column({
    type: STRING,
    comment: "常居地",
  })
  residence: string;
  @Column({
    type: TYPES.INTEGER,
    comment: "生份证",
  })
  idCard: number;
  @Column({
    type: TYPES.STRING,
    comment: "头像",
  })
  avatarUrl: string;
}

init(Member);
Member.sync({
  alter: true,
}).catch(sequelizeErrHandler);
export default Member;
