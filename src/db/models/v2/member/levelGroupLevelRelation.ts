/**
 * @description LevelGroupLevelRelation 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class LevelGroupLevelRelation extends Model {
  // custom property here
}

LevelGroupLevelRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    levelGroupId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "等级组id",
    },
    levelId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "等级id",
    },
  },
  {
    sequelize,
    tableName: "levelGroupLevelRelation",
  }
);

LevelGroupLevelRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelGroupLevelRelation;
