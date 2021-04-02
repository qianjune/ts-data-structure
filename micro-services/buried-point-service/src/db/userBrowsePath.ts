/**
 * @description 用户浏览路径 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class UserBrowsePath extends Model {
  // custom property here
}

UserBrowsePath.init(
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
    tableName: "userBrowsePath",
  }
);

UserBrowsePath.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default UserBrowsePath;
