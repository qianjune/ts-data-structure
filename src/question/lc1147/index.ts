/**
 * @description leetCode 1147
 */

class Solution {
  public main(text: string) {
    this.solve(text, 0, text.length - 1);
  }
  /**
   * 时间复杂度n^2
   * @param str
   * @param left
   * @param right
   * @returns
   */
  private solve(str: string, left: number, right: number): number {
    if (left > right) return;
    for (let i = left, j = right; i < j; i++, j--) {
      // str[left,i] === str[j,right]
      if (this.equal(str, left, i, j, right)) {
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
