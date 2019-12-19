/** 
 * @description 权益包 表
 */

import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class RightPackage extends Model { }

RightPackage.init({
  name: {
    comment: '权益包名字'
  },
  levelId: {
    comment: '等级id'
  }
})