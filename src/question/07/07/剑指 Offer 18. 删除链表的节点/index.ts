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

function deleteNode(head: ListNode | null, val: number): ListNode | null {
  const dumpNode = new ListNode(null, head);
  let ret = dumpNode;
  while (ret && ret.next) {
    if (ret.next.val === val) {
      ret.next = ret.next.next;
    }
    ret = ret.next;
  }
  return dumpNode.next;
}
