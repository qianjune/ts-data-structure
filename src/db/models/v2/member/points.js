/**
 * @description 积分 变化 表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
const { STRING, INTEGER, DECIMAL } = TYPES;

class Points extends Model {
  // custom property here
}

Points.init(
  {
    num: {
      type: INTEGER,
      comment: "数值",
    },
    memberId: {
      type: INTEGER,
      comment: "会员id",
    },
    type: {
      type: STRING,
      comment: "变化方式（increase 增加，reduce 减少）",
    },
    currentSum: {
      comment: "当前积分总数",
      type: INTEGER,
    },
    pattern: {
      type: STRING,
      comment: "变化种类",
    },
    expired: {
      type: INTEGER,
      comment: "过期时长",
    },
  },
  {
    sequelize,
    tableName: "points",
  }
);

export default Points;
