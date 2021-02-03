/**
 * @description MemberPointsRelation 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Member, PointsDb } from "@src/db/models";

class MemberPointsRelation extends Model {
  // custom property here
}

MemberPointsRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    memberId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "会员id",
      references: {
        model: Member,
        key: "id",
      },
    },
    pointId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "积分id",
      references: {
        model: PointsDb,
        key: "id",
      },
    },
    currentSum: {
      comment: "当前积分总数",
      type: TYPES.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "memberPointsRelation",
  }
);

MemberPointsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default MemberPointsRelation;
