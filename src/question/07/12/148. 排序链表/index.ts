// 148. 排序链表
// 解题方式：归并排序 / 暴力排序
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
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function getMidNode(head: ListNode): ListNode {
  // 找到链表的最后两个
  if (!head || !head.next) {
    return head;
  }
  let slow = head;
  let fast = head.next.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  return slow;
}
function mergeTwoLists(l1: ListNode, l2: ListNode) {
  const head = new ListNode(null);
  let cur = head;
  while (l1 && l2) {
    if (l1.val < l2.val) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    cur = cur.next;
  }
  cur.next = l1 ? l1 : l2;
  return head.next;
}
function sortList(head: ListNode | null): ListNode | null {
  if (!head || !head.next) {
    return head;
  }
  // 找中间
  const midNode = getMidNode(head);
  const rightHead = midNode.next;
  midNode.next = null;
  const l1 = sortList(head);
  const l2 = sortList(rightHead);
  return mergeTwoLists(l1, l2);
}
