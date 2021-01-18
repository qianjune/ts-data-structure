/**
 * @description 角色 模型
 */

import { INTEGER, STRING, Model } from "sequelize";
import sequelize from "@root/core/db";

class Role extends Model {
  // custom property here
}

Role.init(
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: "role",
    indexes: [
      {
        unique: true,
        fields: ["name", "key"],
      },
    ],
  }
);

export default Role;
