/**
 * @description 
 * mysql 字符串数组转换
 * JSON 数据转换
 */



const mysqlArrayStringHandler = (key) => {
  return {
    get() {
      return this.getDataValue(key).split(';')
    },
    set(val) {
      this.setDataValue(key, val.join(';'))
    },
  }
}
const mysqlJsonHandler = (key) => {
  return {
    get() {
      return JSON.parse(this.getDataValue(key))
    },
    set(val) {
      this.setDataValue(key, JSON.stringify(val))
    }
  }
}
module.exports = { mysqlArrayStringHandler, mysqlJsonHandler }