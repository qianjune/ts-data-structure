import Router from 'koa-router'
import Blog from '../../models/blog'

const router = new Router({
  prefix: '/v1/blog'
})

router.post('/create', (ctx) => {

})

export default router