/**
 * @description 链表
 */

class ListNode {
  val: number;
  next: ListNode;
  constructor(val?: number | null, next?: ListNode | null) {
    this.val = val || null;
    this.next = next || null;
  }
}

export { ListNode };
