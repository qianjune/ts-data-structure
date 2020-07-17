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
    comment: "品牌id"
  },
  name: {
    type: TYPES.STRING,
    comment: "品牌名字"
  },
  logo: {
    type: TYPES.STRING
  },
  desc: {
    type: TYPES.STRING
  }
},
  {
    sequelize: sequelize,
    tableName: "productBrand"
  }
)