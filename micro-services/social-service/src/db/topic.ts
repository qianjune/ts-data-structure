/**
 * @description 话题 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class Topic extends Model {
  // custom property here
}

Topic.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    name: {
      type: TYPES.STRING,
      comment: "主题名字",
      allowNull: false,
    },
    heat: {
      type: TYPES.INTEGER,
      comment: "热度",
    },
  },
  {
    sequelize,
    tableName: "topic",
  }
);

Topic.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Topic;
