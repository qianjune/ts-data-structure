/**
 * @description 封装 Sequelize 数据类型
 * @author June
 */

import Sequelize from 'sequelize'

export default {
  STRING: Sequelize.STRING,
  DECIMAL: Sequelize.DECIMAL,
  TEXT: Sequelize.TEXT,
  INTEGER: Sequelize.INTEGER,
  BOOLEAN: Sequelize.BOOLEAN
}