/**
 * @description 用户 与 店铺 关系表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { tag } from "@src/lib/router-decorator";
import { TYPES } from "@src/db/types";
import { ShopModel, User } from "..";

class ShopUserRelation extends Model {
  // custom property here
}

ShopUserRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    uid: {
      type: TYPES.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    shopId: {
      type: TYPES.INTEGER,
      allowNull: false,
      references: {
        model: ShopModel,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "shopUserRelation",
  }
);

export default ShopUserRelation;
