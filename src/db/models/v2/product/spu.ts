/**
 * @description 商品-spu-表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class ProductSpu extends Model {

}

ProductSpu.init({
  id: {
    type: TYPES.INTEGER
  },
  no: {
    type: TYPES.STRING
  },
  shopId: {
    type: TYPES.STRING,
    comment: '店铺id'
  },
  name: {
    type: TYPES.STRING
  },
  title: {
    type: TYPES.STRING
  },
  images: {
    type: TYPES.STRING
  },
  categoryId: {
    type: TYPES.INTEGER,
    comment: '分类'
  },
  brandId: {
    type: TYPES.INTEGER
  },
  desc: {
    type: TYPES.STRING,
    comment:"spu描述"
  }
}, {
  sequelize: sequelize,
  tableName: "productSpu"
})