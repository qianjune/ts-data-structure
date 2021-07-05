// 删除链表的倒数第 N 个结点
// 解决方法：栈/双指针/暴力
import StackList from "@src/data-structure/stack";

// 给你一个链表，删除链表的倒数第 n 个结点，并且返回链表的头结点

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
class ListNode1 {
  val: number;
  next: ListNode1 | null;
  constructor(val?: number, next?: ListNode1 | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function removeNthFromEnd(head: ListNode1 | null, n: number): ListNode1 | null {
  if (!head.next && n === 1) return null;
  const stack = new StackList<ListNode1>([]);
  let h = head;
  let t = new ListNode1(null);
  t.next = head;
  while (t.next) {
    stack.push(t.next);
    t = t.next;
  }
  // t.next = new ListNode1(null);
  if (n === stack.size()) {
    for (let i = 0; i < n - 1; i++) {
      h = stack.pop();
      console.log(h.val);
    }
  } else {
    for (let i = 0; i <= n; i++) {
      t = stack.pop();
      console.log(t.val);
    }
    console.log(t.val);
    t.next = t.next.next;
  }

  // while (h) {
  //   console.log(h.val);
  //   h = h.next;
  // }
  return h;
}
const head = new ListNode1(1);
head.next = new ListNode1(2);
// head.next.next = new ListNode1(3);
// head.next.next.next = new ListNode1(4);
// head.next.next.next.next = new ListNode1(5);

removeNthFromEnd(head, 2);
