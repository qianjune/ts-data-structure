import Router from 'koa-router'
import Auth from '../../../middleware/auth'
import Order from '../../models/order'
import OrderValidator, { OrderPayValidator } from '../../validators/order'
import { success, paginationParamsTransform } from '../../lib/common'
import Product from '../../models/product'
import OrderService from '../../services/order'
import { PositiveIntegerValidator, PaginationValidator } from '../../validators/validator';

const router = new Router({
  prefix: '/v1/order'
})

// 创建订单的时候就应该把产品当时的状态clone一份，防止之后价格优惠更改，导致数据问题
router.post('/create', new Auth().m, async (ctx) => {
  const v = await new OrderValidator().validate(ctx)
  const order = {
    belong: v.get('body.belong'),
    products: v.get('body.products'),
    status: Order.WAIT_PAY
  }
  await Order.create(order)
  success()
})
router.post('/:id/pay', new Auth().m, async (ctx) => {
  const v = await new OrderPayValidator().validate(ctx)
  const order = await Order.findOne({
    where: {
      id: v.get('path.id')
    }
  })
  if (!order) {
    throw new global.errs.HttpException('没有此订单')
  }
  // 第三方支付

  order.setDataValue('status', Order.WAIT_SHIP)
  await order.save()
  success()
})

router.get('/list', new Auth().m, async (ctx) => {
  const v = await new PaginationValidator().validate(ctx)
  const orders = await Order.findAll({
    ...paginationParamsTransform({
      page: v.get('path.page'),
      pageSize: v.get('path.pageSize')
    })
  })
  ctx.body = {
    data: await new OrderService().fetchList(orders)
  }

})
router.del('/:id', new Auth().m, async (ctx) => { }) // 未支付的订单可以直接删除，支付后的只能软删除软删除

const asyncLoop = async (data) => {
  const productGroup = []
  for (const d of data) {
    const product = await Product.findOne({
      where: {
        id: d.id
      }
    })
    productGroup.push(product.exclude(['belong', 'status']))
  }
  console.log(productGroup[0].name)
  return productGroup
}
router.get('/:id/detail', new Auth().m, async (ctx) => {
  const v = await new PositiveIntegerValidator().validate(ctx)
  const order = await Order.findOne({
    where: {
      id: v.get('path.id')
    }
  })
  if (!order) {
    throw new global.errs.HttpException('不存在次订单')
  }

  order.setDataValue('products', await asyncLoop(order.products))
  ctx.body = {
    data: order
  }
})

export default router