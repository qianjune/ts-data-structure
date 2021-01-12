/**
 * @description 权益表
 */
import { Model } from 'sequelize'
import sequelize from '../../../../../core/db'
import { TYPES } from '../../../types'
const { STRING, INTEGER, DECIMAL } = TYPES

class Right extends Model {

}

// 权益类型，权益说明

Right.init({
  name: {
    type: STRING,
    comment: '名字'
  },
  num: {
    type: INTEGER,
    comment: '数量'
  },
  pattern: {
    type: STRING,
    comment: '权益类型'
  },
  expired: {
    type: INTEGER,
    comment: '过期时间'
  },
  status: {
    type: STRING,
    comment: ''
  } // 状态这个需要考量一下
}, {
  sequelize,
  tableName: 'rights'
})

Right.sync({ alter: true });

export default Right
