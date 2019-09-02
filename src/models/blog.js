import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'

class Blog extends Model {
  async getDetail(id){
    const blog = await Blog.findOne({
      where: {
        id
      }
    })
    if(!blog){
      throw new Error('未查找到相应blog')
    }
    return blog
  }
}

Blog.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    author: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING,
    },
    title:{
      type: Sequelize.STRING,
    },
    type:{
      type: Sequelize.STRING,
    },
    likeNum: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    tableName: 'blog'
  }
)

export default Blog