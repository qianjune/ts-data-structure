/**
 * @description XXXXXX 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class XXXXXX extends Model{}

XXXXXX.init({},{
  sequelize,
  tableName:'XXXXXX'
})

XXXXXX.sync({
  alter:true
})

export default XXXXXX