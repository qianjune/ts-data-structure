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
      autoIncrement: true
    },
    mobile: {
      type: Sequelize.BIGINT(11),
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      set(val) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      }
    },
    email: {
      type: Sequelize.STRING,
      unique: true
    },
    status: {
      type: Sequelize.STRING,
      unique: true
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

// await User.sync({ alter: true });
export default User