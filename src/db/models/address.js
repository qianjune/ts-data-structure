import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class Address extends Model {

}

Address.init({
  memberId: {
    type: INTEGER,
    comment: "会员id",
    allowNull: false
  },
  country: {
    type: STRING,
    allowNull: false,
    comment: "国家"
  },
  city: {
    type: STRING,
    allowNull: false,
    comment: "省"
  },
  province: {
    type: STRING,
    allowNull: false,
    comment: "市"
  },
  district: {
    type: STRING,
    allowNull: false,
    comment: "区"
  },
  address: {
    type: STRING,
    allowNull: false,
    comment: "地址"
  }
}, {
  sequelize,
  tableName: 'address'
})

export default Address