/**
 * @description 支付订单 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
export enum PayOrderStatus {
  PENDING_PAYMENT = 0, // 待支付
  PAID = 1, // 已支付
  REFUNDING = 2, // 退款中

  REFUNDED = 3, // 已退款
}
class PayOrder extends Model {
  // custom property here
}

PayOrder.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    totalPrice: {
      type: TYPES.FLOAT,
      allowNull: false,
      comment: "需要支付的金额",
    },
    status: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "支付订单的状态",
      defaultValue: 0,
    },
    orderCode: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "商品订单号",
    },
    orderId: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "商品订单id",
    },
    // 支付订单号 = 商品订单号 + 时间戳
    code: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "支付订单号",
    },
  },
  {
    sequelize,
    tableName: "payOrder",
  }
);

PayOrder.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default PayOrder;
