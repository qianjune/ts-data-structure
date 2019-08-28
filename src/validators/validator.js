import { LinValidator, Rule } from '../../core/lin-validator-v2'
import User from '../models/user'
import Sms from '../models/sms'

const telValidator = [
  new Rule('isLength', '手机号必须为11位数字', {
    min: 11,
    max: 11
  }),
  new Rule('isNumeric', '手机号必须为11位数字')
]
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.tel = telValidator
    this.password = [
      new Rule('isLength', '密码不能少于6个字符，最多32个字符', {
        min: 6,
        max: 32
      }),
      new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
    ]
    this.smsCode = [
      new Rule('isLength', '验证码为6位数字', {
        min: 6,
        max: 6
      }),
      new Rule('isNumeric', '验证码为6位数字')
    ]
    // this.nickName = [
    //   new Rule('isLength', '昵称不符合规范', {
    //     min: 6,
    //     max: 32
    //   }),
    // ]
  }
  async validateTel(vals) {
    const tel = vals.body.tel
    const user = await User.findOne({
      where: {
        tel
      }
    })
    if (user) {
      throw new Error('手机号已注册')
    }
  }
  async validateSmsCode(vals) {
    const smsCode = vals.body.smsCode
    const telWithSms = Sms.findOne({
      where:{
        tel:vals.body.tel
      }
    })
    if(smsCode){
      if(telWithSms.dataValues.effectiveTime){
        // 短信有效时间的验证
      }
    }else{
      throw new Error('验证码错误')
    }
  }
}
class SmsValidator extends LinValidator {
  constructor() {
    super()
    this.tel = telValidator
    // this.smsNum = [
    //   new Rule('')
    // ]

  }
}
export {
  RegisterValidator,
  SmsValidator
}