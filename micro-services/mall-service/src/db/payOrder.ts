/**
 * @description 支付订单 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

export enum PayOrderStatus {
  PENDING_PAYMENT = 0, // 待支付
  PAID = 1, // 已支付
  REFUNDING = 2, // 退款中

  REFUNDED = 3, // 已退款
}
@Table({
  sequelize,
  tableName: "payOrder",
})
class PayOrder extends Model {
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
  @Column({
    type: TYPES.FLOAT,
    allowNull: false,
    comment: "需要支付的金额",
  })
  totalPrice: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "支付订单的状态",
    defaultValue: 0,
  })
  status: string;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "商品订单号",
  })
  orderCode: string;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "商品订单id",
  })
  orderId: number;
  // 支付订单号 = 商品订单号 + 时间戳
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "支付订单号",
  })
  code: string;

  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "支付途径",
  })
  payPath: string;
}

init(PayOrder);

PayOrder.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default PayOrder;
