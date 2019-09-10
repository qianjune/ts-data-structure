import Router from 'koa-router'
import axios from 'axios'
const router = new Router({
  prefix: '/v1/test'
})

router.get('/', async (ctx) => {
  const res1 = await axios('http://test-operator.app.ichint.com/api/bifrost/industry/category/list/769')
  const res2 = await axios('http://test-operator.app.ichint.com/api/promotion/auth/preDiscount/list/authCategory?authorizedId=171')
  ctx.body = {
    data:{
      tree:res1.data,
      auth:res2.data 
    },
    success: true
  }
})

export default router