import Sequelize, { Model, ExclusionConstraintError } from "sequelize";
import { unset, clone, omit, difference } from "lodash";
import config from "@root/config/config";
import PQueue from "p-queue";
const { dbName, port, user, password, host } = config.database;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Sequelize
const sequelize = new Sequelize(dbName, user, password, {
  dialect: "mysql",
  host,
  port,
  logging: false, // sql语句是否打印到控制台
  timezone: "+08:00", //时区
  retry: {
    match: [Sequelize.ConnectionError],
  },
  define: {
    // timestamps:false // create and update time
    paranoid: true, // delete time
    underscored: true, // 下划线命名
    scopes: {
      bh: {
        attributes: {
          // exclude: ['updatedAt', 'deletedAt', 'createdAt']
        },
      },
    },
  },
});
// sequelize.queue = new PQueue({
//   concurrency: sequelize.connectionManager.pool.maxSize - 1,
// });
// export const inTransaction = (fn) =>
//   sequelize.queue.add(async () => {
//     const t = await sequelize.transaction({ autocommit: true });
//     return await fn(t);
//   });
sequelize.sync({
  // force:true//删除原表并新增
});
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: toJSON
Model.prototype.toJSON = function (config?: { timeAttributes?: string[] }) {
  console.log(this?.dataParseAttribute, "dataParseAttribute...");
  const data = clone(this.dataValues); // 存储的是原始的字符串
  console.log(config, "config...");
  const delAttributes = difference(
    ["updatedAt", "createdAt", "deletedAt"],
    [...(this.attributes || []), ...(config?.timeAttributes || [])]
  );
  if (
    Array.isArray(this?.dataParseAttribute) &&
    this.dataParseAttribute.length > 0
  ) {
    this.dataParseAttribute.forEach((attr: string) => {
      data[attr] = JSON.parse(data[attr]);
    });
  }
  console.log(delAttributes, "delAttributes...");
  delAttributes.forEach((delAttribute) => {
    unset(data, delAttribute);
  });

  // for (key in data) { // 这里key in有问题
  //   if (key === 'image') {
  //     // 处理图片的地址
  //   }
  // }
  if (Array.isArray(this.exclude)) {
    this.exclude.forEach((ex: any) => {
      unset(data, ex);
    });
  }
  console.log(data, "data...");
  return data;
};
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: exclude
Model.prototype.exclude = function (excludeProps) {
  if (Array.isArray(excludeProps)) {
    this.dataValues = omit(this.dataValues, excludeProps);
  }
  return this;
};

export default sequelize;
