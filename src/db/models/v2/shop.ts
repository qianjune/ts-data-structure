import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from '@root/core/db'
class Shop extends Model { }
Shop.init({
  id: {
    type: TYPES.INTEGER,
    comment: "店铺id",
    allowNull: false
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
export default Shop