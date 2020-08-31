import { Sequelize, Model } from 'sequelize'
import sequelize from '../../../core/db'
import bcrypt from 'bcryptjs'


class User extends Model {

}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment:'用户id'
    },
    mobile: {
      type: Sequelize.BIGINT(11),
      unique: true,
      comment:'用户手机号'
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
      comment:'用户密码'
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      comment:'用户邮箱'
    },
    status: {
      type: Sequelize.STRING,
      unique: true,
      comment:'用户状态'
    }
    // openid: {
    //   type: Sequelize.STRING(64),
    //   unique: true
    // }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

User.sync({ alter: true });
export default User