/**
 * @description 店铺db模型
 */

import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";
import { sequelizeErrHandler } from "@src/utils/error_handler";
class ShopModel extends Model {
  // custom property here
}
ShopModel.init(
  {
    id: {
      type: TYPES.INTEGER,
      comment: "店铺id",
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: TYPES.STRING,
      comment: "店铺名称",
      allowNull: false,
    },
    logo: {
      type: TYPES.STRING,
      comment: "店铺logo",
      defaultValue: "",
    },
  },
  {
    sequelize,
    tableName: "shop",
  }
);
ShopModel.sync({
  alter: true,
}).catch(sequelizeErrHandler);
export default ShopModel;
