import { LinValidator, Rule } from '../../core/lin-validator-v2'

class ProductValidator extends LinValidator {
  constructor() {
    super()
    this.name = [
      new Rule('isLength', '不能为空', { min: 1 })
    ]
    this.desc = [
      new Rule('isLength', '不能为空', { min: 1 })
    ]
    this.price = [
      new Rule('isNumeric', '必须为数字')
    ]
  }
}

export { ProductValidator } 