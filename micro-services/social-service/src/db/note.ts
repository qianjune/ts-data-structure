/**
 * @description 笔记 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "safeList",
})
class Note extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.TEXT,
    comment: "视觉物料",
  })
  sightMaterials: string;
  @Column({
    type: TYPES.STRING,
    comment: "标题",
  })
  title: string;
  @Column({
    type: TYPES.STRING,
    comment: "发布时的地址",
  })
  address: string;
  @Column({
    type: TYPES.TEXT,
    allowNull: false,
    comment: "文字内容",
  })
  content: string;
}

init(Note);

Note.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Note;
