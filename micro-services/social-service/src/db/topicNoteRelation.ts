/**
 * @description 笔记和话题的关系 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { NoteDB, TopicDB } from ".";

class TopicNoteRelation extends Model {
  // custom property here
}

TopicNoteRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    noteId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "笔记id",
      references: {
        model: NoteDB,
        key: "id",
      },
    },
    topicId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "话题id",
      references: {
        model: TopicDB,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "topicNoteRelation",
  }
);

TopicNoteRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default TopicNoteRelation;
