/**
 * @description 话题 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
@Table({
  sequelize,
  tableName: "topic",
})
class Topic extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    comment: "主题名字",
    allowNull: false,
  })
  name: string;
  @Column({
    type: TYPES.INTEGER,
    comment: "热度",
  })
  heat: number;
}

init(Topic);

Topic.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default Topic;
