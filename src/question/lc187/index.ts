/**
 * @description leetCode 187
 * 2-3
 */

class Solution1392 {
  public main(s: string) {
    for (let len = s.length - 1; len >= 1; len--) {
      if (this.equal(s, 0, len - 1, s.length - len, s.length - 1)) {
        return s.substring(0, len);
      }
    }
    return "";
  }
  private equal(s: string, l1: number, r1: number, l2: number, r2: number) {
    for (let i = l1, j = l2; i <= r1 && j <= r2; i++, j++) {
      if (s[i] !== s[j]) return false;
    }
    return true;
  }
}
