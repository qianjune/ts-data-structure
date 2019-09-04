import Sequelize, { Model, ExclusionConstraintError } from 'sequelize';
import { unset, clone, omit } from 'lodash'

const { dbName, port, user, password, host } = global.config.database
const sequelize = new Sequelize(dbName, user, password, {
  dialect: 'mysql',
  host,
  port,
  logging: true,
  timezone: '+08:00',//时区
  define: {
    // timestamps:false // create and update time
    paranoid: true, // delete time
    underscored: true, // 下划线命名
    scopes: {
      bh: {
        attributes: {
          // exclude: ['updatedAt', 'deletedAt', 'createdAt']
        }
      }
    }
  }
})
sequelize.sync({
  // force:true//删除原表并新增
})

Model.prototype.toJSON = function () {
  let data = clone(this.dataValues) // 存储的是原始的字符串
  unset(data, 'updatedAt')
  unset(data, 'createdAt')
  unset(data, 'deletedAt')
  console.log(data)
  // for (key in data) { // 这里key in有问题
  //   if (key === 'image') {
  //     // 处理图片的地址
  //   }
  // }
  if (Array.isArray(this.exclude)) {
    this.exclude.forEach(ex => {
      unset(data, ex)
    })
  }
  return data
}
Model.prototype.exclude = function (excludeProps) {
  if (Array.isArray(excludeProps)) {
    this.dataValues = omit(this.dataValues,excludeProps)
  }
  return this
}

export default sequelize