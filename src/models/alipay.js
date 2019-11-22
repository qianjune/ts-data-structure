import AlipaySdk from 'alipay-sdk'
import config from '../../config/config'

const alipaySdk = new AlipaySdk({
  appId: config.alipay.appId,
  privateKey: config.alipay.private_key,
  alipayPublicKey:config.alipay.alipay_public_key
})



// {
//   "code": "20001",
//   "msg": "Insufficient Token Permissions",
//   "subCode": "aop.invalid-auth-token",
//   "subMsg": "无效的访问令牌"
// }
class AliPayModel {
  accessToken
  /**
   * 获取用户accessToken，alipayUserId,expiresIn,reExpiresIn,refreshToken,userId
   * @param {String} authCode 
   */
  async getAccessToken(authCode) {
    try {
      let params = {
        grantType: 'authorization_code',
        code: authCode,
      };
      let options = {};
      let result = await alipaySdk.exec("alipay.system.oauth.token", params, options)
      if (result.accessToken) {
        this.accessToken = result.accessToken
      }
      return result
    } catch (error) {
      console.log(error)
    }
  }

  /**
   * 生成二维码
   */
  async buildQrcode() {
    try {
      let params = {
        bizContent: {
          "url_param": "/index.html?name=ali&loc=hz",
          "query_param": "name=1&age=2",
          "describe": "二维码描述"
        }
      };
      let options = {};
      let result = await alipaySdk.exec("alipay.open.app.qrcode.create", params, options)
      return result
    } catch (error) {
      console.log(error)
    }
  }
  
  /**
   * 已下架
   */
  async getUserInfo() {

    let params = {
      auth_token: this.accessToken,
    };
    console.log(params)
    let options = {};
    let result = await alipaySdk.exec("alipay.user.info.share", params, options);
    return result;
  }
}

export default AliPayModel