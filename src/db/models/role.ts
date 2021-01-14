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
      unique: true,
    },
    key: {
      type: STRING,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: "role",
  }
);

export default Role;
