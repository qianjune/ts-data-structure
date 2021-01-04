/**
 * @description 我的浏览记录 数据模型
 */

import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class BrowseRecords extends Model { }

BrowseRecords.init({
  id: {
    type: TYPES.INTEGER,
    comment: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  uid: {
    type: TYPES.INTEGER,
    comment: "用户id",
    allowNull: false
  },
  shopId: {
    type: TYPES.INTEGER,
    comment: '店铺id',
  },
  productId: {
    type: TYPES.INTEGER,
    comment: '商品id',
  },
}, {
  sequelize,
  tableName: 'BrowseRecord'
})

BrowseRecords.sync({
  alter: true
})

export default BrowseRecords;