// 83. 删除排序链表中的重复元素
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  let cur = head;
  while (cur) {
    let right = cur.next;
    while (cur.val === right?.val) {
      right = right.next;
    }
    cur.next = right;
    cur = cur.next;
  }
  return head;
}
