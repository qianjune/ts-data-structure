import Router from 'koa-router'
import Auth from '../../../middleware/auth'
import Order from '../../models/order'
import OrderValidator from '../../validators/order'
import { success } from '../../lib/common'
const router = new Router({
  prefix: '/v1/order'
})

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
router.post('/edit', new Auth().m, async (ctx) => { })
router.get('/list', new Auth().m, async (ctx) => { })
router.del('/:id', new Auth().m, async (ctx) => { }) // 未支付的订单可以直接删除，支付后的只能软删除软删除
router.get('/:id/detail', new Auth().m, async (ctx) => { })

export default router