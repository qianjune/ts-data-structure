/**
 * @description LevelGroup 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { mysqlArrayStringHandler, mysqlJsonHandler } from "@src/lib/common";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
@Table({
  sequelize,
  tableName: "LevelGroup",
})
class LevelGroup extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "等级组名字",
  })
  name: string;
  @Column({
    type: TYPES.TEXT,
    comment: "等级数组",
    ...mysqlJsonHandler("levelGroup"),
  })
  levelGroup: string;
}

init(LevelGroup);

LevelGroup.sync({
  alter: true,
});

export default LevelGroup;
