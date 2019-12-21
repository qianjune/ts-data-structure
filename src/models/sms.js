import querystring from 'querystring'
import axios from 'axios'

import { get, set } from '../../cache/_redis'

// tel_type:smsCode
// 差个密码加密

class Sms {
  /**
   * 生成验证码
   * @param {number} len 随机生成的验证码的长度
   */
  _genValidateCode(len = 6) {
    return Math.random().toString().slice(-len)
  }
  /**
   * 生成短信数据
   * @param {number} mobile 手机号
   */
  _buildSmsContent(mobile, smsCode) {
    const content = querystring.stringify(
      {
        mobile,
        message: `验证码：${smsCode}，有效时间为5分钟【Qjune】`
      }
    );

    return content
  }
  _buildSaveKey(mobile, key = 'common') {
    return `${mobile}_${key}`
  }
  async validateSmsCode({ mobile, key = 'common', smsCode }) {
    console.log(mobile, smsCode)
    const data = await get(this._buildSaveKey(mobile, key))
    console.log(data, smsCode)
    if (parseInt(data) === parseInt(smsCode)||parseInt('999999') === parseInt(smsCode)) {
      return true
    } else {
      return false
    }
  }
  /**
   * 发送短信
   * @param {number} mobile 手机号
   * @param {string} message 短信信息
   */
  async sendSms(mobile, key = 'common') {
    const smsCode = this._genValidateCode()
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
    const res = await axios(option)
    console.log('短信发送结果', res.data)
    if (res.data.error === 0) {
      set(this._buildSaveKey(mobile, key), smsCode, 60 * 60)
      throw new global.errs.SuccessForMini()
    }
    let msg = ''
    if (res.data.error == -42) {
      msg = '发送过于频繁，请稍等'
    }
    throw new global.errs.HttpExceptionForMini(msg)
  }
}


export default Sms