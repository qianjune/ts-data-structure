/**
 * @description 我的浏览记录 数据模型
 * 之后需要对处理删除浏览记录，及浏览次数做纪律，请求可以前端发，也可以统计请求后端自己做处理
 * shopId和productId之后可以换掉
 */

import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
enum BrowseRecordStatus {
  DISABLE = 1,
  ABLE = 0
}
class BrowseRecords extends Model {

}

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
  disabled: {
    type: TYPES.INTEGER,
    comment: '是否启用（创建时为able,之后删除浏览记录就修改这个属性，不会真的删除，方便日后推荐',
    defaultValue: BrowseRecordStatus.ABLE,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'BrowseRecord'
})

BrowseRecords.sync({
  alter: true
})

export default BrowseRecords;