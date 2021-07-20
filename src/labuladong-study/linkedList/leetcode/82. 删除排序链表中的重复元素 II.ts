// 82. 删除排序链表中的重复元素 II
// 难度：中等
// 要点
// -- 用哈希简单
// -- 不用哈希注意判断
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

function deleteDuplicates(head: ListNode | null): ListNode | null {
  const dummyhead = new ListNode(null, head);
  let cur = dummyhead;
  while (cur.next) {
    const nxt = cur.next;
    // console.log(cur.next.val, cur.next.next.val);
    if (nxt?.val === nxt.next?.val) {
      while (nxt?.val === nxt.next?.val) {
        nxt.next = nxt.next.next;
        cur.next = nxt.next;
      }
    } else {
      // console.log(cur.next);
      cur = cur.next;
    }
  }
  return dummyhead.next;
}

const head = LinkedListUtil.buildByArr([1, 1, 1, 2, 3]);
LinkedListUtil.loopList(deleteDuplicates(head));
