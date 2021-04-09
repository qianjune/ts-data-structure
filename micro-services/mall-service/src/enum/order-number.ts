/**
 * @description 订单相关数组含义
 */

import dayjs from "dayjs";

// platformNumber + 商务类型 + 时间戳 + 用户信息
const PlatformNumber: { [keyName: string]: string } = {
  WEAPP: "01",
  WEB: "02",
  RN: "03",
  SWAN: "04",
  ALIPAY: "05",
  TT: "06",
  QQ: "07",
  JD: "08",
};
const PayPathNumber: { [keyName: string]: string } = {
  WECHAT: "01",
  ALIPAY: "02",
  OTHER: "03",
};
class OrderNumberBuilder {
  static _buildPlatformNumber(platform: string): string {
    return PlatformNumber[platform];
  }
  static _buildPayPathNumber(platform: string): string {
    return PayPathNumber[platform];
  }
  static _buildBusinessTypeNumber() { }
  static _buildUserIdEncryNumber(userInfo: {
    id: number;
    createdAt: string;
    [keyName: string]: any;
  }): string {
    const { id, createdAt } = userInfo;
    // 用户id+注册时间 取4位
    const combineStr = (dayjs(createdAt).unix() + id).toString();
    return combineStr.slice(combineStr.length - 4, combineStr.length);
  }
  static _buildTwoDigitsNumber(): string {
    return Math.floor(Math.random() * 90 + 10).toString();
  }
  static _timestampBuilder(): string {
    return dayjs().unix().toString();
  }
  static buildProductOrderNumber(data: {
    platform: string;
    userInfo: {
      id: number;
      createdAt: string;
      [keyName: string]: any;
    };
  }): string {
    const { platform, userInfo } = data;
    return (
      this._timestampBuilder() +
      this._buildTwoDigitsNumber() +
      this._buildPlatformNumber(platform) +
      this._buildUserIdEncryNumber(userInfo)
    );
  }
  static buildPayOrderNumber(data: {
    orderCode: string;
    userInfo: {
      id: number;
      createdAt: string;
      [keyName: string]: any;
    };
    payPath: string;
  }): string {
    const { orderCode, userInfo, payPath } = data;
    return (
      orderCode +
      this._buildPayPathNumber(payPath) +
      this._buildUserIdEncryNumber(userInfo)
    );
  }
}
export { OrderNumberBuilder };
