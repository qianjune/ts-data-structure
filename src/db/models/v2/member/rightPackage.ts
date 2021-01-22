/**
 * @description 权益包-表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER, DECIMAL } = TYPES;

class RightPackage extends Model {
  // custom property here
}

RightPackage.init(
  {
    name: {
      type: STRING,
      comment: "权益包名字",
    },
    // levelId: {
    //   type: INTEGER,
    //   comment: "等级id",
    // },
  },
  {
    sequelize,
    tableName: "rightPackage",
  }
);

RightPackage.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default RightPackage;