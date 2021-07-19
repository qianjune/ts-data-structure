// 237. 删除链表中的节点
// 难度：简单
// 要点：链表只能向后

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

/**
 Do not return anything, modify it in-place instead.
 */

function deleteNode(root: ListNode | null): void {
  root.val = root.next.val;
  root.next = root.next.next;
}
