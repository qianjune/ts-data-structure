/**
 * @description 希尔排序
 * 每次处理一定间隔区间的数的排序（第一次n/2，第二次n/4,直到间距为1）
 * 组件让数组越来越有序
 * 时间复杂度：低于n^2 - n^2/2log(n)
 * 不同步长数列（h-属于超参数），复杂度分析也不同
 * 适用于：数据量不是特别大的，或者不适合适用递归的情况
 */

class ShellSort {
  public sort<E>(data: E[]): E[] {
    let h = data.length / 2;
    while (h >= 1) {
      // 循环每个区间的开头，也就是小于h的索引
      for (let start = 0; start < h; start++) {
        // 下一个数每次间隔h个索引
        for (let i = start; i < data.length; i += h) {
          const t = data[i];
          // 类似插入排序算法
          let j;
          // 每次都和同一个间隔区间内的前面的数依次做比较,如果小于，就把大的数换到j的位置上
          for (j = i; j - h > 0 && t < data[j - h]; j -= h) {
            data[j] = data[j - h];
          }
          data[j] = t;
        }
      }
      h = h / 2;
    }
    return [];
  }
}

export { ShellSort };
