/**
 * @description
 */

const ResponseMsg = (placeholder: string) => (
  {
    "FAIL_BY_NAME_OCCUPIED": `创建${placeholder}失败，${placeholder}名已被占用`,
    "FAIL": `创建${placeholder}失败，请稍后再试`,
    "SUCCESS": `创建${placeholder}成功`
  }
)

class ManagerResponse {
  data: any
  success: boolean
  msg: string
  constructor({ success = false, data = null, msg = '' }: { success: boolean; msg?: string; data?: any }) {
    this.data = data
    this.success = success
    this.msg = msg
  }
}

export {
  ManagerResponse,
  ResponseMsg
}