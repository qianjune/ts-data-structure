import Router from 'koa-router'

const router = new Router({
  prefix: '/v2/swagger-schema'
})

router.get('/', (ctx) => {
  ctx.body = global.swagger.schema
})
export default router