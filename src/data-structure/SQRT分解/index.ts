/**
 * @description
 * 对数据预处理，分组，用于处理区间问题
 * 时间复杂度sqrt(n)
 * 比线段树慢，但编写较为容易
 * leetCode 303/307
 */
class SQRT {
  private data: number[]; // 存储所有数据
  private block: number[]; // 存储分组后每个组的合
  private N: number; // 元素总数
  private B: number; // 每组元素个数
  private Bn: number; // 组数
  constructor(nums: number[]) {
    this.data = [...nums];
    this.N = nums.length;
    if (this.N === 0) return;
    this.B = Math.floor(Math.sqrt(this.N));
    this.Bn = this.N / this.B + (this.N % this.B > 0 ? 1 : 0);
    this.block = Array.from({ length: this.Bn });
    for (let i = 0; i < this.N; i++) {
      this.block[Math.ceil(i / this.N)] += nums[i];
    }
  }
  public sumRange(x: number, y: number) {
    if (x < 0 || x >= this.N || y < 0 || y >= this.N || y < x) {
      // throw new Error("illegal");
      return 0;
    }
    const bstart = Math.ceil(x / this.B);
    const bend = Math.ceil(y / this.B);
    let res = 0;
    if (bstart === bend) {
      for (let i = x; i <= y; i++) {
        res += this.data[i];
      }
      return res;
    }
    for (let i = x; i < (bstart + 1) * this.B; i++) {
      res += this.data[i];
    }
    for (let b = bstart + 1; b < bend; b++) {
      res += this.block[b];
    }
    for (let i = bend * this.B; i <= y; i++) {
      res += this.data[i];
    }
    return res;
  }
  public update(i: number, value: number): void {
    // if(i 不合法)
    const b = Math.ceil(i / this.B);
    this.block[b] -= this.data[i];
    this.block[b] += value;
    this.data[i] = value;
  }
}

export { SQRT };
