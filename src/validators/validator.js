import { LinValidator, Rule } from '../../core/lin-validator-v2'
import User from '../db/models/user'
import Sms from '../manager/code/sms'
import { LoginType, BlogType } from '../lib/enum'

const telRule = [
  new Rule('isLength', '手机号必须为11位数字', {
    min: 11,
    max: 11
  }),
  new Rule('isNumeric', '手机号必须为11位数字')
]
const passwordRule = [
  new Rule('isLength', '密码不能少于6个字符，最多32个字符', {
    min: 6,
    max: 32
  }),
  new Rule('matches', '密码不符合规范', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]')
]
const smsCodeRule = [
  new Rule('isLength', '验证码为6位数字', {
    min: 6,
    max: 6
  }),
  new Rule('isNumeric', '验证码为6位数字')
]
// blog创建
class BlogValidator extends LinValidator {
  constructor(action = 'create') {
    super()
    this.content = [
      new Rule('isLength', '内容不能为空', {
        min: 1
      })

    ]
    this.title = [
      new Rule('isLength', '标题不能为空', {
        min: 1
      })
    ]

  }
  async validateType(vals) {
    const type = vals.body.type // vals.type 不会报错，json格式不对也不会报错
    if (!BlogType.isThisType(type)) {
      throw new Error('博客保存类型不合法')
    }
  }
}
// 注册验证
class RegisterValidator extends LinValidator {
  constructor() {
    super()
    this.mobile = telRule
    this.password = passwordRule
    this.smsCode = [
      new Rule('isLength', '验证码为6位数字', {
        min: 6,
        max: 6
      }),
      new Rule('isNumeric', '验证码为6位数字')
    ]
    this.nickName = [
      new Rule('isOptional'),
      new Rule('isLength', '昵称不符合规范', {
        min: 6,
        max: 32
      }),
    ]
  }
  async validateTel(vals) {
    const mobile = vals.body.mobile
    const user = await User.findOne({
      where: {
        mobile
      }
    })
    if (user) {
      throw new Error('手机号已注册，可直接登陆')
    }
  }
  async validateSmsCode(vals) {
    const smsCode = vals.body.smsCode
    const telWithSms = await Sms.findOne({
      where: {
        mobile: vals.body.mobile
      }
    })
    if (smsCode) {
      console.log(new Date().getTime() - telWithSms.dataValues.effectiveTime)
      if (telWithSms.dataValues.effectiveTime > new Date().getTime() + 60 * 5 * 1000) {
        // 短信有效时间的验证
        throw new Error('验证码已过期')
      } else {
        if (telWithSms.dataValues.smsNum !== smsCode) {
          throw new Error('验证码错误')
        }
      }
    } else {
      throw new Error('请填写验证码')
    }
  }
}
class PositiveIntegerValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isInt', '需要正整数', { min: 1 })
    ]
  }
}
class TokenValidator extends LinValidator {
  constructor() {
    super()
    this.mobile = telRule
    this.password = passwordRule

  }
  async validateTokenType(vals) {
    const type = vals.body.type
    if (!type) {
      throw new Error('type为必填参数')
    }
    if (!LoginType.isThisType(type)) {
      throw new Error('type不合法')
    }
  }
}
class TokenVerifyValidator extends LinValidator {
  constructor() {
    super()
    this.token = [
      new Rule('isLength', 'token不能为空', { min: 1 })
    ]
  }
}
class SendSmsValidator extends LinValidator {
  constructor() {
    super()
    this.mobile = telRule
  }
}


class ValidateSmsValidator extends LinValidator {
  constructor() {
    super()
    this.mobile = telRule
    this.smsCode = smsCodeRule
  }
}

class LoginWithIdentifyAndPassword extends LinValidator {
  constructor() {
    super()
    this.identify = telRule
    this.password = [
      new Rule('isLength', '密码为8-16位', {
        min: 8,
        max: 16
      }),
    ]
  }
}
class EditPasswordValidator extends LinValidator{
  constructor(){
    super()
    this.mobile = telRule
    this.smsCode = smsCodeRule
    this.password = [
      new Rule('isLength', '密码为8-16位', {
        min: 8,
        max: 16
      }),
    ]
  }
}
class PaginationValidator extends LinValidator {
  constructor() {
    super()
    this.page = [
      new Rule('isNumeric', '必须为数字'),
      new Rule('isOptional')
    ]
    this.pageSize = [
      new Rule('isNumeric', '必须为数字'),
      new Rule('isOptional')
    ]
  }
}

class ShoppingCartValidator extends LinValidator {
  constructor() {
    super()
    this.productId = [
      new Rule('isNumeric', '不能为空')
    ]
  }
}
export {
  ShoppingCartValidator,
  PaginationValidator,
  RegisterValidator,
  TokenVerifyValidator,
  SendSmsValidator,
  TokenValidator,
  BlogValidator,
  PositiveIntegerValidator,
  ValidateSmsValidator,
  LoginWithIdentifyAndPassword,
  EditPasswordValidator
}