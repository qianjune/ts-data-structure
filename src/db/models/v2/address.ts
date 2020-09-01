import { Model } from 'sequelize'
import sequelize from '../../../../core/db'
import { TYPES } from '../../types'
const { STRING, INTEGER, DECIMAL } = TYPES

class Address extends Model {

}

Address.init({
  id: {
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  memberId: {
    type: INTEGER,
    comment: "会员id",
    allowNull: false
  },
  country: {
    type: STRING,
    allowNull: false,
    comment: "国家",
    defaultValue:'CN'
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
  area: {
    type: STRING,
    allowNull: false,
    comment: "区"
  },
  town: {
    type: STRING,
    allowNull: false,
    comment: "街道"
  },
  address: {
    type: STRING,
    allowNull: false,
    comment: "地址"
  },
  postCode: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '邮编'
  },
  tel: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '联系电话'
  },
  receiver: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '收件人'
  }
}, {
  sequelize,
  tableName: 'address'
})
Address.sync({
  alter: true
})
export default Address