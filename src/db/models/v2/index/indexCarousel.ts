/**
 * @description IndexCarouselDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'

class IndexCarouselDb extends Model { }

IndexCarouselDb.init({
  id: {
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: '主键id'
  },
  image: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '轮播图'
  },
  to: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '跳转地址'
  },
  status: {
    type: TYPES.INTEGER,
    comment: '启用状态',
    defaultValue: 0
  },
  weights: {
    type: TYPES.INTEGER,
    comment: '排序权重',
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'IndexCarouselDb'
})

IndexCarouselDb.sync({
  alter: true
})

export default IndexCarouselDb