/**
 * @description 权限 表
 */
import { Model } from 'sequelize'
import sequelize from '../../../core/db'
import types from '../types'
const { INTEGER, STRING } = types

class Authority extends Model { }

Authority.init({
    id: {
        type: INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: STRING,
        unique: true
    },
    key: {
        type: STRING,
        unique: true
    }
}, {
    sequelize,
    tableName: 'authority'
})

export default Authority