import crypto from "crypto";
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
      const decipher = crypto.createDecipheriv(
        "aes-128-cbc",
        sessionKey,
        ivBuffer
      );
      decipher.setAutoPadding(true);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      decoded = decipher.update(encryptedDataBuffer, "binary", "utf8");
      decoded += decipher.final("utf8");
      decoded = JSON.parse(decoded);
    } catch (error) {
      throw new Error("Illegal Buffer");
    }
    if ((decoded as any).watermark.appid !== this.appId) {
      throw new Error("Illegal Buffer");
    }
    return decoded;
  }
}

export default WXBizDataCrypt;
