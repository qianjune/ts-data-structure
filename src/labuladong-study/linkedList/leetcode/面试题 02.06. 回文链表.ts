// 面试题 02.06. 回文链表
// 难度：简单 - 高

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

function reverse(head: ListNode | null): ListNode {
  if (!head.next) return head;
  const last = reverse(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}
function isPalindrome(head: ListNode | null): boolean {
  if (!head) return true;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let left = head;
  let right = reverse(slow);

  while (right) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }
  return true;
}
