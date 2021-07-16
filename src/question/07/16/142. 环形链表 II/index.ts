// 142. 环形链表 II
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

//  走a+nb步一定是在环入口
//  第一次相遇时慢指针已经走了nb步

function detectCycle(head: ListNode | null): ListNode | null {
  let slow = head,
    fast = head;
  while (true) {
    if (!fast || !fast.next) return null;
    fast = fast.next.next;
    slow = slow.next;
    if (slow === fast) break;
  }
  fast = head;
  while (fast !== slow) {
    fast = fast.next;
    slow = slow.next;
  }
  return fast;
}
