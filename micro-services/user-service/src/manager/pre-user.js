import bcrypt from "bcryptjs";
import { v1 as uuidv1 } from "uuid";
import { MemberController } from "@root/micro-services/member-service/src/manager";
import SmsForMini from "@src/manager/code/sms";
import { set } from "@root/cache/_redis";
import { User } from "@src/db/models";
const smsForMiniModel = new SmsForMini();

class UserController {
  /**
   * 手机登录
   * @param {Number} mobile 手机号
   * @param {String} password 密码/验证码
   * @param {String} type 登录类型
   */
  static async mobileLogin(mobile, password, type = "password") {
    const user = await User.findOne({
      where: { mobile },
    });
    // 短信登录验证

    if (type === "smsCode") {
      const result = await smsForMiniModel.validateSmsCode({
        mobile,
        key: "login",
        smsCode: password,
      });

      if (result) {
        if (user) {
          throw new global.errs.SuccessForMini();
        } else {
          const nickName = `${mobile}_${Date.now()}`;

          const result = await User.create({
            mobile,
            nickName,
            address: "",
            password: "",
          });
          console.log("快捷登录创建用户", result.getDataValue("id"));
          if (result.getDataValue("id")) {
            MemberController.addNewMember({
              userId: result.getDataValue("id"),
            });
          }
          throw new global.errs.SuccessForMini();
        }
      } else {
        throw new global.errs.HttpExceptionForMini("验证码错误");
      }
    }
    // 首次登录，注册
    if (!user) {
      const nickName = `${mobile}_${Date.now()}`;

      const result = await User.create({
        mobile,
        nickName,
        address: "",
        password: "",
      });
      console.log(result.data);
      throw new global.errs.SuccessForMini();
    } else {
      // 密码验证
      if (password) {
        console.log(password, user.getDataValue("password"));
        if (bcrypt.compareSync(password, user.getDataValue("password"))) {
          const token = uuidv1();
          set(`${mobile}_token`, token, 60 * 60);
          throw new global.errs.SuccessForMini({
            data: {
              token,
            },
          });
        } else {
          throw new global.errs.HttpExceptionForMini("账号或密码不正确");
        }
      }
    }
  }
  static async verifySmsCode(mobile, smsCode, type = "password") {
    const user = await User.findOne({
      where: {
        mobile,
      },
    });
    if (user) {
      const result = await smsForMiniModel.validateSmsCode({
        mobile,
        key: type,
        smsCode,
      });
      if (result) {
        // 生成 verifyToken redis
        const verifyToken = uuidv1();
        set(`${mobile}_verifyToken`, verifyToken);
        throw new global.errs.SuccessForMini({
          data: {
            verifyToken,
          },
        });
      } else {
        throw new global.errs.HttpExceptionForMini("验证码不正确");
      }
    } else {
      throw new global.errs.HttpExceptionForMini("账号不存在");
    }
  }
  static async editPassword(mobile, password, verifyToken) {
    const user = await User.findOne({
      where: {
        mobile,
      },
    });
    if (user) {
      // 验证 verifyToken
      // const redis_verifyToken = await get(`${mobile}_verifyToken`)
      // redis_verifyToken === verifyToken
      if (smsForMiniModel.validateSms(mobile, "verifyToken", verifyToken)) {
        user.password = password;
        await user.save();
        throw new global.errs.SuccessForMini();
      } else {
        throw new global.errs.HttpExceptionForMini("验证失败");
      }
    } else {
      throw new global.errs.HttpExceptionForMini("账号不存在");
    }
  }
  static async verifyTelAndPassword(mobile, password) {
    const user = await User.findOne({
      where: {
        mobile,
      },
    });
    if (!user) {
      throw new global.errs.AuthFailed("账户或密码不正确");
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      throw new global.errs.AuthFailed("账户或密码不正确");
    }
    return user;
  }
}

export { UserController };
