/**
 * @description 权益表
 */
import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class Right extends Model {

}

Right.init({
  name: {
    comment: '名字'
  },
  num: {},
  pattern: {},
  expired: {

  },
  status: {} // 状态这个需要考量一下
})