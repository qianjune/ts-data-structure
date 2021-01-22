/**
 * @description
 * mysql 字符串数组转换
 * JSON 数据转换
 */

const mysqlArrayStringHandler = (key) => {
  return {
    get() {
      return this.getDataValue(key).split(";");
    },
    set(val) {
      this.setDataValue(key, val.join(";"));
    },
  };
};
const mysqlJsonHandler = (key) => {
  return {
    get() {
      console.log("get触发");
      return JSON.parse(this.getDataValue(key));
    },
    set(val) {
      const handledData = JSON.stringify(val);
      console.log(handledData);
      this.setDataValue(key, handledData);
    },
  };
};
module.exports = { mysqlArrayStringHandler, mysqlJsonHandler };
