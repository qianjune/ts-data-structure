import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
const { STRING, INTEGER, DECIMAL } = TYPES

class IdCard extends Model {

}

IdCard.init({
  front: {
    type: STRING,
    allowNull: false,
    comment: "身份证正面"
  },
  back: {
    type: STRING,
    allowNull: false,
    comment: "身份证背面"
  },
  name: {
    type: STRING,
    allowNull: false,
    comment: "姓名"
  },
  idNum: {
    type: STRING,
    allowNull: false,
    comment: "身份证号码"
  },
  memberId: {
    type: INTEGER,
    allowNull: false,
    comment: "会员id"
  }
}, {
  sequelize,
  tableName: 'idCard'
})

export default IdCard