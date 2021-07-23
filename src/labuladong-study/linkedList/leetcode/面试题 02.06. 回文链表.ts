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

function reverse1(head: ListNode | null): ListNode {
  if (!head.next) return head;
  const last = reverse1(head.next);
  head.next.next = head;
  head.next = null;
  return last;
}
// 先找到链表中点
// 然后反转后一半链表
// 再将前一半和反转的后一半进行对比
function isPalindrome(head: ListNode | null): boolean {
  if (!head) return true;
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let left = head;
  let right = reverse1(slow);

  while (right) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }
  return true;
}
