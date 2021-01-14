/**
 * @description 用户-角色 关系表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
const { INTEGER } = TYPES;

class UserRoleRelation extends Model {
  // custom property here
}

UserRoleRelation.init(
  {
    id: {
      type: INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: INTEGER,
    },
    rid: {
      type: INTEGER,
    },
  },
  {
    sequelize,
    tableName: "userRoleRelation",
  }
);

export default UserRoleRelation;
