import Router from 'koa-router'
import axios from 'axios'
import querystring from 'querystring'
import Sms from '../../models/sms'
import { SmsValidator } from '../../validators/validator'
import { success } from '../../lib/common'

const router = new Router({
  prefix: '/v1/sms'
})

const genValidateCode = () => Math.random().toString().slice(-6)
// const timeValidate = (time) =>{
//   const current = new Date().getTime()
// }
const sendSms = async (data) => {
  const content = querystring.stringify(data);

  const res = await axios.post(global.config.luosimao.smsUrl, content, {
    auth: { username: 'api', password: 'key-' + global.config.luosimao.password },
  })
  return res
}

router.post('/', async (ctx) => {
  const v = await new SmsValidator().validate(ctx)

  const smsBody = {
    tel: v.get('body.tel'),
    smsNum: genValidateCode(),
    effectiveTime: new Date().getTime() + 60 * 5
  }
  const telWithSms = await Sms.findOne({
    where:{
      tel:v.get('body.tel')
    }
  })
  if(telWithSms){
    console.log(telWithSms.dataValues)
    await telWithSms.update({
      smsNum:smsBody.smsNum,
      effectiveTime:smsBody.effectiveTime
    })
  }else{
    await Sms.create(smsBody)
  }
  
  const postSmsData = {
    mobile: smsBody.tel,
    message: `${smsBody.smsNum},验证码有效时间为5分钟【Qjune】`
  }


  const res = await sendSms(postSmsData)
  const { error, msg } = res.data
  if (error === 0) {
    success()
  } else {
    throw new global.errs.ParameterException(msg, error)
  }



})
export default router