/** 
 * @description 等级表
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
const { STRING, INTEGER, DECIMAL } = TYPES

class Level extends Model {

}

Level.init({
  name: {
    type: STRING,
    comment: '等级名'
  },
  weight: {
    type: INTEGER,
    comment: '权重'
  },
  num: {
    type: INTEGER,
    comment: '该等级需要的数值'
  }
}, {
  sequelize,
  tableName: 'level'
})

Level.sync({
  alter: true
})

export default Level