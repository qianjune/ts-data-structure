import nodemailer from "nodemailer";
import { ValidateCodeModel } from "@root/cache/validateCode";
import { CodeBuilder } from "@root/cache/codeBuilder";
import { ManagerResponse, ManagerResponseSuccess } from "@src/manager/response";
import { CodeManagerInterface } from "./sms";

class EmailModel implements CodeManagerInterface {
  async sendCode(
    user: string | number,
    type: string
  ): Promise<ManagerResponse<any>> {
    const transporter = nodemailer.createTransport({
      service: "qq",
      port: 465,
      secure: false,
      auth: {
        user: "3190741842@qq.com",
        pass: "rzjcjyylhfqadeje",
      },
    });
    const code = CodeBuilder.buildValidateCode();
    const email = user?.toString();
    const info = await transporter.sendMail({
      from: "3190741842@qq.com",
      to: email,
      // to: 'qjhj8ftn@gmail.com',
      // to: '418694294@qq.com',
      subject: "hello",
      // text: code + '[验证码]',
      html: `<b>${code}[验证码]</b>`,
    });
    // if (info.response.starWith('250')) {
    console.log("进入这里");
    const result = await ValidateCodeModel.saveCode({ user, key: type, code });
    // }
    console.log(info.messageId);

    return new ManagerResponseSuccess({
      msg: "邮箱验证码发送成功",
      data: result,
    });
  }
  async validateCode(
    user: string | number,
    type: string,
    code: string,
    token?: string
  ): Promise<ManagerResponse<any>> {
    const result = await ValidateCodeModel.validateCode({
      user,
      key: type,
      code,
      token,
    });
    return new ManagerResponse({
      success: result,
      msg: result ? "验证成功" : "验证失败",
    });
  }
}

export { EmailModel };
