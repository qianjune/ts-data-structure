import Router from 'koa-router'

const router = new Router({
  prefix: '/v1/swagger-scheme'
})

router.get('/', (ctx) => {
  ctx.body = global.swagger.scheme
})
export default router