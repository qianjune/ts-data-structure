import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class Member extends Model {

}

Member.init({
  userId: {
    allowNull: false,
    type: INTEGER,
    comment: '用户id'
  },
  nickName: {
    type: STRING,
    comment: '昵称'
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
  tel: {
    type: STRING,
    comment: '手机号'
  },
  realName: {
    type: STRING,
    comment: '姓名'
  },
  birthday: {
    type: STRING,
    comment: '生日'
  },
  residence: {
    type: STRING,
    comment: "常居地"
  },
  // 邮箱 和手机应该属于User
  email: {
    type: STRING,
    comment: "邮箱地址"
  },
  // address:{
  // }
  // idCard:{

  // }

}, {
  sequelize,
  tableName: 'member'
})

export default Member