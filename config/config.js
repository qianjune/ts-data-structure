export default {
  environment: 'dev',
  database: {
    dbName: 'jblog',
    host: '121.43.158.38',
    port: 3311,
    user: 'root',
    password: 'Aa47896321'
  },
  security: {
    secretKey: "abcdefg",
    expiresIn: 60 * 60 * 24 * 15
  },
  refresh: {
    secretKey: 'hijklmn',
    expiresIn: 60 * 60 * 24 * 30
  },
  wx: {
    appId: 'wx85f7c766573a5714',
    appSecret: '3da19983c1d8f35ff9097285e0fb0272',
    loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
  },
  host: 'http://localhost:3000/',
  luosimao: {
    smsUrl: 'http://sms-api.luosimao.com/v1/send.json',
    password: '4d0c7a0330d9a97ba2417b166dace90a'
  }
}