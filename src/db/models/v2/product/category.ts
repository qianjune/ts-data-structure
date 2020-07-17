/**
 * @description 商品-分类-表
 */

import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";

class ProductCategory extends Model {

}

ProductCategory.init({
  id: {
    type: TYPES.INTEGER
  },
  parentId: {
    type: TYPES.INTEGER
  },
  shopId: {
    type: TYPES.STRING
  },
  image: {
    type: TYPES.STRING
  },
  status: {
    type: TYPES.INTEGER
  }
}, {
  sequelize,
  tableName: "productCategory"
})