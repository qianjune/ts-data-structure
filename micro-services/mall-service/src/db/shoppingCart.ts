// import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "shoppingCart",
})
class ShoppingCart extends Model {
  static ACTION_TYPE = {
    ADD: "ADD",
    REDUCE: "REDUCE",
    DEL: "DEL",
  };
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "购物车id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "用户id",
  })
  userId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "商品id",
  })
  productId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "店铺Id",
  })
  shopId: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "sku",
  })
  sku: string;
  @Column({
    type: TYPES.INTEGER,
    defaultValue: 1,
    comment: "数量",
  })
  num: number;
}

init(ShoppingCart);
ShoppingCart.sync({ alter: true }).catch(sequelizeErrHandler);
export default ShoppingCart;
