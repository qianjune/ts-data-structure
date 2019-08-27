import { Sequelize, Model } from 'sequelize'
import sequelize from '../../core/db'

class User extends Model {

}

User.init(
  {
    id: {

    },
    tel: {

    },
    nickName: {

    },
    password: {

    },
    birthday: {

    },
    openid: {

    }
  },
  {
    sequelize,
    tableName: 'user'
  }
)

export default User