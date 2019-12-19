import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { STRING, INTEGER, DECIMAL } = types

class RightsRelation extends Model {

}

RightsRelation.init({
  packageId: {
    comment:'权益包id'
  },
  rightId: {
    comment:'权益id'
  }
})
