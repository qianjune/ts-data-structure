// 82. 删除排序链表中的重复元素 II

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
  const dummyhead = new ListNode(null, head);
  let cur = dummyhead;
  const nxt = dummyhead.next;
  while (cur && nxt) {
    const after = nxt.next;
    while (nxt.val === after.val) {
      nxt.next = after.next;
    }
    cur.next = nxt.next;
    cur = cur.next;
  }
  return dummyhead.next;
}
