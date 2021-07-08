// 剑指 Offer 22. 链表中倒数第k个节点
// 解题方式：双指针

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

function getKthFromEnd(head: ListNode | null, k: number): ListNode | null {
  let left = head,
    right = head;
  while (right) {
    if (k > 0) {
      right = right.next;
      k--;
    } else {
      left = left.next;
      right = right.next;
    }
  }
  return left;
}
