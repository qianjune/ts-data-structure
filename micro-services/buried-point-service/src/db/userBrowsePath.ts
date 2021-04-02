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
    // preBrowsePageId: {
    //   type: TYPES.INTEGER,
    //   comment: "前一个浏览页面id",
    // },
    pageId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "当前页面id",
    },
    nextBrowsePageId: {
      type: TYPES.INTEGER,
      comment: "下一个浏览页面id",
    },
    userId: {
      type: TYPES.INTEGER,
      comment: "用户id",
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
