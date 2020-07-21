/**
 * @description 商品-分类-表
 */

import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";

class ProductCategory extends Model { }

ProductCategory.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '分类id'
  },
  parentId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '父级分类id'
  },
  shopId: {
    type: TYPES.STRING,
    comment: '分类所属的店铺'
  },
  image: {
    type: TYPES.STRING,
    comment: '分类图标'
  },
  status: {
    type: TYPES.INTEGER,
    comment: '启用状态',
    defaultValue: 1
  }
}, {
  sequelize,
  tableName: "productCategory"
})