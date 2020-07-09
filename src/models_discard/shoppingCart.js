import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'
import { mysqlJsonHandler } from '../lib/common'
import { success } from '../lib/common'
const productHandler = (productId) => {
  const product = {}
  product[productId] = 1
  return product
}

class ShoppingCart extends Model {
  static ACTION_TYPE = {
    ADD: 'ADD',
    REDUCE: 'REDUCE',
    DEL: 'DEL'
  }
  async handleProduct(productId, uid, actionType) {
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
    const products = shoppingCart.products

    switch (actionType) {
      case ShoppingCart.ACTION_TYPE.ADD:
        if (products[productId]) {
          products[productId]++
        } else {
          products[productId] = 1
        }
        break;
      case ShoppingCart.ACTION_TYPE.REDUCE:
        if (products[productId]) {

          if (products[productId] > 1) {
            products[productId]--
          } else {
            delete products[productId]
          }
        } else {
          throw new Error('不存在此商品')
        }
        break;
      case ShoppingCart.ACTION_TYPE.DEL:
        if (products[productId]) { // 之后可以对0做一下处理
          delete products[productId]
        } else {
          throw new Error('不存在此商品')
        }
        break;
      default:
        break;
    }
    shoppingCart.products = products
    await shoppingCart.save()
  }
}

ShoppingCart.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // 采用 商品id:数量;的格式，或者新建一个表
    products: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: '',
      get() {
        return JSON.parse(this.getDataValue('products'))
      },
      set(val) {
        this.setDataValue('products', JSON.stringify(val))
      }
    },
    belong: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize,
    tableName: 'shoppingCart'
  }
)

export default ShoppingCart