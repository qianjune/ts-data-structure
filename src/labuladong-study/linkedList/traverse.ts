/**
 * @description
 */

import { listMetadataForTarget } from "inversify/lib/utils/serialization";
import { ListNode } from "../public/linkedList";
import { reverse } from "./reverse";
import { LinkedListUtil } from "./util";

// const traverse = (head: ListNode) => {
//   if (!head) return;
//   // console.log(head.val);
//   traverse(head.next);
//   console.log(head.val);
// };
const isPalindrome = (head: ListNode) => {
  // while (!fast || !fast.next) {
  //   slow = slow.next;
  //   fast = fast.next.next;
  // }
  // let left = head;
  // const traverse = (right: ListNode): boolean => {
  //   if (!right) return true;
  //   let res = traverse(right.next);
  //   console.log(left.val, right.val);

  //   res = res && left.val === right.val;
  //   left = left.next;
  //   return res;
  // };
  // return traverse(head);

  let slow = head;
  let fast = head;
  // let p  slow前一个
  // let q  列表最后一个
  // 随附反转的链表：p.next = reverse(q)
  while (!fast || !fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let left = head;
  let right = reverse(slow);
  LinkedListUtil.loopList(right);

  while (right) {
    if (left.val !== right.val) {
      return false;
    }
    left = left.next;
    right = right.next;
  }
  LinkedListUtil.loopList(head);
  return true;
};
const head = LinkedListUtil.buildByArr([1, 2, 3, 3, 2, 2]);
// console.log(LinkedListUtil.loopList(head));
console.log(isPalindrome(head));
