/** 
 * @description 等级表
 */
import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class Level extends Model {

}

Level.init({
  name: {
    comment: '等级名'
  },
  nextLevelId: {
    comment: '下个等级id'
  }
})