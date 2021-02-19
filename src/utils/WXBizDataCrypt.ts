import crypto from "crypto";
const algorithm = "aes-128-cbc";

class WXBizDataCrypt {
  appId = "";
  sessionKey = "";
  constructor(appId: string, sessionKey: string) {
    this.appId = appId;
    this.sessionKey = sessionKey;
  }
  decryptData(encryptedData: string, iv: string) {
    const sessionKey = Buffer.from(this.sessionKey, "base64");
    const encryptedDataBuffer = Buffer.from(encryptedData, "base64");
    const ivBuffer = Buffer.from(iv, "base64");
    let decoded = "";
    try {
      const decipher = crypto.createDecipheriv(algorithm, sessionKey, ivBuffer);
      console.log("1");
      // decipher.setAutoPadding(true);
      console.log("2");
      decipher.setAutoPadding(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      decoded = Buffer.concat([
        decipher.update(encryptedDataBuffer),
        decipher.final(),
      ]);
      console.log("3");
      console.log("4");
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // console.log(decoded.toString("base64"));
      decoded = JSON.parse(decoded);
      console.log("5");
    } catch (error) {
      throw new Error(error);
    }
    if ((decoded as any).watermark.appid !== this.appId) {
      throw new Error("Illegal Buffer");
    }
    return decoded;
  }
}

export default WXBizDataCrypt;
