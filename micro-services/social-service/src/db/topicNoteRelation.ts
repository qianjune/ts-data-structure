/**
 * @description 笔记和话题的关系 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
import { NoteDB, TopicDB } from ".";
@Table({
  sequelize,
  tableName: "topicNoteRelation",
})
class TopicNoteRelation extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "笔记id",
    references: {
      model: NoteDB,
      key: "id",
    },
  })
  noteId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "话题id",
    references: {
      model: TopicDB,
      key: "id",
    },
  })
  topicId: number;
}

init(TopicNoteRelation);

TopicNoteRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default TopicNoteRelation;
