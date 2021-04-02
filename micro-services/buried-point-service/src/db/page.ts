/**
 * @description 埋点页面配置 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class Page extends Model {
  // custom property here
}

Page.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    name: {
      type: TYPES.STRING,
      comment: "页面名称",
    },
    path: {
      type: TYPES.STRING,
      comment: "页面地址",
    },
    image: {
      type: TYPES.STRING,
      comment: "页面截图",
    },
  },
  {
    sequelize,
    tableName: "page",
  }
);

Page.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Page;
