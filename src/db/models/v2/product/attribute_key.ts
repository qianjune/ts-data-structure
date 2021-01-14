/**
 * @description sku属性名
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class AttributeKey extends Model {
  // custom property here
}

AttributeKey.init(
  {
    id: {
      type: TYPES.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "属性key的id",
    },
    name: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "属性key的名字",
    },
  },
  {
    sequelize,
    tableName: "attributeKey",
  }
);

export default AttributeKey;
