/**
 * @description FavoritesDb 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { ShopModel, User } from "@src/db/models";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

export enum FavoritesItemType {
  SHOP = "shop",
  PRODUCT = "product",
  NOTE = "note",
}
enum FavoritesStatus {
  DISABLE = 1,
  ABLE = 0,
}
@Table({
  sequelize,
  tableName: "FavoritesDb",
})
class FavoritesDb extends Model {
  @Column({
    type: TYPES.INTEGER,
    comment: "id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    comment: "收藏的类型",
    allowNull: false,
  })
  type: string;
  @Column({
    type: TYPES.INTEGER,
    comment: "收藏的id",
    allowNull: false,
  })
  likeId: number;
  @Column({
    type: TYPES.INTEGER,
    comment: "用户id",
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  })
  uid: number;
  @Column({
    type: TYPES.INTEGER,
    comment:
      "是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐",
    defaultValue: FavoritesStatus.ABLE,
    allowNull: false,
  })
  disabled: number;
}

init(FavoritesDb);

FavoritesDb.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default FavoritesDb;
