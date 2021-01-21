/**
 * @description LevelGroup 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { mysqlArrayStringHandler, mysqlJsonHandler } from "@src/lib/common";

class LevelGroup extends Model {
  // custom property here
}

LevelGroup.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    name: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "等级组名字",
    },
    levelGroup: {
      type: TYPES.TEXT,
      comment: "等级数组",
      ...mysqlJsonHandler("levelGroup"),
    },
  },
  {
    sequelize,
    tableName: "LevelGroup",
  }
);

LevelGroup.sync({
  alter: true,
});

export default LevelGroup;
