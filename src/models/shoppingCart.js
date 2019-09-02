import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import { mysqlArrayStringHandler } from '../lib/common'

class ShoppingCart extends Model {

}

ShoppingCart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // 采用 商品id:数量;的格式，或者新建一个表
    products: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      ...mysqlArrayStringHandler('products')
    },
    belong: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'shoppingCart'
  }
)

export default ShoppingCart