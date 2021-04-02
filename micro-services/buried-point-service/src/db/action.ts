/**
 * @description 用户行为 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class Action extends Model {
  // custom property here
}

Action.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
  },
  {
    sequelize,
    tableName: "action",
  }
);

Action.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Action;
