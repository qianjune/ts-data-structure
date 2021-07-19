// 面试题 02.02. 返回倒数第 k 个节点
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

function kthToLast(head: ListNode | null, k: number): number {
  let res = null;
  function postTranserve(head: ListNode | null) {
    if (!head || k <= 0) return;
    postTranserve(head.next);
    k--;
    if (k === 0) {
      res = head.val;
    }
  }
  postTranserve(head);
  return res;
}
