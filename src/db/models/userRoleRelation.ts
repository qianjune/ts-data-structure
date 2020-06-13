/**
 * @description 用户-角色 关系表
 */

import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { INTEGER } = types

class UserRoleRelation extends Model { }

UserRoleRelation.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    uid: {
        type: INTEGER,
        unique: true
    },
    rid: {
        type: INTEGER,
        unique: true
    }
}, {
    sequelize,
    tableName: 'userRoleRelation'
})

export default UserRoleRelation