import Router from 'koa-router'
import Auth from '@root/middleware/auth'
import {
  ShoppingCartValidator, PositiveIntegerValidator
} from '../../validators/validator'
import ShoppingCart from '@src/models_discard/shoppingCart'
import {
  success
} from '@src/lib/common'
import {
  Product
} from '@src/db/models'

const shoppingCartModel = new ShoppingCart()
const router = new Router({
  prefix: '/v1/shoppingCart'
})

router.post('/product/add', new Auth().m, async (ctx) => {
  const v = await new ShoppingCartValidator().validate(ctx)
  const productId = v.get('body.productId')
  const uid = ctx.auth.uid
  await shoppingCartModel.handleProduct(productId, uid, ShoppingCart.ACTION_TYPE.ADD)
  success()
})
router.post('/product/reduce', new Auth().m, async (ctx) => {
  const v = await new ShoppingCartValidator().validate(ctx)
  const productId = v.get('body.productId')
  const uid = ctx.auth.uid
  await shoppingCartModel.handleProduct(productId, uid, ShoppingCart.ACTION_TYPE.REDUCE)
  success()
})
router.post('/product/del', new Auth().m, async (ctx) => {
  const v = await new ShoppingCartValidator().validate(ctx)
  const productId = v.get('body.productId')
  const uid = ctx.auth.uid
  await shoppingCartModel.handleProduct(productId, uid, ShoppingCart.ACTION_TYPE.DEL)
  success()
})

const asyncLoop = async (products) => {
  const productGroup = []
  const productIds = Object.keys(products)
  for (const key of productIds) {
    const product = await Product.findOne({
      where: {
        id: key
      }
    })
    productGroup.push(product.exclude(['belong', 'status']).toJSON())
  }

  return productGroup
}
router.get('/:id/detail', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const shoppingCart = await ShoppingCart.findOne({
    where: {
      id: v.get('path.id')
    }
  })
  if (!shoppingCart) {
    throw new global.errs.HttpException('不存在次购物车信息')
  }

  const productGroup = await asyncLoop(shoppingCart.products)
  ctx.body = {
    data: productGroup
  }
})

export default router 