/**
 * @description 反转链表
 */

import { ListNode } from "../public/linkedList";
import { LinkedListUtil } from "./util";

const head = LinkedListUtil.build(6);
// LinkedListUtil.loopList(head);

// const reverse = (head: ListNode): ListNode => {
//   if (!head.next) return head;
//   const last = reverse(head.next);
//   head.next.next = head;
//   head.next = null;
//   return last;
// };
// LinkedListUtil.loopList(reverse(head));

// let successor: ListNode = null;
// const reverseN = (head: ListNode, n: number): ListNode => {
//   if (n === 1) {
//     successor = head.next;
//     return head;
//   }
//   const last = reverseN(head.next, n - 1);
//   head.next.next = head;
//   head.next = successor;
//   return last;
// };
// LinkedListUtil.loopList(reverseN(head, 3));

// const reverseBetween = (head: ListNode, m: number, n: number): ListNode => {
//   if (m === 1) {
//     return reverseN(head, n);
//   }
//   head.next = reverseBetween(head.next, m - 1, n - 1);
//   return head;
// };
// LinkedListUtil.loopList(reverseBetween(head, 2, 4));

// 迭代方式
const reverse = (head: ListNode, end?: ListNode) => {
  let cur = head;
  let pre = null;
  while (cur && cur !== end) {
    const next = cur.next;
    cur.next = pre;
    pre = cur;
    cur = next;
  }
  return pre;
};
// LinkedListUtil.loopList(reverse(head));

const reverseKGroup = (head: ListNode, K: number): ListNode => {
  let b = head;
  const a = head;
  for (let i = 0; i < K; i++) {
    if (!b) return head;
    b = b.next;
  }
  const newHead = reverse(a, b);
  a.next = reverseKGroup(b, K);
  return newHead;
};
// LinkedListUtil.loopList(reverseKGroup(head, 2));

export { reverse };
