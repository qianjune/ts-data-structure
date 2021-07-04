/**
 * @description leetCode 1147
 * 哈希方式
 */

class Solution2 {
  private MOD = 1e9 + 7;
  public main(text: string) {
    //let pow26 = Array(text.length) // 通过循环将pow的26次方一次存储
    this.solve(text, 0, text.length - 1);
  }
  /**
   * 时间复杂度n
   * @param str
   * @param left
   * @param right
   * @returns
   */
  private solve(str: string, left: number, right: number): number {
    if (left > right) return;
    let preHash = 0,
      postHash = 0;

    for (let i = left, j = right; i < j; i++, j--) {
      preHash =
        (preHash + preHash * 26 + (str.charCodeAt(i) - "a".charCodeAt(0))) %
        this.MOD;
      postHash =
        ((str.charCodeAt(i) - "a".charCodeAt(0)) * Math.pow(26, right - j) +
          postHash) %
        this.MOD;
      // str[left,i] === str[j,right]
      // equal只有在hash冲突时才会触发
      if (preHash === postHash && this.equal(str, left, i, j, right)) {
        return 2 + this.solve(str, i + 1, j - 1);
      }
    }
    return 1;
  }
  private equal(
    s: string,
    left: number,
    i: number,
    j: number,
    right: number
  ): boolean {
    for (let x = left, y = j; x <= i && y <= right; x++, j++) {
      if (s.charAt(x) !== s.charAt(y)) return false;
    }
    return true;
  }
}
