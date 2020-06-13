import { CODE_ACTION_PATH } from '@src/enum';
import { EmailModel } from '../manager/code/email';
import Sms from '../manager/code/sms';

class CodeModel {
  sendCode({ user, key, path }: { user: string; key: string; path: string }) {
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