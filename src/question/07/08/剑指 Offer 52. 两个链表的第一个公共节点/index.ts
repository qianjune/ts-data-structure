// 剑指 Offer 52. 两个链表的第一个公共节点 （相交）
// 解题方式：双指针 - 两个相交链表绕圈必定碰到

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
const getIntersectionNode = function (headA, headB) {
  if (!headA || !headB) return;
  let nodeA = headA;
  let nodeB = headB;
  // 两圈绕弯都null
  while (nodeA !== nodeB) {
    nodeA = !nodeA ? headB : nodeA.next;
    nodeB = !nodeB ? headA : nodeB.next;
  }
  return nodeA;
};
