/**
 * @description 逆向订单 数据库模型
 */
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
import { mysqlJsonHandler } from "@src/lib/common";

export enum RESERVE_ORDER_ACTION {
  RETURN = "00",
  EXCHANGE = "01",
  REFUND = "02",
}

@Table({
  sequelize,
  tableName: "reverseOrder",
})
class ReverseOrder extends Model {
  // custom property here
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;

  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "逆向订单号",
    defaultValue: "88888888888",
  })
  code: string;

  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "退回的商品",
    ...mysqlJsonHandler("goods"),
  })
  returnGoods: string;

  // 用户行为详情（理由，附件）
  // 处理的金额
  // 处理的log，包含环节和时间
  // 物流相关 （另外开个表）
  // 处理结果（包含 拒绝理由，最终处理的金额）

  // ####返回但不存在数据库里的数据
  // 行为
  // 卖家收件地址（存在店铺-仓储）
  // 正向订单信息
}

init(ReverseOrder);

ReverseOrder.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default ReverseOrder;
