/**
 * @description 二分查找法
 * 时间复杂度：1+1+1+1...=log(m) = O(logn)
 * 算上排序时间：nlog(n)
 * 应用场景：对一组数据多次查找，第一次进行排序，后续查找都能以log(n)级别查找
 * mid=(l+r)/2 容易溢出
 * mid=l+(r-l)/2 更好
 * 有序数组才使用二分查找法
 * 每次从中间查找，再从剩下的中间查找，以此类推
 */

class BinarySearch {
  public static search(
    arr: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9],
    target = 10
  ): number {
    let l = 0;
    let r = arr.length - 1;
    let index = -1;
    while (l <= r && index === -1) {
      const mid = Math.floor(l + (r - l) / 2);
      console.log(`l:${l},r:${r},mid:${mid}`);
      console.log("mid:", mid);
      if (arr[mid] === target) {
        index = mid;
      } else if (arr[mid] > target) {
        console.log(`左侧开始：l:${l},r:${mid - 1}`);
        r = mid - 1;
      } else if (arr[mid] < target) {
        console.log(`右侧开始：l:${mid + 1},r:${r}`);
        l = mid + 1;
      }
    }
    console.log(index);
    return index;
  }
}

export { BinarySearch };
