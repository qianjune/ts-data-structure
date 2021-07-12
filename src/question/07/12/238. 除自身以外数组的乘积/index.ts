// 238. 除自身以外数组的乘积
// 解题方式：乘积
// 原数组：       [1       2       3       4]
// 左部分的乘积：   1       1      1*2    1*2*3
// 右部分的乘积： 2*3*4    3*4      4      1
// 结果：        1*2*3*4  1*3*4   1*2*4  1*2*3*1
// 从上面的图可以看出，当前位置的结果就是它左部分的乘积再乘以它右部分的乘积。因此需要进行两次遍历，第一次遍历用于求左部分的乘积，第二次遍历在求右部分的乘积的同时，再将最后的计算结果一起求出来。
function productExceptSelf(nums: number[]): number[] {
  const res: number[] = [];
  let p = 1,
    q = 1;
  for (let i = 0; i < nums.length; i++) {
    res[i] = p;
    p *= nums[i];
  }
  for (let j = nums.length - 1; j >= 1; j--) {
    q *= nums[j];
    res[j - 1] *= q;
  }
  return res;
}
