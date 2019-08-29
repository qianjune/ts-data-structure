import Router from 'koa-router'
import Blog from '../../models/blog'
import { BlogValidator } from '../../validators/validator'

const router = new Router({
  prefix: '/v1/blog'
})

router.post('/create', (ctx) => {
  const v = new BlogValidator().validate(ctx)
})

export default router