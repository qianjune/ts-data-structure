import nodemailer from 'nodemailer'
import { ValidateCodeModel } from '../../../cache/validateCode'
import { CodeBuilder } from '../../../cache/codeBuilder'

class EmailModel {
  static async sendEmail(email = '418694294@qq.com', key) {
    // let testAccount = await nodemailer.createTestAccount()
    let transporter = nodemailer.createTransport({
      service: 'qq',
      port: 465,
      secure: false,
      auth: {
        user: '3190741842@qq.com',
        pass: 'jobdnrkxfwrldegb'

      }
    })
    const code = CodeBuilder.buildValidateCode()
    let info = await transporter.sendMail({
      from: '3190741842@qq.com',
      to: email,
      // to: 'qjhj8ftn@gmail.com',
      // to: '418694294@qq.com',
      subject: 'hello',
      // text: code + '[验证码]',
      html: `<b>${code}[验证码]</b>`
    })
    // if (info.response.starWith('250')) {
    console.log('进入这里')
    ValidateCodeModel.saveCode({ user: email, key: 'register', code })
    // }
    console.log(info.messageId)

    return info
  }
  static async validateEmail(email, key, code) {
    return await ValidateCodeModel.validateCode({ user: email, key, code })
  }
}

export {
  EmailModel
}