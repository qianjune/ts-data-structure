import Router from 'koa-router'
import Blog from '../../models/blog'
import { BlogValidator, PositiveIntegerValidator } from '../../validators/validator'
import { success } from '../../lib/common'
import Auth from '../../../middleware/auth'
import { BlogType } from '../../lib/enum'
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
  console.log('进入')
  const v = await new BlogValidator().validate(ctx)
  const type = v.get('body.type')
  console.log('type', type)
  const blog = {
    author: ctx.auth.uid,
    title: v.get('body.title'),
    likeNum: 0,
    content: formatContent(v.get('body.content'), type),
    type
  }
  console.log(blog)
  await Blog.create(blog)
  success()
})

router.get('/:id/detail', async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const blog = await new Blog().getDetail(v.get('path.id'))
  console.log(blog.dataValues)

  ctx.body = blog

})
router.post('/:id/edit', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const blog = await new Blog().getDetail(v.get('path.id'))
  blog.setDataValue('title','new title')
  blog.save()
  success()
})
router.get('/list', async (ctx) => {
  const blogs = await Blog.findAll({
    offset: 0,
    limit: 10
  })
  ctx.body = {
    data: blogs
  }
})
export default router