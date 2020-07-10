/**
 * @description
 */


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
  ManagerResponse
}