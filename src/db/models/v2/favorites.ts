/**
 * @description FavoritesDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
export enum FavoritesItemType {
  SHOP = 'shop',
  GOODS = 'goods'
}
class FavoritesDb extends Model { }

FavoritesDb.init({
  id: {
    type: TYPES.INTEGER,
    comment: 'id',
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: TYPES.STRING,
    comment: '收藏的类型',
    allowNull: false
  },
  likeId: {
    type: TYPES.INTEGER,
    comment: "收藏的id",
    allowNull: false
  },
  userId: {
    type: TYPES.INTEGER,
    comment: "用户id",
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'FavoritesDb'
})

FavoritesDb.sync({
  alter: true
})

export default FavoritesDb