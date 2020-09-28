/**
 * @description
 */

const ResponseMsg = (placeholder: string) => (
  {
    "COMMON_SUCCESS_INFO": '请求成功',
    "CREATE_FAIL_BY_NAME_OCCUPIED": `创建${placeholder}失败，${placeholder}名已被占用`,
    "CREATE_FAIL": `创建${placeholder}失败，请稍后再试`,
    "CREATE_SUCCESS": `创建${placeholder}成功`,
    "FETCH_LIST_SUCCESS": `${placeholder}列表请求成功`,
    "FETCH_LIST_FAIL": `${placeholder}列表请求失败`,
    "ITEM_NOT_FOUND": `该${placeholder}不存在`,
    "DELETE_SUCCESS": `删除${placeholder}成功`,
    "DELETE_FAIL": `删除${placeholder}失败，请稍后再试`,
    "DELETE_FAIL_BY_HAVE_LINKED_CHILD": `有关联子节点，删除${placeholder}失败`,
    "GET_DETAIL_SUCCESS": `获取${placeholder}详情成功`,
    "ADD_SUCCESS": `加入${placeholder}成功`,
    "ADD_FAIL": `加入${placeholder}失败`,
    "EDIT_SUCCESS":`${placeholder}编辑成功`,
    "EDIT_FAIL":`${placeholder}编辑失败`,
    // address begin
    "CITY_LIST_SUCCESS": `${placeholder}-市-列表请求成功`,
    "AREA_LIST_SUCCESS": `${placeholder}-区-列表请求成功`,
    "TOWN_LIST_SUCCESS": `${placeholder}-街道-列表请求成功`,
    "PROVINCE_LIST_SUCCESS": `${placeholder}-省-列表请求成功`,
    "ADDRESS_ALL_LIST_SUCCESS": `${placeholder}-省/地/县/乡-列表请求成功`,
    // address end
    // USER begin
    "RESET_USER_PASSWORD_SUCCESS": `${placeholder}重置账户密码成功`,
    // USER end
    // FAVORITES begin
    "HAVE_COLLECTED": `已收藏`,
    // MEMBER begin
    "CREATE_FAIL_BY_EXISTED": `${placeholder}已存在`
    // MEMBER end
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

class ManagerResponseFailure extends ManagerResponse {
  constructor({ data = null, msg = '' }: { data?: any, msg: string }) {
    super({ success: false })
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
  ManagerResponseFailure,
  ResponseMsg,
  ListDataModel
}