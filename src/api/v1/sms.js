import Router from 'koa-router'
import axios from 'axios'
import querystring from 'querystring'

const postData = {
  mobile: '13116763735',
  message: 'test【Qjune】'
};

const content = querystring.stringify(postData);

const router = new Router({
  prefix: '/v1/sms'
})

const sendSms = async () => {
  const res = await axios.post(global.config.luosimao.smsUrl, content, {
    auth: { username: 'api', password: 'key-' + global.config.luosimao.password },
  }).catch((e) => { console.log(e) })
  return res
}
router.post('/', async (ctx) => {
  const res = await sendSms()
  console.log(res.data)
  ctx.body = res.data
})
export default router