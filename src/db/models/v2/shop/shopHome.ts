/**
 * @description 店铺首页信息 - 模型
 */

import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from '@root/core/db'

class ShopHome extends Model { }

ShopHome.init({
  id: {
    type: TYPES.INTEGER,
    comment: "id",
    autoIncrement: true,
    primaryKey: true
  },
  shopId: {
    type: TYPES.INTEGER,
    comment: '店铺id',
    allowNull: false
  },
  recommendGoods: {
    type: TYPES.STRING,
    comment: '推荐商品id组'
  },

}, {
  tableName: 'shopHome',
  sequelize
})