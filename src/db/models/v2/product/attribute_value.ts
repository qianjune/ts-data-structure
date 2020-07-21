/**
 * @description sku 属性值
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class AttributeValue extends Model {

}

AttributeValue.init({
  id: {
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: '属性值的id'
  },
  value: {
    type: TYPES.STRING,
    allowNull: false,
    comment: '属性值的值'
  },
  keyId: {
    type: TYPES.INTEGER,
    allowNull: false,
    comment: '属性值所属的key'
  },
  weights: {
    type: TYPES.INTEGER,
    comment: '排序权重',
    defaultValue: 0
  }
}, {
  sequelize,
  tableName: 'attributeValue'
})

export default AttributeValue