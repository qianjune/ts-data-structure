/**
 * @description 商品-品牌-表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import shop from "@src/api/v2/shop";

class ProductBrand extends Model {
  // custom property here
}

ProductBrand.init(
  {
    id: {
      type: TYPES.INTEGER,
      comment: "品牌id",
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "品牌名",
    },
    logo: {
      type: TYPES.STRING,
      comment: "品牌logo",
    },
    desc: {
      type: TYPES.STRING,
      comment: "品牌描述",
    },
    shopId: {
      type: TYPES.INTEGER,
      comment: "关联的店铺id",
    },
  },
  {
    sequelize,
    tableName: "productBrand",
  }
);
ProductBrand.sync({ alter: true });
export default ProductBrand;
