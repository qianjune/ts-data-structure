/**
 * @description 权限 表
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
const { INTEGER, STRING } = TYPES;

class Authority extends Model {
  // custom property here
}

Authority.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: STRING,
    },
    key: {
      type: STRING,
    },
  },
  {
    sequelize,
    tableName: "authority",
    indexes: [
      {
        unique: true,
        fields: ["name", "key"],
      },
    ],
  }
);

export default Authority;
