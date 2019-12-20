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
    type: INTEGER,
    comment: '数值'
  },
  memberId: {
    type: INTEGER,
    comment: '会员id'
  },
  type: {
    type: STRING,
    comment: '变化方式（increase 增加，reduce 减少）'
  },
  pattern: {
    type: STRING,
    comment: '变化种类'
  },
  expired: {
    type: INTEGER,
    comment: '过期时长'
  }
}, {
  sequelize,
  tableName: 'points'
})

export default Points