
const success = (msg, errCode) => {
  throw new global.errs.Success(msg, errCode)
}

const paginationParamsTransform = ({ page, pageSize }) => {
  const offset = pageSize * (page - 1)
  return {
    offset,
    limit: pageSize
  }
}

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
module.exports = { success, paginationParamsTransform, mysqlArrayStringHandler, mysqlJsonHandler }