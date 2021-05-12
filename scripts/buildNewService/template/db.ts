/**
 * @description cname 数据库模型
 */
import sequelize from "@root/core/db";
import { TYPES } from "@src/db/types";
import { sequelizeErrHandler } from "@src/utils/error_handler";
import { Column, Table, Model, init } from "@src/lib/sequelize-ts";

@Table({
  sequelize,
  tableName: "xXXXXX",
})
class XXXXXX extends Model {
  // custom property here
  @Column({
    type: TYPES.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    comment: "主键id",
  })
  id: number;
}

init(XXXXXX);

XXXXXX.sync({
  alter: true,
}).catch(sequelizeErrHandler);

export default XXXXXX;
