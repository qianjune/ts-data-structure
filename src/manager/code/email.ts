import nodemailer from 'nodemailer'
import { ValidateCodeModel } from '../../../cache/validateCode'
import { CodeBuilder } from '../../../cache/codeBuilder'
import { CodeManagerInterface } from './sms'

class EmailModel implements CodeManagerInterface {
  async sendCode(user: string, type: import("../../enum/codeActionType").CODE_ACTION_TYPE): Promise<boolean> {
    const transporter = nodemailer.createTransport({
      service: 'qq',
      port: 465,
      secure: false,
      auth: {
        user: '3190741842@qq.com',
        pass: 'jobdnrkxfwrldegb'

      }
    })
    const code = CodeBuilder.buildValidateCode()
    const info = await transporter.sendMail({
      from: '3190741842@qq.com',
      to: user,
      // to: 'qjhj8ftn@gmail.com',
      // to: '418694294@qq.com',
      subject: 'hello',
      // text: code + '[验证码]',
      html: `<b>${code}[验证码]</b>`
    })
    // if (info.response.starWith('250')) {
    console.log('进入这里')
    ValidateCodeModel.saveCode({ user: user, key: 'register', code })
    // }
    console.log(info.messageId)

    return info
  }
  async validateCode(user: string, type: import("../../enum/codeActionType").CODE_ACTION_TYPE, code: string): Promise<boolean> {
    return await ValidateCodeModel.validateCode({ user: user, key: type, code })
  }
}

export {
  EmailModel
}