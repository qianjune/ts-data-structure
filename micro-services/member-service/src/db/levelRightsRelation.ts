/**
 * @description LevelRightsRelation 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

import { LevelDb, RightDb } from ".";
@Table({
  sequelize,
  tableName: "levelRightsRelation",
})
class LevelRightsRelation extends Model {
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
    references: {
      model: LevelDb,
      key: "id",
    },
  })
  levelId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    references: {
      model: RightDb,
      key: "id",
    },
  })
  rightId: number;
}

init(LevelRightsRelation);

LevelRightsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelRightsRelation;
