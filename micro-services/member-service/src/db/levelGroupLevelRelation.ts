/**
 * @description LevelGroupLevelRelation 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "levelGroupLevelRelation",
})
class LevelGroupLevelRelation extends Model {
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
    comment: "等级组id",
  })
  levelGroupId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "等级id",
  })
  levelId: number;
}

init(LevelGroupLevelRelation);

LevelGroupLevelRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default LevelGroupLevelRelation;
