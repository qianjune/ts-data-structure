import Router from 'koa-router'

const router = new Router({
  prefix: '/v1/test'
})

router.get('/', (ctx) => {
  ctx.body = {
    success: true
  }
})

export default router