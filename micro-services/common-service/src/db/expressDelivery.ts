/**
 * @description 快递物流服务 数据库模型
 */
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "expressDelivery",
})
class ExpressDelivery extends Model {
  // custom property here
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
}

init(ExpressDelivery);

ExpressDelivery.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default ExpressDelivery;
