import moment from 'moment'
import Sequelize from 'sequelize'
import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import { TYPES } from '../types'
const { STRING, INTEGER, DECIMAL } = TYPES

class Member extends Model {

}

Member.init({
  id: {
    autoIncrement: true,
    type: TYPES.INTEGER,
    primaryKey: true,
    comment: '会员id'
  },
  userId: {
    allowNull: false,
    type: INTEGER,
    comment: '用户id'
  },
  nickName: {
    type: STRING,
    comment: '昵称',
    allowNull: false
  },
  sex: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别(1.男性 2.女性 3.保密)',
    defaultValue: 3
  },
  memberCardCode: {
    type: STRING,
    allowNull: false,
    comment: "会员卡号"
  },
  growthValue: {
    type: INTEGER,
    comment: '成长值',
    allowNull: false,
    defaultValue: 0
  },
  points: {
    comment: '当前积分',
    defaultValue: 0,
    type: INTEGER
  },

  realName: {
    type: STRING,
    comment: '姓名'
  },
  birthday: {
    type: TYPES.DATE,
    comment: '生日',
    defaultValue: Sequelize.NOW
  },
  residence: {
    type: STRING,
    comment: "常居地"
  },
  idCard: {
    type: TYPES.INTEGER,
    comment: '生份证'
  }

}, {
  sequelize,
  tableName: 'member'
})
Member.sync({
  alter: true
})
export default Member