/**
 * @description 支付订单 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

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
    amount: {
      type: TYPES.FLOAT,
      allowNull: false,
      comment: "需要支付的金额",
    },
    status: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "支付订单的状态",
      defaultValue: "unpaid",
    },
    orderNumber: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "商品订单号",
    },
    // 支付订单号 = 商品订单号 + 时间戳
    payNumber: {
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
