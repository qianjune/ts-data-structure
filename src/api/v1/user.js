import Router from 'koa-router'
import User from '../../models/user'
import { RegisterValidator } from '../../validators/validator'
import { success } from '../../lib/common'
const router = new Router({
  prefix: '/v1/user'
})

router.post('/register', async (ctx) => {
  const v = await new RegisterValidator().validate(ctx)
  const userData = {
    tel: v.get('body.tel'),
    password: v.get('body.password'),
  }

  await User.create(userData)


  success()
})

export default router