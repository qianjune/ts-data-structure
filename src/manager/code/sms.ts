/**
 * @description 螺丝钉发送短信服务
 */
import querystring from 'querystring'
import axios from 'axios'

import { ValidateCodeModel } from '../../../cache/validateCode'
import { CodeBuilder } from '../../../cache/codeBuilder';
import { CODE_ACTION_TYPE } from '../../enum';
import { ManageResponse } from '../response';
import tryCatch from 'ramda/es/tryCatch';


export interface CodeManagerInterface {
  sendCode(user: string, type: CODE_ACTION_TYPE): Promise<ManageResponse>;
  validateCode(user: string, type: CODE_ACTION_TYPE, code: string): Promise<ManageResponse>;
}

// tel_type:smsCode
// 差个密码加密

class Sms implements CodeManagerInterface {
  /**
 * 发送短信
 * @param {number} mobile 手机号
 * @param {string} message 短信信息
 */
  async sendCode(user: string, type: string): Promise<ManageResponse> {
    const smsCode = CodeBuilder.buildValidateCode()
    const content = this._buildSmsContent(user, smsCode)

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
      ValidateCodeModel.saveCode({ user, key: type, code: smsCode })
      return new ManageResponse(true, '短信发送成功')
    }
    let msg = '发送失败，请稍后再试'
    if (res.data.error == -42) {
      msg = '发送过于频繁，请稍等'
    }
    return new ManageResponse(false, msg)
  }
  async validateCode(user: string, type: string, code: string): Promise<ManageResponse> {
    const result = await ValidateCodeModel.validateCode({ user: user, key: type, code })
    return new ManageResponse(result, result ? '验证成功' : '验证失败')

  }


  /**
   * 生成短信数据
   * @param {number} mobile 手机号
   */
  private _buildSmsContent(mobile: string | number, smsCode: string): string {
    const content = querystring.stringify(
      {
        mobile,
        message: `验证码：${smsCode}，有效时间为5分钟【Qjune】`
      }
    );

    return content
  }


}


export default Sms