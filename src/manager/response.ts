/**
 * @description
 */


class ManageResponse {
    data: any
    success: boolean
    msg: string
    constructor(success: boolean, msg?: string, data?: any) {
        this.data = data || {}
        this.success = success || false
        this.msg = msg || ''
    }
}

export {
    ManageResponse
}