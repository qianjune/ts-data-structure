/**
 * @description 单个-权益-表
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;
export enum RightPattern {
  COUPON = "COUPON",
  DISCOUNT = "DISCOUNT",
}
export enum RightPatternType {
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
@Table({
  sequelize,
  tableName: "rights",
  // indexes: [
  //   {
  //     unique: true,
  //     fields: ["name"],
  //   },
  // ],
})
class Right extends Model {
  @Column({
    type: INTEGER,
    comment: "主键id",
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: STRING,
    comment: "名字",
    allowNull: false,
  })
  name: string;
  @Column({
    type: INTEGER,
    comment: "权益的数值",
  })
  num: number;
  @Column({
    type: STRING,
    comment: "图片",
    defaultValue:
      "http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg",
  })
  img: string;
  @Column({
    type: STRING,
    comment: "权益类型",
    allowNull: false,
  })
  pattern: string;
  @Column({
    type: STRING,
    comment: "权益属性",
    allowNull: false,
  })
  type: string;
  @Column({
    type: INTEGER,
    comment: "过期时间",
  })
  expired: number;
  @Column({
    type: STRING,
    comment: "",
  }) // 状态这个需要考量一下
  status: string;
  @Column({
    type: INTEGER,
    comment: "初始数量",
    defaultValue: 0,
  })
  amount: number;
  @Column({
    type: STRING,
    comment: "权益的描述",
  })
  desc: string;
}

// 权益类型，权益说明

init(Right);

Right.sync({ alter: true }).catch(sequelizeErrHandler);

export default Right;
