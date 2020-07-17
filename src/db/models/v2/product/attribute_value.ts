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
    type: TYPES.INTEGER
  },
  value: {
    type: TYPES.STRING
  },
  keyId: {
    type: TYPES.INTEGER
  },
  weights: {
    type: TYPES.INTEGER,
    comment: '排序权重'
  }
}, {
  sequelize,
  tableName: 'attributeValue'
})