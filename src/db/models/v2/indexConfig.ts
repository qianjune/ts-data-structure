/**
 * @description IndexConfigDb 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class IndexConfigDb extends Model {
  // custom property here
}

IndexConfigDb.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    shopId: {
      type: TYPES.INTEGER,
      comment: "店铺id",
    },
    name: {
      type: TYPES.STRING,
      comment: "首页配置的名字",
      allowNull: false,
    },
    data: {
      type: TYPES.TEXT,
      comment: "配置数据",
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "IndexConfigDb",
  }
);

IndexConfigDb.sync({
  alter: true,
});

export default IndexConfigDb;
