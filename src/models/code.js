import { CODE_ACTION_PATH } from '../enum';
import { EmailModel } from './code/email';
import Sms from './code/sms';

class CodeModel {
  sendCode({ user, key, path }) {
    const combineKey = `${path}_${key}`
    if (path === CODE_ACTION_PATH.EMAIL) {
      return EmailModel.sendEmail(user, combineKey)
    } else if (path === CODE_ACTION_PATH.MOBILE) {
      return Sms.sendSms(user, combineKey)
    } else {
      // 请填写正确的path
    }
  }
}

export {
  CodeModel
}