/**
 * @description 角色-权限 关系表
 */

import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import { TYPES } from '../types'
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
        unique: true
    },
    aid: {
        type: INTEGER,
        unique: true
    }
}, {
    sequelize,
    tableName: 'roleAuthorityRelation'
})

export default RoleAuthorityRelation