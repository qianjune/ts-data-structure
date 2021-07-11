// 234. 回文链表
// 阶梯方式： 链表反转
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
function _reverse(head: ListNode, index: number): ListNode {
  let node = head;
  let pre = null;
  let cur = null;
  let next = null;
  let i = 0;
  while (node) {
    next = node.next;

    if (i >= index) {
      cur = node;
      cur.next = pre;
      pre = node;
    }
    node = next;
    i++;
  }
  return pre;
}
function isPalindrome(head: ListNode | null): boolean {
  let node = head;
  let len = 0;
  while (node) {
    node = node.next;
    len++;
  }
  const secondHalf = _reverse(head, Math.ceil(len / 2));
  let node1 = head;
  let node2 = secondHalf;
  while (len > 1) {
    if (node1.val !== node2.val) return false;
    node1 = node1.next;
    node2 = node2.next;
    len = len - 2;
  }
  return true;
}
