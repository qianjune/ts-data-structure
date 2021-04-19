/**
 * @description 积分 变化 表
 */

// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;

export enum PointsType {
  INCREASE = "INCREASE",
  REDUCE = "REDUCE",
}

export enum PointsPattern {
  SIGN_IN = "SIGN_IN", // 签到
  BUY_GOOD = "BUY_GOOD", // 购物
  REGISTERED = "REGISTERED", // 注册
  EVALUATE = "EVALUATE", // 评价
  MOCK = "MOCK", // 测试使用
}

@Table({
  sequelize,
  tableName: "points",
})
class Points extends Model {
  @Column({
    type: INTEGER,
    comment: "主键id",
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: INTEGER,
    comment: "数值",
    allowNull: false,
  })
  num: number;
  @Column({
    type: STRING,
    comment: "变化方式（increase 增加，reduce 减少）",
    allowNull: false,
  })
  type: string;
  @Column({
    type: STRING,
    comment: "变化种类",
    allowNull: false,
  })
  pattern: string;
  @Column({
    type: INTEGER,
    comment: "过期时长",
  })
  expired: number;
}

init(Points);
Points.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Points;
