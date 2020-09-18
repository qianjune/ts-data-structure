/**
 * @description IndexAppEntryDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class IndexAppEntryDb extends Model{}

IndexAppEntryDb.init({},{
  sequelize,
  tableName:'IndexAppEntryDb'
})

IndexAppEntryDb.sync({
  alter:true
})

export default IndexAppEntryDb