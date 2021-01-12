/** 
 * @description 权益包 表
 */

import { Model } from 'sequelize'
import sequelize from '../../../../../core/db'
import { TYPES } from '../../../types'
const { STRING, INTEGER, DECIMAL } = TYPES

class RightPackage extends Model { }

RightPackage.init({
  name: {
    type: STRING,
    comment: '权益包名字'
  },
  levelId: {
    type: INTEGER,
    comment: '等级id'
  }
}, {
  sequelize,
  tableName: "rightPackage"
})

export default RightPackage