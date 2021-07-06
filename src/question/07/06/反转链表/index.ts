// 反转链表
// 解题方式：迭代
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

function reverseList(head: ListNode | null): ListNode | null {
  let pre = null;
  let curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = pre;
    pre = curr;
    curr = next;
  }
  return pre;
}
