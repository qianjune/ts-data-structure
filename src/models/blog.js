import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'

class Blog extends Model {

}

Blog.init(
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true
    },
    author: {
      type: Sequelize.STRING
    },
    content: {
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