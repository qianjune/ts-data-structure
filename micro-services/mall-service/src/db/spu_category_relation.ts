/**
 * @description 分类 和 spu 关系表
 */

import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { Product, ProductCategory } from "@src/db/models";

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
    spuId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "产品id",
      references: {
        model: Product,
        key: "id",
      },
    },
    categoryId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "分类id",
      references: {
        model: ProductCategory,
        key: "id",
      },
    },
  },
  {
    sequelize,
    tableName: "spuCategoryRelation",
  }
);

SpuCategoryRelation.sync({
  // alter: true,
});

export default SpuCategoryRelation;
