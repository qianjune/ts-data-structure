/**
 * @description 短信相关 api
 * @author June_end
 */
import Router from "koa-router";
import Sms from "@src/manager/code/sms";
import {
  SendSmsValidator,
  ValidateSmsValidator,
} from "@src/validators/validator";
import { success } from "@src/lib/common";
const smsModel = new Sms();

const router = new Router({
  prefix: "/v1/sms",
});
router.post("/validate", async (ctx) => {
  const v = await new ValidateSmsValidator().validate(ctx);
  const mobile = v.get("body.mobile");
  const smsCode = v.get("body.smsCode");
  console.log(mobile, smsCode);
  const res = await smsModel.validateSmsCode({ mobile, smsCode });
  const { error } = res;
  console.log(res);
  if (error === 0) {
    success();
  } else {
    throw new global.errs.ParameterException();
  }
});
router.post("/sendCode", async (ctx) => {
  const v = await new SendSmsValidator().validate(ctx);
  const mobile = v.get("body.mobile");
  const res = await smsModel.sendSms(mobile);
  const { error, msg } = res.data;
  if (error === 0) {
    success();
  } else {
    throw new global.errs.ParameterException(msg, error);
  }
});
export default router;
