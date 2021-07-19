// 24. 两两交换链表中的节点
// 难度：中等
// 要点：
// -- a.next a代表交换后的原本第一位的数
// -- newHead 代表交换后原本第二位的数
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
function reverse(head: ListNode, end: ListNode) {
  let cur = head;
  let pre = null;
  while (cur && cur !== end) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
}
function swapPairs(head: ListNode | null): ListNode | null {
  const a = head;
  let b = head;
  for (let i = 0; i < 2; i++) {
    if (!b) return head;
    b = b.next;
  }
  const newHead = reverse(a, b);
  a.next = swapPairs(b);
  return newHead;
}
