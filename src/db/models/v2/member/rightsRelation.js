import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
const { STRING, INTEGER, DECIMAL } = TYPES

class RightsRelation extends Model {

}

RightsRelation.init({
  packageId: {
    type: INTEGER,
    comment: '权益包id'
  },
  rightId: {
    type: INTEGER,
    comment: '权益id'
  },
  weight: {
    type: INTEGER,
    comment: "权重"
  }
}, {
  sequelize,
  tableName: 'rightRelation'
})
RightsRelation.sync({
  alter: true
})

export default RightsRelation
