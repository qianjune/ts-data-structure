/**
 * @description MemberPointsRelation 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Member, PointsDb } from "@src/db/models";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "memberPointsRelation",
})
class MemberPointsRelation extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "会员id",
    references: {
      model: Member,
      key: "id",
    },
  })
  memberId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "积分id",
    references: {
      model: PointsDb,
      key: "id",
    },
  })
  pointId: number;
  @Column({
    comment: "当前积分总数",
    type: TYPES.INTEGER,
    allowNull: false,
  })
  currentSum: number;
}

init(MemberPointsRelation);

MemberPointsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default MemberPointsRelation;
