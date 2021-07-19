// 1290. 二进制链表转整数
// 难度：简单

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

function getDecimalValue(head: ListNode | null): number {
  let cur = head;
  let str = "";
  while (cur) {
    str += cur.val;
    cur = cur.next;
  }
  return parseInt(str, 2);
}
