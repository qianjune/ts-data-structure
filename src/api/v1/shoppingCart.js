import Router from 'koa-router'
import Auth from '../../../middleware/auth'
import { ShoppingCartValidator } from '../../validators/validator'
import ShoppingCart from '../../models/shoppingCart'
import { success } from '../../lib/common'

const router = new Router({
  prefix: '/v1/shoppingCart'
})
const productHandler = (productId) => {
  const result = []
  const product = {}
  product[productId] = 1
  result.push(JSON.stringify(product))
  return result
}
router.post('/add', new Auth().m, async (ctx) => {
  const v = await new ShoppingCartValidator().validate(ctx)
  const productId = v.get('body.productId')
  const uid = ctx.auth.uid
  const shoppingCart = await ShoppingCart.findOne({
    where: {
      belong: uid
    }
  })
  if (!shoppingCart) {
    await ShoppingCart.create({
      belong: uid,
      products: productHandler(productId)
    })
    success()
  }
  console.log(shoppingCart.getDataValue('products'))
})
export default router 