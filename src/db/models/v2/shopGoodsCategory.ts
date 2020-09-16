/**
 * @description ShopGoodsCategoryDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
import { CategoryStatus } from './product/category'

class ShopGoodsCategoryDb extends Model { }

ShopGoodsCategoryDb.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "店铺商品分类id"
  },
  name: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '店铺商品分类名称'
  },
  shopId: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '店铺商品分类所属的店铺'
  },
  level:{
    type:TYPES.INTEGER,
    allowNull:false,
    comment:'层级'
  },
  parentId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '店铺商品分类父级分类id'
  },
  image: {
    type: TYPES.STRING,
    comment: '店铺商品分类图标'
  },
  status: {
    type: TYPES.INTEGER,
    comment: '店铺商品分类启用状态',
    defaultValue: CategoryStatus.DISABLE
  }
}, {
  sequelize,
  tableName: 'ShopGoodsCategoryDb'
})

ShopGoodsCategoryDb.sync({
  alter: true
})

export default ShopGoodsCategoryDb