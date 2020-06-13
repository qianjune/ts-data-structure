import Router from 'koa-router'
import Blog from '@src/models/blog'
import { BlogValidator, PositiveIntegerValidator, PaginationValidator } from '../../validators/validator'
import { success, paginationParamsTransform } from '@src/lib/common'
import Auth from '@root/middleware/auth'
import { BlogType } from '@src/lib/enum'


const router = new Router({
  prefix: '/v1/blog'
})

const formatContent = (content, type) => {
  let result = content
  switch (type) {
    case BlogType.MARKDOWN:
      result = content.replace('↵', '\n')
      break;
    default:
      break;
  }
  return result
}

router.post('/create', new Auth().m, async (ctx) => {
  const v = await new BlogValidator().validate(ctx)
  const type = v.get('body.type')
  const blog = {
    author: ctx.auth.uid,
    title: v.get('body.title'),
    likeNum: 0,
    content: formatContent(v.get('body.content'), type),
    type
  }
  await Blog.create(blog)
  success()
})

router.get('/:id/detail', async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const blog = await new Blog().getDetail(v.get('path.id'))
  ctx.body = blog
})
router.post('/:id/edit', new Auth().m, async (ctx) => {
  const query = await new PositiveIntegerValidator().validate(ctx)
  let body = await new BlogValidator().validate(ctx)
  const blog = await new Blog().getDetail(query.get('path.id'))
  body = body.get('body')
  Object.keys(body).forEach(key => {
    blog.setDataValue(key, body[key])
  })

  blog.save()
  success()
})
router.get('/list', async (ctx) => {
  const v = await new PaginationValidator().validate(ctx)
  const blogs = await Blog.findAll(paginationParamsTransform({ page: v.get('query.page'), pageSize: v.get('query.pageSize') }))
  ctx.body = {
    data: blogs
  }
})
export default router