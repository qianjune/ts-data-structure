// 61. 旋转链表
// 难度：中等 - 高

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

function rotateRight(head: ListNode | null, k: number): ListNode | null {
  if (!head || k === 0) return head;
  let len = 0;

  let cur = head;
  while (cur) {
    cur = cur.next;
    len++;
  }
  if (len === 1) return head;
  k = k % len;
  if (k === 0) {
    return head;
  }
  // 拿到倒数第k+1个newlast
  // newlast.next = null
  // 拿到倒数prelast
  // 将prelast.next = head
  let prelast = null;
  let newlast = null;
  let newhead = null;
  function posrTranverse(head: ListNode | null) {
    if (!head || k < -1) return;
    posrTranverse(head.next);
    if (!prelast) prelast = head;
    k--;
    if (k === -1) {
      newlast = head;
    }
  }
  posrTranverse(head);
  newhead = newlast.next;
  newlast.next = null;
  prelast.next = head;
  return newhead;
}
