/**
 * @description 店铺db模型
 */

// import { Model } from "sequelize";
import { TYPES } from "@src/db/types";
import sequelize from "@root/core/db";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "shop",
})
class ShopModel extends Model {
  @Column({
    type: TYPES.INTEGER,
    comment: "店铺id",
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @Column({
    type: TYPES.STRING,
    comment: "店铺名称",
    allowNull: false,
  })
  name: string;
  @Column({
    type: TYPES.STRING,
    comment: "店铺logo",
    defaultValue: "",
  })
  logo: string;
}
init(ShopModel);
ShopModel.sync({
  alter: true,
}).catch(sequelizeErrHandler);
export default ShopModel;
