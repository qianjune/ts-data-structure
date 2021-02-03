import Router from "koa-router";
import {
  TokenValidator,
  TokenVerifyValidator,
} from "@src/validators/validator";
import { LoginType } from "@src/lib/enum";
import { User } from "@src/db/models";
import { generateToken } from "@root/core/util";
import Auth from "@root/middleware/auth";

const router = new Router({
  prefix: "/v1/token",
});

router.post("/", async (ctx) => {
  const v = await new TokenValidator().validate(ctx);
  let token;
  switch (v.get("body.type")) {
    case LoginType.USER_MOBILE:
      token = await telLogin(v.get("body.mobile"), v.get("body.password"));
      break;

    default:
      throw new global.errs.ParameterException("type不合法");
  }
  ctx.body = token;
});

router.post("/verify", async (ctx) => {
  const v = await new TokenVerifyValidator().validate(ctx);
  const result = await Auth.verifyToken(
    v.get("body.token"),
    global.config.security.secretKey
  );
  ctx.body = {
    result,
  };
});

router.post("/fresh", new Auth().m, async (ctx) => {
  const v = await new TokenVerifyValidator().validate(ctx);
  const result = await Auth.verifyToken(
    v.get("body.token"),
    global.config.refresh.secretKey
  );
  console.log(result);
  if (result) {
    const newToken = await genNewToken(result.userId, result.scope);
    ctx.body = newToken;
  } else {
    throw new global.errs.AuthFailed("freshToken未通过");
  }
});

const telLogin = async (mobile, password) => {
  const user = await User.verifyTelAndPassword(mobile, password);
  console.log(Auth.verifyToken);
  return genNewToken(user.id, Auth.USER);
};
const genNewToken = (id, scope) => {
  const { security, refresh } = global.config;

  const accessToken = generateToken(security.secretKey, security.expiresIn)(
    id,
    scope
  );
  const refreshToken = generateToken(refresh.secretKey, refresh.expiresIn)(
    id,
    scope
  );
  return {
    accessToken,
    refreshToken,
  };
};
export default router;
