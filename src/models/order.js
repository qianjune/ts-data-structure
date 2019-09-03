import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import { mysqlArrayStringHandler } from '../lib/common'

class Order extends Model {

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
    products:{
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      ...mysqlArrayStringHandler('products')
    },
    status:{
      type:Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'order'
  }
)

export default Order