/**
 * @description LevelRightsRelation 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { LevelDb, RightDb } from ".";

class LevelRightsRelation extends Model {
  // custom property here
}

LevelRightsRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    levelId: {
      type: TYPES.INTEGER,
      allowNull: false,
      references: {
        model: LevelDb,
        key: "id",
      },
    },
    rightId: {
      type: TYPES.INTEGER,
      allowNull: false,
      references: {
        model: RightDb,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "levelRightsRelation",
  }
);

LevelRightsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelRightsRelation;
