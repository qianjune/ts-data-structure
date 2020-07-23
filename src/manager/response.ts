/**
 * @description
 */

const ResponseMsg = (placeholder: string) => (
  {
    "CREATE_FAIL_BY_NAME_OCCUPIED": `创建${placeholder}失败，${placeholder}名已被占用`,
    "CREATE_FAIL": `创建${placeholder}失败，请稍后再试`,
    "CREATE_SUCCESS": `创建${placeholder}成功`,
    "FETCH_LIST_SUCCESS": `${placeholder}列表请求成功`
  }
)
interface ResponseInterface { success: boolean; msg?: string; data?: any }
class ManagerResponse {
  data: any
  success: boolean
  msg: string
  constructor({ success = false, data = null, msg = '' }: ResponseInterface) {
    this.data = data
    this.success = success
    this.msg = msg
  }
}
class ManagerResponseSuccess extends ManagerResponse {
  constructor({ data = null, msg = '' }: { data: any, msg: string }) {
    super({ success: true })
    this.data = data
    this.msg = msg
  }
}

class ListDataModel {
  data: any[]
  empty: boolean
  total: number

  constructor({ data = [], total = 0, pageNo = 1, pageSize = 10 }: {
    data: any[], total: number, pageSize: number
    pageNo: number
  }) {
    this.data = data
    this.empty = total < pageNo * pageSize
    this.total = total
  }
}

export {
  ManagerResponse,
  ManagerResponseSuccess,
  ResponseMsg,
  ListDataModel
}