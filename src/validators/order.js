import { LinValidator, Rule } from '../../core/lin-validator-v2'

const checkProducts = (data) => {
  if (Array.isArray(data) &&
    data.length > 0) {

  }
}

class OrderValidator extends LinValidator {
  constructor() {
    super()
    this.belong = [
      new Rule('isLength', '不能为空', { min: 1 })
    ]
  }
  async validateProducts(vals) {
    const products = vals.body.products

  }
}

export default OrderValidator