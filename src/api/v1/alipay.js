import BaseRouter, { get, prefix, parameter, post } from '../../lib/router-decorator'
import joi from '@hapi/joi'
import moment from 'moment'
import axios from 'axios'
import config from '../../../config/config'
import AliPayModel from '../../models/alipay'

axios.defaults.headers['Content-Type'] = 'application/json';

const alipay = new AliPayModel()

@prefix('/v1/alipay')
class AliPayApi extends BaseRouter {
  @get('/userInfo_new')
  @parameter('authCode', joi.string().required(), 'query')
  async getUserInfo(ctx) {
    // const aliPay = new AliPayUtil(fs.readFileSync(path.join(__dirname,'public_key.txt')),path.join(__dirname,'private_key.txt'))
    // console.log(aliPay.privateKey)
    // console.log(aliPay.publicKey)
    // console.log('123',await aliPay.rsaCheck())
    const { authCode } = ctx.query
    const params = {
      method: 'alipay.system.oauth.token',
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      app_id: config.alipay.appId,
      sign_type: 'RSA2',
      sign: config.alipay.private_key,
      grant_type: 'authorization_code',
      code: authCode,
      charset: 'utf-8'
    }
    console.log(params)
    const result = await axios.get('https://openapi.alipay.com/gateway.do', {
      params,
      headers: { 'Content-Type': 'application/json;charset=UTF8' }
    })


    ctx.body = {
      data: result.json()
    }
  }

  /**
   * 获取二维码
   * @param {Object} ctx ctx
   */
  @get('/qrcode')
  async getQrcode(ctx) {
    ctx.body = {
      data: await alipay.buildQrcode()
    }
  }

  /**
   * 获取accessToken
   * @param {Object} ctx ctx
   */
  @get('/accessToken')
  @parameter('authCode', joi.string().required(), 'query')
  async getUserInfo_old(ctx) {
    const { authCode } = ctx.query
    const result = await alipay.getAccessToken(authCode)
    console.log(result)
    ctx.body = {
      data: result,
      success: true
    }
  }

  /**
   * 获取用户手机号
   * @param {Object}} ctx ctx
   */
  @post('/telphone')
  @parameter(joi.object({
    encryptedData: joi.string().required()
  }), 'body')
  async getUserTelphone(ctx) {
    console.log('触达')
    try {
      console.log(ctx.request.body.encryptedData)
      const encryptedData = JSON.parse(ctx.request.body.encryptedData)
      console.log(encryptedData)
      const result = await axios.post(`${config.spring.baseUrl}telphone`, encryptedData)
      console.log(result.data)
      ctx.body = {
        data: result.data
      }
    } catch (error) {
      console.log(error)
    }
  }
}

const aliPayApi = new AliPayApi()
export default aliPayApi.init()