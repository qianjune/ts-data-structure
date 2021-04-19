/**
 * @description 安全名单 数据库模型
 */
// import { Model } from "sequelize";
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { mysqlJsonHandler } from "@src/lib/common";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

export enum SAFE_TYPE {
  WHITE = "white",
  BLACK = "black",
}
@Table({
  sequelize,
  tableName: "safeList",
})
class SafeList extends Model {
  // custom property here
  dataParseAttribute = ["keywordsList"];
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: string;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "黑名单还是白名单",
  })
  type: string;
  @Column({
    type: TYPES.TEXT,
    allowNull: false,
    comment: "名单内容",
    ...mysqlJsonHandler("keywordsList"),
  })
  keywordsList: string;
  @Column({
    type: TYPES.STRING,
    allowNull: false,
    comment: "名单名称",
  })
  name: string;
}

init(SafeList);

SafeList.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default SafeList;
