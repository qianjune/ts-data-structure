import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";
import { sequelizeErrHandler } from "@src/utils/error_handler";

class ShoppingCart extends Model {
  static ACTION_TYPE = {
    ADD: "ADD",
    REDUCE: "REDUCE",
    DEL: "DEL",
  };
}

ShoppingCart.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "购物车id",
    },
    userId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "用户id",
    },
    productId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "商品id",
    },
    shopId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "店铺Id",
    },
    sku: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "sku",
    },
    num: {
      type: TYPES.INTEGER,
      defaultValue: 1,
      comment: "数量",
    },
  },
  {
    sequelize,
    tableName: "shoppingCart",
  }
);
ShoppingCart.sync({ alter: true }).catch(sequelizeErrHandler);
export default ShoppingCart;