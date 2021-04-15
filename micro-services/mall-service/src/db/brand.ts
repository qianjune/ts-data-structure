/**
 * @description 商品-品牌-表
 */

// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "productBrand",
})
class ProductBrand extends Model {
  @Column({
    type: TYPES.INTEGER,
    comment: "品牌id",
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "品牌名",
  })
  name: string;
  @Column({
    type: TYPES.STRING,
    comment: "品牌logo",
  })
  logo: string;
  @Column({
    type: TYPES.STRING,
    comment: "品牌描述",
  })
  desc: number;
  @Column({
    type: TYPES.INTEGER,
    comment: "关联的店铺id",
  })
  shopId: number;
}

init(ProductBrand);

ProductBrand.sync({ alter: true });
export default ProductBrand;
