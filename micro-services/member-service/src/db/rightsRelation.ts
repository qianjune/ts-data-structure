// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;

@Table({
  sequelize,
  tableName: "rightRelation",
})
class RightsRelation extends Model {
  @Column({
    type: INTEGER,
    comment: "主键id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: INTEGER,
    comment: "权益包id",
    allowNull: false,
  })
  packageId: number;
  @Column({
    type: INTEGER,
    comment: "权益id",
    allowNull: false,
  })
  rightId: number;
  @Column({
    type: INTEGER,
    comment: "权益包中某个权益的数量",
    defaultValue: 0,
  })
  amount: number;
  @Column({
    type: INTEGER,
    comment: "权重",
  })
  weight: number;
}

init(RightsRelation);
RightsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default RightsRelation;
