import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
const { STRING, INTEGER, DECIMAL } = TYPES;

class Address extends Model {
  // custom property here
}

Address.init(
  {
    id: {
      type: TYPES.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    memberId: {
      type: INTEGER,
      comment: "会员id",
      allowNull: false,
    },
    countryId: {
      type: STRING,
      allowNull: false,
      comment: "国家",
      defaultValue: "CN",
    },
    cityId: {
      type: STRING,
      allowNull: false,
      comment: "省",
    },
    provinceId: {
      type: STRING,
      allowNull: false,
      comment: "市",
    },
    areaId: {
      type: STRING,
      allowNull: false,
      comment: "区",
    },
    townId: {
      type: STRING,
      allowNull: false,
      comment: "街道",
    },
    address: {
      type: STRING,
      allowNull: false,
      comment: "地址",
    },
    postCode: {
      type: TYPES.STRING,
      comment: "邮编",
      defaultValue: "000000",
    },
    tel: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "联系电话",
    },
    receiver: {
      type: TYPES.STRING,
      allowNull: false,
      comment: "收件人",
    },
  },
  {
    sequelize,
    tableName: "address",
  }
);
Address.sync({
  alter: true,
});
export default Address;
