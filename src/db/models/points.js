/**
 * @description 积分 变化 表
 */

import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class Points extends Model {

}

Points.init({
  num: {
    comment: '数值'
  },
  memberId: {
    comment: '会员id'
  },
  type: {
    comment: '变化方式（increase 增加，reduce 减少）'
  },
  pattern: {
    comment: '变化种类'
  },
  expired: {
    comment: '过期时长'
  }
})