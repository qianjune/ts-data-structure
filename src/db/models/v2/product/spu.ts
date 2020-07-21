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
    type: TYPES.INTEGER,
    comment: 'spu的id',
    primaryKey: true,
    autoIncrement: true,
  },
  code: {
    type: TYPES.STRING,
    comment: 'spu的识别码'
  },
  shopId: {
    type: TYPES.STRING,
    comment: '店铺id'
  },
  name: {
    type: TYPES.STRING,
    allowNull: false,
    comment: 'spu的名字'
  },
  title: {
    type: TYPES.STRING,
    allowNull: false,
    comment: 'spu的标题'
  },
  images: {
    type: TYPES.STRING,
    allowNull: false,
    comment: 'spu的配图'
  },
  categoryId: {
    type: TYPES.INTEGER,
    comment: '分类',
    allowNull: false,
  },
  brandId: {
    type: TYPES.INTEGER,
    comment: '品牌id'
  },
  desc: {
    type: TYPES.STRING,
    comment: "spu描述"
  }
}, {
  sequelize,
  tableName: "productSpu"
})