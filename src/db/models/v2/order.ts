/**
 * @description OrderDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class OrderDb extends Model{}

OrderDb.init({},{
  sequelize,
  tableName:'OrderDb'
})

OrderDb.sync({
  alter:true
})

export default OrderDb