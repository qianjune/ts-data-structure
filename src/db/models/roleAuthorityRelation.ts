/**
 * @description 角色-权限 关系表
 */

import { Model } from 'sequelize'
import sequelize from '@root/core/db'
import { TYPES } from '@src/db/types'
const { INTEGER } = TYPES

class RoleAuthorityRelation extends Model { }

RoleAuthorityRelation.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  rid: {
    type: INTEGER,
  },
  aid: {
    type: INTEGER,
  }
}, {
  sequelize,
  tableName: 'roleAuthorityRelation'
})

export default RoleAuthorityRelation