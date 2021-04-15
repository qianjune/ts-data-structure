/**
 * @description OrderDb 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { mysqlJsonHandler } from "@src/lib/common";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";
import { Select } from "@src/lib/converter-ts";
// import { Table, Column, Model } from "sequelize-typescript";
export enum OrderStatus {
  PENDING_PAYMENT = 0, // 待支付
  PAY_PROCESS = 1, // 进入支付订单的流程
  TO_BE_DELIVERED = 2, // 已发货
  TO_BE_RECEIVED = 3, // 已收获
  COMMENT = 4, // 待评价
}

class GoodsItem {
  productId: number;
  productName: string;
  selectedSku: string;
  amount: number;
  constructor({
    productId,
    productName,
    selectedSku,
    amount,
  }: {
    productId: number;
    productName: string;
    selectedSku: string;
    amount: number;
  }) {
    this.productId = productId;
    this.productName = productName;
    this.selectedSku = selectedSku;
    this.amount = amount;
  }
}

interface WantToBuyGoodsGroupInterface {
  data: {
    shopInfo: {
      id: number;
      name: string;
      logo: string;
    };
    goodsGroup: {
      id: number;
      name: string;
      sku: string;
      price: string;
      amount: number;
      mainImage: string;
    }[];
  }[];
}

@Table({
  tableName: "order",
  sequelize,
})
class OrderDb extends Model {
  @Column({
    type: TYPES.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    comment: "订单id",
  })
  id: number;
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "用户id",
  })
  userId: number;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "收获地址id（包含收件人及手机号）",
    ...mysqlJsonHandler("address"),
  })
  address: string;
  // 平台：这个以游戏举例，目前很多手游除了官方服务器外，还有一些是和其它平台比如小米、腾讯联合运营的，但是充值有可能是用的同一套，这种情况就很有必要在订单号中标记平台；下单渠道：目前很多电商产品都涵盖多平台，包括WEB、APP（Pad）和门店（比如1919和苏宁等），比如通过订单号发现近期反映的问题都来自于APP，则理论上可以推断出APP渠道有问题。
  // 支付渠道：如上文案例2所说，不同支付方式会遇到的问题也是不一样的，比如货到付款的刷卡支付仅POS机错误代码就几十项，而支付宝基本不会有这些。比如APP不支持公司转账，如果某订单有了代表公司转账的标识位，不用后台查询即可知道这是一笔来自WEB的订单等等。同样，用户反映该订单号无法使用红包，客服人员也可以通过支付渠道标识位来识别出是因为红包功能在APP上没有上线造成的；
  // 业务类型：以前在游戏行业的时候，我们一般会把订单号的某一位用来标识游戏名称，比如梦幻西游、魔兽世界和阴阳师分别用1、2、3来标识。这样遇到相关问题时，不用后台查询即可快速识别出问题并把其转给相关游戏团队。同理的还有零售和团购，自营订单和入驻商家订单，2B业务订单和2C业务订单；
  // 时间信息：有时间信息会让客服/ 运营人员看到订单时不需要经过后台查询即可知道该订单时哪天产生的，可以简单的判断问题的紧急程度。同时在B2B业务中，我们也可以根据该时间推算出大致的清分结算时间等等。所以我的建议是如果业务类型决定了客服类问题比较多，则有必要在订单号里面加上这个信息。但时间的完整格式2016年11月11日 11点22分33秒这样的显示出来就是20161111112233，年和时分秒信息略显多余，只记录月和日即可；
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "订单号（有含义）",
    defaultValue: "99999999999999",
    // https://www.zhihu.com/question/19805896 订单号规则
    // https://juejin.cn/post/6844904025872154638
  })
  code: string;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "将购买的商品",
    ...mysqlJsonHandler("goods"),
  })
  goods: string;
  @Column({
    type: TYPES.FLOAT,
    allowNull: false,
    comment: "购物总数",
  })
  amount: number;
  @Column({
    type: TYPES.FLOAT,
    allowNull: false,
    comment: "购买总价",
  })
  totalPrice: number;
  @Select({
    label: "状态",
    name: "status",
    customProps: {
      options: [
        {
          label: "待支付",
          value: "0",
        },
        {
          label: "已付款",
          value: "1",
        },
        {
          label: "已发货",
          value: "2",
        },
        {
          label: "已收货",
          value: "3",
        },
        {
          label: "待评价",
          value: "4",
        },
      ],
    },
  })
  @Column({
    type: TYPES.INTEGER,
    allowNull: false,
    comment: "支付状态",
    defaultValue: OrderStatus.PENDING_PAYMENT,
  })
  status: number;
}

init(OrderDb);
OrderDb.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default OrderDb;
