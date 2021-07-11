// 287. 寻找重复数
// 题目：
// 给定一个包含 n + 1 个整数的数组 nums ，其数字都在 1 到 n 之间（包括 1 和 n），可知至少存在一个重复的整数。

// 假设 nums 只有 一个重复的整数 ，找出 这个重复的数 。

// 解题方式：哈希 / 链表 - 快慢指针

function findDuplicate(nums: number[]): number {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    const n = nums[i];
    if (set.has(n)) {
      return n;
    } else {
      set.add(n);
    }
  }
}

// 从理论上讲，数组中如果有重复的数，那么就会产生多对一的映射，这样，形成的链表就一定会有环路了，

// 综上
// 1.数组中有一个重复的整数 <==> 链表中存在环
// 2.找到数组中的重复整数 <==> 找到链表的环入口

// 至此，问题转换为 142 题。那么针对此题，快、慢指针该如何走呢。根据上述数组转链表的映射关系，可推出
// 142 题中慢指针走一步 slow = slow.next ==> 本题 slow = nums[slow]
// 142 题中快指针走两步 fast = fast.next.next ==> 本题 fast = nums[nums[fast]]

function findDuplicate2(nums: number[]): number {
  let slow = 0;
  let fast = 0;
  slow = nums[slow];
  fast = nums[nums[fast]];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[nums[fast]];
  }
  let pre1 = 0;
  let pre2 = slow;
  while (nums[pre1] !== nums[pre2]) {
    pre1 = nums[pre1];
    pre2 = nums[pre2];
  }
  return pre1;
}
