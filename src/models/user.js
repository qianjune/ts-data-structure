import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import bcrypt from 'bcryptjs'
class User extends Model {

}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tel: {
      type: Sequelize.INTEGER(11),
      unique: true,
    },
    nickName: {
      type: Sequelize.STRING
    },
    smsCode:{
      type:Sequelize.INTEGER(6)
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    openid: {
      type: Sequelize.STRING(64),
      unique: true
    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

export default User