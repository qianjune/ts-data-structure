/**
 * @description OrderDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
import { mysqlJsonHandler } from '@src/lib/common'

class OrderDb extends Model { }

class GoodsItem {
  productId: number
  productName: string
  selectedSku: string
  amount: number
  constructor({ productId, productName, selectedSku, amount }: {
    productId: number, productName: string, selectedSku: string, amount: number
  }) {
    this.productId = productId
    this.productName = productName
    this.selectedSku = selectedSku
    this.amount = amount
  }

}

interface WantToBuyGoodsGroupInterface {
  data: {
    shopInfo: {
      id: number
      name: string
      logo: string
    },
    goodsGroup: {
      id: number
      name: string
      sku: string
      price: string
      amount: number
      mainImage: string
    }[]
  }[]
}



OrderDb.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '订单id'
  },
  userId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '用户id'
  },
  address: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '收获地址id（包含收件人及手机号）',
    ...mysqlJsonHandler('address')
  },
  goods: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '将购买的商品',
    ...mysqlJsonHandler('goods')
  },
  amount: {
    type: TYPES.FLOAT,
    allowNull: false,
    comment: '购物总数'
  },
  totalPrice: {
    type: TYPES.FLOAT,
    allowNull: false,
    comment: '购买总价'
  },
  status: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '支付状态',
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'order'
})

OrderDb.sync({
  alter: true
})

export default OrderDb