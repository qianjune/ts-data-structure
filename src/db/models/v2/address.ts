/**
 * @description AddressDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class AddressDb extends Model{}

AddressDb.init({},{
  sequelize,
  tableName:'AddressDb'
})

AddressDb.sync({
  alter:true
})

export default AddressDb