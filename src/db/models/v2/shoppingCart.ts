import { Model } from 'sequelize'
import { TYPES } from '@src/db/types'
import sequelize from '@root/core/db'


class ShoppingCart extends Model {
  static ACTION_TYPE = {
    ADD: 'ADD',
    REDUCE: 'REDUCE',
    DEL: 'DEL'
  }

}

ShoppingCart.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    uid: {
      type: TYPES.INTEGER,
      allowNull: false
    },
    productId: {
      type: TYPES.INTEGER,
      allowNull: false
    },
    num: {
      type: TYPES.INTEGER,
      defaultValue: 1
    },
  },
  {
    sequelize,
    tableName: 'shoppingCart'
  }
)
ShoppingCart.sync({alter: true})
export default ShoppingCart