// 面试题 02.01. 移除重复节点
// 难度：简单
// 要点
// -- 判断right?.val是否是undefined
// -- 如果不开额外空间就，n方双重循环，每次删掉制定的一个数

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

function removeDuplicateNodes(head: ListNode | null): ListNode | null {
  const set = new Set();
  let cur = head;
  while (cur) {
    set.add(cur.val);
    let right = cur.next;
    while (right?.val !== undefined && set.has(right.val)) {
      cur.next = right.next;
      right = right.next;
    }
    cur = cur.next;
  }
  return head;
}
