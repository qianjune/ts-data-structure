/**
 * @description 会员-消耗型权益-记录 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER } = TYPES;
class MemberRightRelation extends Model {
  // custom property here
}

MemberRightRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    memberId: {
      type: TYPES.INTEGER,
      comment: "会员id",
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
    type: {
      type: STRING,
      comment: "权益属性",
      allowNull: false,
    },
    expired: {
      type: INTEGER,
      comment: "过期时间",
    },
    amount: {
      type: TYPES.INTEGER,
      comment: "权益可用数量",
    },
    desc: {
      type: STRING,
      comment: "权益的描述",
    },
  },
  {
    sequelize,
    tableName: "memberRightRelation",
  }
);

MemberRightRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default MemberRightRelation;
