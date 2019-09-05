import Router from 'koa-router'
import Product from '../../models/product'
import Auth from '../../../middleware/auth'
import { ProductValidator } from '../../validators/product'
import { success } from '../../lib/common'

const router = new Router({
  prefix: '/v1/product'
})

router.post('/create', new Auth().m, async (ctx) => {
  const v = await new ProductValidator().validate(ctx)

  const product = {
    name: v.get('body.name'),
    price: v.get('body.price'),
    desc: v.get('body.desc'),
    belong: ctx.auth.uid
  }
  await Product.create(product)
  success()
})

router.get('/list',new Auth().m,async(ctx)=>{
  const blogs = await Product.findAll()
  ctx.body = {
    data:blogs
  }
})

export default router