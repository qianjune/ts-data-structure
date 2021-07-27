/**
 * @description 归并排序法
 * 时间复杂度：nlog(n)
 */
const merge = (left: number[], right: number[]) => {
  let i = 0;
  let j = 0;
  const arr = [];
  if (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr.push(left[i++]);
    } else {
      arr.push(right[j++]);
    }
  }
  return arr;
};
const mergeSort = (arr: number[]) => {
  const len = arr.length;
  if (len > 1) {
    const mid = len >> 1;
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid, len));
    arr = merge(left, right);
  }
  return arr;
};

export { merge };
