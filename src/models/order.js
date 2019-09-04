import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import { mysqlJsonHandler } from '../lib/common'

class Order extends Model {
  static WAIT_PAY = 'WAIT_PAY'
  static WAIT_SHIP = 'WAIT_SHIP'
  static SHIPING = 'SHIPING'
  static FINISH_SHIP = 'FINISH_SHIP'
}

Order.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    belong: {
      type: Sequelize.STRING
    },
    products: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      ...mysqlJsonHandler('products')
    },
    status: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'order'
  }
)

export default Order