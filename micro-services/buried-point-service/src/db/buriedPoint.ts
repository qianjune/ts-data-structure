/**
 * @description 埋点 数据库模型
 */
import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";

interface BuriedPointData {
  who: string;
}

// 平台 enum
export enum BuriedPointPlatform {
  H5 = "H5",
  WEB = "WEB",
  ALIPAY = "ALIPAY",
  WECHAT = "WECHAT",
  IOS = "IOS",
  ANDROID = "ANDROID",
}

class BuriedPoint extends Model {
  // custom property here
}

// WHO: 用户（ID）(设备ID)
// WHEN：时间戳
// WHERE：位置、环境、场景（IP、国家、注册位置）
// WHAT：是什么（首页、详情页）
// HOW：维度特征（向前、向后）

BuriedPoint.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      comment: "主键id",
    },
    who: {
      type: TYPES.INTEGER,
      allowNull: false,
      comment: "用户（ID）(设备ID)",
    },
    when: {
      type: TYPES.INTEGER,
      comment: "时间戳",
      allowNull: false,
    },
    where: {
      type: TYPES.INTEGER,
      comment: "手机型号，用户定位",
    },
    how: {
      type: TYPES.INTEGER,
      comment: "维度特征（向前、向后）",
    },
    what: {
      type: TYPES.INTEGER,
      comment: "是什么（首页、详情页）",
    },
    platform: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "平台",
    },
  },
  {
    sequelize,
    tableName: "buriedPoint",
  }
);

BuriedPoint.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default BuriedPoint;
