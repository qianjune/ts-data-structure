import R from 'ramda'
import Product from '../models/product'

const fetchProduct = product => Product.findOne({
  where: {
    id: product.id
  }
})
const asyncMap = R.curry(async (func, data) => {
  const result = []
  for (const d of data) {
    result.push(await func(d))
  }
  return result
})
const prAll = async ps => await Promise.all(ps)

class OrderService {
  async fetchList(orders) {
    // const productLoop = async products => R.pipe(
    //   R.map(fetchProduct),
    //   prAll,
    // )(products)
    const productLoop = async products => {
      return asyncMap(fetchProduct, products)
    }
    const orderLoop = async (order) => {
      const products = await productLoop(order.products)
      order.setDataValue('products', products)
      return order
    }
    return await asyncMap(orderLoop, orders)
    // return asyncMap(await productLoop, orders)
  }
}
// for (var i = 0; i < orders.length; i++) {
//   const order = orders[i]
//   order.setDataValue('products', await asyncLoop(order.products))
//   orders[i] = order
// }
// ctx.body = {
//   data: orders
// }
export default OrderService