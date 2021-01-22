import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
const { STRING, INTEGER, DECIMAL } = TYPES;

class RightsRelation extends Model {
  // custom property here
}

RightsRelation.init(
  {
    id: {
      type: INTEGER,
      comment: "主键id",
      primaryKey: true,
      autoIncrement: true,
    },
    packageId: {
      type: INTEGER,
      comment: "权益包id",
      allowNull: false,
    },
    rightId: {
      type: INTEGER,
      comment: "权益id",
      allowNull: false,
    },
    amount: {
      type: INTEGER,
      comment: "权益包中某个权益的数量",
      defaultValue: 0,
    },
    weight: {
      type: INTEGER,
      comment: "权重",
    },
  },
  {
    sequelize,
    tableName: "rightRelation",
  }
);
RightsRelation.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default RightsRelation;
