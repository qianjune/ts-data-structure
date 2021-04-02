/**
 * @description 支付宝model
 * @author June
 */
import AlipaySdk from "alipay-sdk";
import axios from "axios";
import config from "@root/config/config";

const alipaySdk = new AlipaySdk({
  appId: config.alipay.appId,
  privateKey: config.alipay.private_key,
  alipayPublicKey: config.alipay.alipay_public_key,
});

// {
//   "code": "20001",
//   "msg": "Insufficient Token Permissions",
//   "subCode": "aop.invalid-auth-token",
//   "subMsg": "无效的访问令牌"
// }
class AliPayModel {
  accessToken;
  /**
   * 获取用户accessToken，alipayUserId,expiresIn,reExpiresIn,refreshToken,userId
   * @param {String} authCode
   */
  async getAccessToken(authCode) {
    try {
      let params = {
        grantType: "authorization_code",
        code: authCode,
      };
      let options = {};
      let result = await alipaySdk.exec(
        "alipay.system.oauth.token",
        params,
        options
      );
      if (result.accessToken) {
        this.accessToken = result.accessToken;
      }
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * @description 处理encryptedData，一种是直接responseStr,一种是呆签名
   * @param {String} encryptedDataStr 前端传过来的encryptedData
   */
  encryptedDataFormat(encryptedDataStr) {
    let encryptedData = "";
    try {
      encryptedData = JSON.parse(encryptedDataStr);
    } catch (error) {
      encryptedData = {
        response: encryptedDataStr,
      };
    }
    return encryptedData;
  }

  /**
   * @description 解密 response
   * @param {Object} encryptedData
   */
  async decrypt(encryptedData) {
    return await axios.post(`${config.spring.baseUrl}decrypt`, encryptedData);
  }
  /**
   * 生成二维码
   */
  async buildQrcode() {
    try {
      let params = {
        bizContent: {
          url_param: "/index.html?name=ali&loc=hz",
          query_param: "name=1&age=2",
          describe: "二维码描述",
        },
      };
      let options = {};
      let result = await alipaySdk.exec(
        "alipay.open.app.qrcode.create",
        params,
        options
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * 已下架
   */
  async getUserInfo() {
    let params = {
      auth_token: this.accessToken,
    };
    console.log(params);
    let options = {};
    let result = await alipaySdk.exec(
      "alipay.user.info.share",
      params,
      options
    );
    return result;
  }
}

export default AliPayModel;
