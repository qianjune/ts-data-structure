/**
 * @description 商品-sku-表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class ProductSku extends Model {

}

ProductSku.init({
  id: {
    type: TYPES.INTEGER
  },
  price: {
    type: TYPES.INTEGER,
    comment: '价格'
  },
  stock: {
    type: TYPES.INTEGER,
    comment: "库存"
  },
  attributes: {
    type: TYPES.STRING, // 1-23;2-34;3-45
  },
  spuId: {
    type: TYPES.INTEGER,
    comment: '所属的spu'
  },
  status: {
    type: TYPES.INTEGER,
    comment: "sku的状态"
  }
}, {
  sequelize: sequelize,
  tableName: 'productSku'
})