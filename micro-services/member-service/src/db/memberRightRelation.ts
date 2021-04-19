/**
 * @description 会员-消耗型权益-记录 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER } = TYPES;
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
@Table({
  sequelize,
  tableName: "memberRightRelation",
})
class MemberRightRelation extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    comment: "会员id",
  })
  memberId: number;
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
    type: TYPES.INTEGER,
    comment: "权益可用数量",
  })
  amount: number;
  @Column({
    type: STRING,
    comment: "权益的描述",
  })
  desc: string;
}

init(MemberRightRelation);

MemberRightRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default MemberRightRelation;
