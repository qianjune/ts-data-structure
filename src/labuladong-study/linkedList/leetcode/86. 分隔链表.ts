// 86. 分隔链表
// 难度：中等 - 高
// 要点：
// -- 处理链表点的交换

import { ListNode } from "@src/labuladong-study/public/linkedList";
import { LinkedListUtil } from "../util";

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

function partition(head: ListNode | null, x: number): ListNode | null {
  // 找到preLeft
  // 找到right
  // temp = preLeft.next
  // preLeft.next = right.next
  // right.next = temp
  // ------
  // preLeft = temp
  // let dummyhead = new ListNode(null,head)
  // 124352

  const dummyhead = new ListNode(null, head);
  let preLeft = null;
  let right = null;
  let cur = dummyhead;
  while (cur?.next) {
    LinkedListUtil.loopList(dummyhead.next);
    if (cur.next.val >= x && !preLeft) {
      preLeft = cur;
    } else if (cur.val !== null && cur.next && cur.next.val < x && preLeft) {
      console.log(preLeft.val, cur.val);
      right = cur;
      const left = preLeft.next;
      const rightNxt = right.next;
      const rightNxtNxt = rightNxt.next;
      preLeft.next = rightNxt;
      preLeft = preLeft.next;
      rightNxt.next = left;
      right.next = rightNxtNxt;
    } else {
      cur = cur.next;
    }
  }
  console.log("----result----");
  LinkedListUtil.loopList(dummyhead.next);
  return dummyhead.next;
}

const head = LinkedListUtil.buildByArr([1, 4, 3, 1.5, 2, 5, 2]);
partition(head, 3);
