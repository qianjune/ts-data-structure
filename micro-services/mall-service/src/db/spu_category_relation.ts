/**
 * @description 分类 和 spu 关系表
 */

// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { Product, ProductCategory } from "@src/db/models";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
@Table({
  sequelize,
  tableName: "spuCategoryRelation",
})
class SpuCategoryRelation extends Model {
  @Column({
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "产品id",
    references: {
      model: Product,
      key: "id",
    },
  })
  spuId: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "分类id",
    references: {
      model: ProductCategory,
      key: "id",
    },
  })
  categoryId: number;
}

init(SpuCategoryRelation);

SpuCategoryRelation.sync({
  // alter: true,
});

export default SpuCategoryRelation;
