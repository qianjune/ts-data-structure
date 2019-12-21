import { Sequelize, Model } from 'sequelize'
import sequelize from '../../../core/db'
import bcrypt from 'bcryptjs'
import SmsForMini from '../../models/sms'
import { MemberController } from '../../controllers/member'

const smsForMiniModel = new SmsForMini()

class User extends Model {
  /**
   * 手机登录
   * @param {Number} mobile 手机号
   * @param {String} password 密码/验证码
   * @param {String} type 登录类型
   */
  static async mobileLogin(mobile, password, type = 'password') {
    const user = await User.findOne({
      where: { mobile }
    })
    // 短信登录验证

    if (type === 'smsCode') {
      const result = await smsForMiniModel.validateSmsCode({
        mobile, key: 'login', smsCode: password
      })

      if (result) {
        if (user) {
          throw new global.errs.SuccessForMini()
        } else {
          const nickName = `${mobile}_${Date.now()}`

          const result = await User.create({
            mobile,
            nickName,
            address: '',
            password: '',
          })
          console.log('快捷登录创建用户', result.getDataValue('id'))
          if (result.getDataValue('id')) {
            MemberController.addNewMember({ userId: result.getDataValue('id') })
          }
          throw new global.errs.SuccessForMini()
        }
      } else {
        throw new global.errs.HttpExceptionForMini('验证码错误')
      }
    }
    // 首次登录，注册
    if (!user) {
      const nickName = `${mobile}_${Date.now()}`

      const result = await User.create({
        mobile,
        nickName,
        address: '',
        password: '',
      })
      console.log(result.data)
      throw new global.errs.SuccessForMini()
    } else {
      // 密码验证
      if (password) {
        if (user.getDataValue('password') === password) {
          throw new global.errs.SuccessForMini()
        } else {
          throw new global.errs.HttpExceptionForMini('账号或密码不正确')
        }
      }
    }
  }
  static async editPassword(mobile, password, smsCode, type = 'password') {
    const user = await User.findOne({
      where: {
        mobile
      }
    })
    if (user) {
      const result = await smsForMiniModel.validateSmsCode({
        mobile, key: type, smsCode
      })
      if (result) {
        user.setDataValue('password', password)
        await user.save()
        throw new global.errs.SuccessForMini()

      } else {
        throw new global.errs.HttpExceptionForMini('验证码不正确')
      }
    } else {
      throw new global.errs.HttpExceptionForMini('账号不存在')
    }
  }
  static async verifyTelAndPassword(mobile, password) {
    const user = await User.findOne({
      where: {
        mobile
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

console.log('内部')
console.log(User)
// await User.sync({ alter: true });
export default {
  a: 1
}