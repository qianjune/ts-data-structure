import { Model } from "sequelize";
import sequelize from '@root/core/db'
import { TYPES } from "@src/db/types";

class ShopProductRelation extends Model { }

ShopProductRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    shopId: {
      type: TYPES.INTEGER,
      allowNull: false,
    },
    productId: {
      type: TYPES.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'shopProductRelation'
  }
)

export default ShopProductRelation