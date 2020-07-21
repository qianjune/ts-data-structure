import { Model } from "sequelize";
import sequelize from '@root/core/db'
import { TYPES } from "@src/db/types";

class ShopProductRelation extends Model { }

ShopProductRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: '店铺商品关系id'
    },
    shopId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: '店铺id'
    },
    productId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: '商品id'
    }
  },
  {
    sequelize,
    tableName: 'shopProductRelation'
  }
)

export default ShopProductRelation