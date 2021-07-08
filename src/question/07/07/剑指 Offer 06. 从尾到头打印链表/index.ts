// 解题方式： 循环 / 数组

/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */

function reversePrint(head: ListNode | null): number[] {
  let ret = head;
  const res = [];
  while (ret) {
    res.push(ret.val);
    ret = ret.next;
  }
  return res.reverse();
}
