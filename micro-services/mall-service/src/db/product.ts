/**
 * @description 商品 - sku
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { mysqlArrayStringHandler, mysqlJsonHandler } from "@src/lib/common";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
@Table({
  sequelize,
  tableName: "product",
})
class Product extends Model {
  static ONLINE = 1;
  static OFFLINE = 0;

  @Column({
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
  })
  name: string;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "产品主图",
  })
  mainImage: string;
  //一般分两种情况：
  //1、只是显示，不做复杂的查询，集中存放在一个文本字段内，用逗号分隔就行，JSON感觉有点大材小用。
  //2、需要做统计分析，如SF上的问题TAG，需要做很多分类统计，比较合理的方案是新建一张问题和TAG的对应表。
  @Column({
    // mysql array的处理方式
    type: TYPES.STRING,
    get() {
      return this.getDataValue("images").split(";");
    },
    set(val: []) {
      this.setDataValue("images", val.join(";"));
    },
    defaultValue: "",
  })
  images: string;
  @Column({
    type: TYPES.STRING,
  })
  desc: string;
  @Column({
    type: TYPES.FLOAT,
    defaultValue: 9999999999,
  })
  price: number;
  @Column({
    type: TYPES.TEXT,
    comment: "sku 价格",
    allowNull: false,
    ...mysqlJsonHandler("skuGroup"),
  })
  skuGroup: string;
  @Column({
    // 优惠
    type: TYPES.FLOAT,
    defaultValue: 1,
  })
  offer: number;
  @Column({
    /**
     * 创建时的信息要包含sku和价格
     * 上架时需要再多包含库存信息
     */
    type: TYPES.INTEGER,
    allowNull: false,
    defaultValue: 1, // 之后删除
  })
  shopId: number;
  @Column({
    type: TYPES.STRING,
    allowNull: true,
    comment: "所属的分类",
  })
  belong: string;
  @Column({
    type: TYPES.STRING,
    comment: "sku的销售状态",
    defaultValue: Product.OFFLINE,
  })
  status: string;
  @Column({
    type: TYPES.STRING,
    comment: "spu识别码（不一定会用）",
  })
  code: string;
  // brandId: {
  //   type: TYPES.INTEGER,
  //   comment: '品牌id'
  // },
}

init(Product);
Product.sync({
  // alter: true,
  // force: true
});

export default Product;
