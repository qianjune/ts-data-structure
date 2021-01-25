/**
 * @description 积分 变化 表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
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

class Points extends Model {
  // custom property here
}

Points.init(
  {
    id: {
      type: INTEGER,
      comment: "主键id",
      autoIncrement: true,
      primaryKey: true,
    },
    num: {
      type: INTEGER,
      comment: "数值",
      allowNull: false,
    },
    type: {
      type: STRING,
      comment: "变化方式（increase 增加，reduce 减少）",
      allowNull: false,
    },
    pattern: {
      type: STRING,
      comment: "变化种类",
      allowNull: false,
    },
    expired: {
      type: INTEGER,
      comment: "过期时长",
    },
  },
  {
    sequelize,
    tableName: "points",
  }
);
Points.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Points;
