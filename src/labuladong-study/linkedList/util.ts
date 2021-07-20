/**
 * @description 链表工具
 */

import { ListNode } from "../public/linkedList";

class LinkedListUtil {
  static build(upperLimit: number): ListNode {
    const head = new ListNode(1);
    let cur = head;
    for (let i = 2; i <= upperLimit; i++) {
      cur.next = new ListNode(i);
      cur = cur.next;
    }
    return head;
  }
  static buildByArr(arr: number[]): ListNode {
    const head = new ListNode(arr[0]);
    let cur = head;
    for (let i = 1; i < arr.length; i++) {
      cur.next = new ListNode(arr[i]);
      cur = cur.next;
    }
    return head;
  }
  static loopList(head: ListNode): void {
    let res = "";
    let cur = head;
    while (cur) {
      res += `${cur.val} -> `;
      cur = cur.next;
    }
    res += "null";
    console.log(res);
  }
  static values(head: ListNode): number[] {
    const res = [];
    let cur = head;
    while (cur) {
      res.push(cur.val);
      cur = cur.next;
    }
    return res;
  }
}

export { LinkedListUtil };
