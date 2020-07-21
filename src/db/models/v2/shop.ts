/**
 * @description 店铺db模型
 */

import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from '@root/core/db'
class ShopModel extends Model { }
ShopModel.init({
  id: {
    type: TYPES.INTEGER,
    comment: "店铺id",
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: TYPES.STRING,
    comment: '店铺名称',
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'shop'
})
export default ShopModel