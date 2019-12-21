/**
 * @description 短信相关 api
 * @author June_end
 */
import Router from 'koa-router'
import Sms from '../../models/sms'
import User from '../../db/models/user'
import { SendSmsValidator, ValidateSmsValidator, LoginWithIdentifyAndPassword, EditPasswordValidator } from '../../validators/validator'

const smsModel = new Sms()

const router = new Router({
  prefix: '/api/user/web'
})

// 忘记密码-发送短信验证码
router.post('/password/send-sms', async (ctx) => {
  const v = await new SendSmsValidator().validate(ctx)
  const mobile = v.get('body.mobile')
  await smsModel.sendSms(mobile, 'password')

})

// 登录发送手机验证码
router.post('/login/login-send-sms-code', async (ctx) => {
  const v = await new SendSmsValidator().validate(ctx)
  const mobile = v.get('body.mobile')
  console.log('mobile', mobile)
  await smsModel.sendSms(mobile, 'login')

})

// 根据手机验证码登录
router.post('/login/login-by-sms-code', async (ctx) => {
  console.log
  const v = await new ValidateSmsValidator().validate(ctx)
  const mobile = v.get('body.mobile')
  const smsCode = v.get('body.smsCode')
  await User.mobileLogin(mobile, smsCode, 'smsCode')
})

// 忘记密码-通过短信重置密码
router.post('/password/reset-by-sms', async (ctx) => {
  console.log('进入')
  const v = await new EditPasswordValidator().validate(ctx)
  const mobile = v.get('body.mobile')
  const password = v.get('body.password')
  const smsCode = v.get('body.smsCode')
  console.log(mobile, password, smsCode)
  await User.editPassword(mobile, password, smsCode, 'password')
})

// 密码混登接口
router.post('/login/identify', async (ctx) => {
  console.log('进入')
  const v = await new LoginWithIdentifyAndPassword().validate(ctx)
  const identify = v.get('body.identify')
  const password = v.get('body.password')
  console.log(identify, password)
  await User.mobileLogin(identify, password, 'password')
})

export default router