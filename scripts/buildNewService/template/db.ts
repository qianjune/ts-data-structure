/**
 * @description cname 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class XXXXXX extends Model {
  // custom property here
}

XXXXXX.init(
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
    tableName: "xXXXXX",
  }
);

XXXXXX.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default XXXXXX;
