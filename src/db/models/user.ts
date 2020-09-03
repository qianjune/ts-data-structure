import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import bcrypt from 'bcryptjs'
import { TYPES } from '../types'


class User extends Model {

}

User.init(
  {
    id: {
      type: TYPES.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户id'
    },
    mobile: {
      type: TYPES.BIGINT(11 as any),
      unique: true,
      comment: '用户手机号'
    },
    password: {
      type: TYPES.STRING,
      set(val: string) {
        const salt = bcrypt.genSaltSync(10)
        const psw = bcrypt.hashSync(val, salt)
        this.setDataValue('password', psw)
      },
      comment: '用户密码'
    },
    email: {
      type: TYPES.STRING,
      unique: true,
      comment: '用户邮箱'
    },
    status: {
      type: TYPES.STRING,
      unique: true,
      comment: '用户状态'
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