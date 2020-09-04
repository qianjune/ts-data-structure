/**
 * @description OrderDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class OrderDb extends Model { }

OrderDb.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '订单id'
  },
  userId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  addressId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '收获地址id'
  }
}, {
  sequelize,
  tableName: 'OrderDb'
})

OrderDb.sync({
  alter: true
})

export default OrderDb