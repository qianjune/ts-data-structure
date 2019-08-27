import Router from 'koa-router'

const router = new Router({
  prefix: '/v1/test'
})

router.get('/', (ctx) => {
  console.log('进入')
  ctx.body = {
    success: true
  }
})

export default router