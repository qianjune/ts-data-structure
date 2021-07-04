/**
 * @description leetCode 1392
 * preHash
 * postHash
 * 两个数组做预先处理
 * 时间复杂度n
 */

class Solution1392Two {
  private static MOD = 1e9 + 7;
  public static main(s: string) {
    const pow26 = Array(s.length);
    pow26[0] = 1;
    for (let i = 1; i < s.length; i++) {
      pow26[i] = (pow26[i - 1] * 26) % this.MOD;
    }
    const preHash = Array(s.length);
    preHash[0] = s.charCodeAt(0) - "a".charCodeAt(0);
    for (let i = 1; i < s.length - 1; i++) {
      preHash[i] =
        (preHash[i - 1] * 26 + s.charCodeAt(i) - "a".charCodeAt(i)) % this.MOD;
    }
    const postHash = Array(s.length);
    postHash[0] = s.charCodeAt(s.length - 1) - "a".charCodeAt(0);
    for (let i = s.length - 2; i >= 0; i--) {
      preHash[i] =
        ((s.charCodeAt(i) - "a".charCodeAt(i)) * pow26[s.length - i - 1] +
          preHash[i + 1]) %
        this.MOD;
    }
    for (let len = s.length - 1; len >= 1; len--) {
      if (
        preHash[len - 1] === postHash[s.length - len] &&
        this.equal(s, 0, len - 1, s.length - len, s.length - 1)
      ) {
        return s.substring(0, len);
      }
    }
    return "";
  }
  private static equal(
    s: string,
    l1: number,
    r1: number,
    l2: number,
    r2: number
  ) {
    for (let i = l1, j = l2; i <= r1 && j <= r2; i++, j++) {
      if (s[i] !== s[j]) return false;
    }
    return true;
  }
}
