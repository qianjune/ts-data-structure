/**
 * @description 分类 和 spu 关系表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";

class SpuCategoryRelation extends Model {
  // custom property here
}

SpuCategoryRelation.init(
  {
    id: {
      type: TYPES.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      comment: "主键id",
    },
    SpuId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "产品id",
    },
    categoryId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "分类id",
    },
  },
  {
    sequelize,
    tableName: "spuCategoryRelation",
  }
);

SpuCategoryRelation.sync({
  alter: true,
});

export default SpuCategoryRelation;
