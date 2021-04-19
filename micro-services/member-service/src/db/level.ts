/**
 * @description 等级表
 * 其实就是等级表的模版,用于快速建立等级组，等级组里的数据会和等级模版脱离
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;
@Table({
  sequelize,
  tableName: "level",
})
class LevelDb extends Model {
  @Column({
    type: TYPES.INTEGER,
    comment: "主键id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: STRING,
    comment: "等级名",
    allowNull: false,
  })
  name: string;

  @Column({
    type: INTEGER,
    comment: "权重",
    defaultValue: 0,
  })
  weight: number;
  @Column({
    type: INTEGER,
    comment: "该等级需要的数值",
    defaultValue: 999999999,
  })
  levelUpAmount: number;
  @Column({
    type: STRING,
    comment: "等级图片",
    defaultValue:
      "http://qiniu.miaolingfei.top/b636a330-fd4b-11ea-8e60-09114d7f7380.jpeg",
  })
  img: string;
}

init(LevelDb);

LevelDb.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelDb;
