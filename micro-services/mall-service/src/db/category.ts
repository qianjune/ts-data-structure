/**
 * @description 商品-分类-表
 */

// import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

export enum CategoryStatus {
  DISABLE = 0,
  ABLE = 1,
}
@Table({
  sequelize,
  tableName: "productCategory",
})
class ProductCategory extends Model {
  @Column({
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "分类id",
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "分类名称",
  })
  name: string;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "父级分类id",
  })
  parentId: number;
  @Column({
    type: TYPES.STRING,
    comment: "分类所属的店铺",
  })
  shopId: string;
  @Column({
    type: TYPES.STRING,
    comment: "分类图标",
  })
  image: string;
  @Column({
    type: TYPES.INTEGER,
    comment: "启用状态",
    defaultValue: CategoryStatus.DISABLE,
  })
  status: number;
}

init(ProductCategory);
ProductCategory.sync({ alter: true });

export default ProductCategory;
