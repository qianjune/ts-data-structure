import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import bcrypt from 'bcryptjs'
class User extends Model {
  static async verifyTelAndPassword(tel, password) {
    const user = await User.findOne({
      where: {
        tel
      }
    })
    if (!user) {
      throw new global.errs.AuthFailed('账户或密码不正确')
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password)
    if (!isPasswordValid) {
      throw new global.errs.AuthFailed('账户或密码不正确')
    }
    return user
  }
}

User.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tel: {
      type: Sequelize.BIGINT(11),
      unique: true,
    },
    nickName: {
      type: Sequelize.STRING
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