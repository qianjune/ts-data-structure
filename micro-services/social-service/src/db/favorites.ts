/**
 * @description FavoritesDb 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { ShopModel, User } from "@src/db/models";
export enum FavoritesItemType {
  SHOP = "shop",
  PRODUCT = "product",
  NOTE = "note",
}
enum FavoritesStatus {
  DISABLE = 1,
  ABLE = 0,
}
class FavoritesDb extends Model {
  // custom property here
}

FavoritesDb.init(
  {
    id: {
      type: TYPES.INTEGER,
      comment: "id",
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: TYPES.STRING,
      comment: "收藏的类型",
      allowNull: false,
    },
    likeId: {
      type: TYPES.INTEGER,
      comment: "收藏的id",
      allowNull: false,
    },
    uid: {
      type: TYPES.INTEGER,
      comment: "用户id",
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
    disabled: {
      type: TYPES.INTEGER,
      comment:
        "是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐",
      defaultValue: FavoritesStatus.ABLE,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "FavoritesDb",
  }
);

FavoritesDb.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default FavoritesDb;
