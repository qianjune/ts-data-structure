/**
 * @description res 的数据模型
 * @author June_end
 */

/**
  * 基础模型
  */
class BaseModel {
    constructor ({ errno, data, message }) {
        this.errno = errno
        if (data) {
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel {
    constructor (data = {}) {
        super({
            errno: 0,
            data
        })
    }
}

class ErrorModel extends BaseModel {
    constructor ({ errno, message }) {
        super({
            errno,
            message
        })
    }
}

export {
    BaseModel,
    SuccessModel,
    ErrorModel
}