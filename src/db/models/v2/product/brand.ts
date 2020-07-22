/**
 * @description 商品-品牌-表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class ProductBrand extends Model { }

ProductBrand.init({
  id: {
    type: TYPES.INTEGER,
    comment: "品牌id",
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: TYPES.STRING,
    allowNull: false,
    comment: "品牌名"
  },
  logo: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '品牌logo'
  },
  desc: {
    type: TYPES.STRING,
    comment: '品牌描述'
  }
},
  {
    sequelize,
    tableName: "productBrand"
  }
)

export default ProductBrand