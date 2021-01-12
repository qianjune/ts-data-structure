/**
 * old - 订单校验
 */
import { LinValidator, Rule } from '../../core/lin-validator-v2'
import Joi from '@hapi/joi'

const schema = Joi.array().items(Joi.object().keys({
  id: Joi.string().min(1).required(),
  amount: Joi.number().required()
})).min(1).required()

class OrderValidator extends LinValidator {
  constructor() {
    super()
    this.belong = [
      new Rule('isLength', '不能为空', { min: 1 })
    ]
  }
  async validateProducts(vals) {
    const products = vals.body.products
    const result = schema.validate(products)
    if (result.error) {
      console.log(result.error)
      throw new Error('products参数不合法')
    }
  }
}
export class OrderPayValidator extends LinValidator {
  constructor() {
    super()
    this.id = [
      new Rule('isNumeric', 'id不合法')
    ]
    this.sum = [
      new Rule('isNumeric', '总价不合法')
    ]
  }
}
export default OrderValidator