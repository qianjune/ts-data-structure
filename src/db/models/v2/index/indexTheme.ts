/**
 * @description IndexThemeDb 数据库模型
 */
import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
import comment from '@src/api/v2/shop/comment'

class IndexThemeDb extends Model { }

IndexThemeDb.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键id"
  },
  title: {
    type: TYPES.STRING,
    allowNull: false,
    comment: "标题"
  },
  icon: {
    type: TYPES.STRING,
    comment: "图标"
  },
  key: {
    type: TYPES.STRING,
    allowNull: false,
    comment: "主键id"
  },
  goods: {
    type: TYPES.STRING,
    comment: "商品组",
    defaultValue: ''
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
  tableName: 'IndexThemeDb'
})

IndexThemeDb.sync({
  alter: true
})

export default IndexThemeDb