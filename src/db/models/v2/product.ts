import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class Product extends Model {
  static ONLINE = 1
  static OFFLINE = 0
}

Product.init(
  {
    id: {
      type: TYPES.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: TYPES.STRING,
      allowNull: false
    },
    //一般分两种情况：
    //1、只是显示，不做复杂的查询，集中存放在一个文本字段内，用逗号分隔就行，JSON感觉有点大材小用。
    //2、需要做统计分析，如SF上的问题TAG，需要做很多分类统计，比较合理的方案是新建一张问题和TAG的对应表。
    images: { // mysql array的处理方式 
      type: TYPES.STRING,
      allowNull: false,
      get() {
        return this.getDataValue('images').split(';')
      },
      set(val: []) {
        this.setDataValue('images', val.join(';'))
      },
      defaultValue: ''
    },
    desc: {
      type: TYPES.STRING
    },
    price: {
      type: TYPES.FLOAT,
      defaultValue: 9999999999
    },
    offer: {
      // 优惠
      type: TYPES.FLOAT,
      defaultValue: 1
    },
    shopId: {
      type: TYPES.INTEGER,
      allowNull: false
    },
    belong: {
      type: TYPES.STRING
    },
    status: {
      type: TYPES.STRING,
      defaultValue: Product.OFFLINE
    }
  },
  {
    sequelize,
    tableName: 'product'
  }
)
Product.sync({ alter: true })

export default Product