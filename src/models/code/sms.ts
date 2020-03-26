import querystring from 'querystring'
import axios from 'axios'

import { ValidateCodeModel } from '../../../cache/validateCode'
import { CodeBuilder } from '../../../cache/codeBuilder';

// tel_type:smsCode
// 差个密码加密

class Sms {

  /**
   * 生成短信数据
   * @param {number} mobile 手机号
   */
  static _buildSmsContent(mobile: string | number, smsCode: string) {
    const content = querystring.stringify(
      {
        mobile,
        message: `验证码：${smsCode}，有效时间为5分钟【Qjune】`
      }
    );

    return content
  }
  /**
   * 发送短信
   * @param {number} mobile 手机号
   * @param {string} message 短信信息
   */
  static async sendSms(mobile: number | string, key = 'common') {
    const smsCode = CodeBuilder.buildValidateCode()
    const content = this._buildSmsContent(mobile, smsCode)

    const option = {
      url: 'http://sms-api.luosimao.com/v1/send.json',
      method: 'POST',
      data: content,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from('api:key-' + global.config.luosimao.password).toString('base64')}`,
        'Content-Length': content.length,
      },
    };
    // const res = await axios.post(global.config.luosimao.smsUrl, contentString, {
    //   auth: {
    //     username: 'api', password: 'key-' + global.config.luosimao.password,
    //   },
    //   'Content-Type': 'application/x-www-form-urlencoded',
    // })
    const res = await axios(option as any)
    console.log('短信发送结果', res.data)
    if (res.data.error === 0) {
      ValidateCodeModel.saveCode({ user: mobile, key, code: smsCode })
      throw new global.errs.SuccessForMini()
    }
    let msg = ''
    if (res.data.error == -42) {
      msg = '发送过于频繁，请稍等'
    }
    throw new global.errs.HttpExceptionForMini(msg)
  }

  static async validateSms(mobile: number, key: string, code: string) {
    return await ValidateCodeModel.validateCode({ user: mobile, key, code })
  }
}


export default Sms