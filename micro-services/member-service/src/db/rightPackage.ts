/**
 * @description 权益包-表
 */

// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

const { STRING, INTEGER, DECIMAL } = TYPES;
@Table({
  sequelize,
  tableName: "rightPackage",
})
class RightPackage extends Model {
  @Column({
    type: STRING,
    comment: "权益包名字",
  })
  name: string;
  // levelId: {
  //   type: INTEGER,
  //   comment: "等级id",
  // },
}

init(RightPackage);

RightPackage.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default RightPackage;
