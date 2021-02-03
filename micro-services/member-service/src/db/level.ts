/**
 * @description 等级表
 * 其实就是等级表的模版,用于快速建立等级组，等级组里的数据会和等级模版脱离
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER, DECIMAL } = TYPES;

class LevelDb extends Model {
  // custom property here
}

LevelDb.init(
  {
    id: {
      type: TYPES.INTEGER,
      comment: "主键id",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING,
      comment: "等级名",
      allowNull: false,
    },

    weight: {
      type: INTEGER,
      comment: "权重",
      defaultValue: 0,
    },
    levelUpAmount: {
      type: INTEGER,
      comment: "该等级需要的数值",
      defaultValue: 999999999,
    },
    img: {
      type: STRING,
      comment: "等级图片",
      defaultValue:
        "http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg",
    },
  },
  {
    sequelize,
    tableName: "level",
  }
);

LevelDb.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelDb;
