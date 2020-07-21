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
    type: TYPES.INTEGER,
    comment: 'sku id',
    autoIncrement: true,
    primaryKey: true
  },
  code: {
    type: TYPES.STRING
  },
  price: {
    type: TYPES.FLOAT,
    comment: 'sku价格',
    defaultValue: 99999999
  },
  stock: {
    type: TYPES.INTEGER,
    comment: "sku库存",
    defaultValue: 0
  },
  attributes: {
    type: TYPES.STRING, // 1-23;2-34;3-45
    comment: 'sku 拥有的属性'
  },
  spuId: {
    type: TYPES.INTEGER,
    comment: '所属的spu'
  },
  status: {
    type: TYPES.INTEGER,
    comment: "sku的状态",
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: 'productSku'
})