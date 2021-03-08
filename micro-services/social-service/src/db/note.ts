/**
 * @description 笔记 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class Note extends Model {
  // custom property here
}

Note.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    sightMaterials: {
      type: TYPES.TEXT,
      comment: "视觉物料",
    },
    title: {
      type: TYPES.STRING,
      comment: "标题",
    },
    content: {
      type: TYPES.TEXT,
      comment: "文字内容",
    },
  },
  {
    sequelize,
    tableName: "note",
  }
);

Note.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Note;
