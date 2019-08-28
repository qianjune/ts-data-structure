import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'

class Sms extends Model {

}

Sms.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tel: {
      type: Sequelize.BIGINT(11),
      unique: true
    },
    smsNum: {
      type: Sequelize.INTEGER(6)
    },
    effectiveTime: {
      type: Sequelize.BIGINT
    }
  },
  {
    sequelize,
    tableName: 'sms'
  }
)

export default Sms