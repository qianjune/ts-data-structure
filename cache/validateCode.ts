/**
 * @description 验证码处理类
 */
import bcrypt from "bcryptjs";
import EncryptBox from "@src/utils/encrypt_box";
import { get, set, del } from "./_redis";

interface ValidateCodeProps {
  user: string | number;
  key: string;
  code: string | number;
}

class ValidateCodeModel {
  static _buildSaveKey(user: string | number, key = "common"): string {
    return `${user}_${key}`;
  }
  static async saveCode({
    user,
    key,
    code,
  }: ValidateCodeProps): Promise<{ token: string }> {
    console.log("saveCode", code);
    const saveKey = this._buildSaveKey(user, key);
    const token = EncryptBox.buildEncryptCode(saveKey.toString());
    const encryptyCode = EncryptBox.buildEncryptCode(code.toString());
    set(`${saveKey}_token`, token, 60 * 60);
    set(saveKey, encryptyCode, 60 * 60);
    return { token };
  }
  static async validateCode({
    user,
    code,
    key,
  }: ValidateCodeProps): Promise<boolean> {
    const saveKey = this._buildSaveKey(user, key);
    console.log(saveKey, "saveKey");
    const savedCode = await get(saveKey);
    // const result = (savedCode || '').toString() === code.toString()
    const result = EncryptBox.validateEncryptCode(
      code.toString(),
      (savedCode || "").toString()
    );
    console.log(result);
    if (result) {
      // 如果验证成功后，把之前保存的验证码删除
      // await del(saveKey)
    }
    return result;
  }
}

export { ValidateCodeModel };
