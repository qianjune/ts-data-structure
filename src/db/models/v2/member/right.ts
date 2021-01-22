/**
 * @description 单个-权益-表
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER, DECIMAL } = TYPES;
export enum RightPattern {
  COUPON = "COUPON",
  DISCOUNT = "DISCOUNT",
}
enum RightPatternType {
  CONSUMABLE = "CONSUMABLE", // 消耗型
  STATE_TYPE = "STATE_TYPE", // 状态行
}
export const RightPatternGroup = [
  {
    name: "优惠劵",
    value: RightPattern.COUPON,
    type: RightPatternType.CONSUMABLE,
  },
  {
    name: "折扣",
    value: RightPattern.DISCOUNT,
    type: RightPatternType.STATE_TYPE,
  },
];

class Right extends Model {
  // custom property here
}

// 权益类型，权益说明

Right.init(
  {
    id: {
      type: INTEGER,
      comment: "主键id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
      comment: "名字",
      allowNull: false,
    },
    num: {
      type: INTEGER,
      comment: "权益的数值",
    },
    img: {
      type: STRING,
      comment: "图片",
      defaultValue:
        "http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg",
    },
    pattern: {
      type: STRING,
      comment: "权益类型",
      allowNull: false,
    },
    expired: {
      type: INTEGER,
      comment: "过期时间",
    },
    status: {
      type: STRING,
      comment: "",
    }, // 状态这个需要考量一下
    desc: {
      type: STRING,
      comment: "权益的描述",
    },
  },
  {
    sequelize,
    tableName: "rights",
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
  }
);

Right.sync({ alter: true }).catch(sequelizeErrHandler);

export default Right;
