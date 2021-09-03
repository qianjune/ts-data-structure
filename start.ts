import "module-alias/register";
import "reflect-metadata";
import { LinkedListUtil } from "@src/labuladong-study/linkedList/util";
import { ListNode } from "@src/labuladong-study/public/linkedList";
// import { BiscuitsSort } from "@src/question/biscuits-sort";
// import "@src/data-structure/linkedList";
// import "@src/algorithm/binary-search-tree/index2";
// import "@src/data-structure/map/linkedListMap";
// import { quickSort, QuickSort } from "@src/algorithm/quick-sort";
// QuickSort.sort<number>([4, 6, 5, 2, 3, 8, 7, 1]);
// import "@src/algorithm/insert-sort";
// rx 学习
// import './experiment/rx-dev/index'
// 算法
// import './experiment/algorithm/index'
// import { BinarySearch } from "@src/algorithm/binary-search";
// BinarySearch.search();
// import { EnvelopeNesting } from "@src/question/envelope-nesting";
// EnvelopeNesting.nesting();
// import "@src/data-structure/heap/max-heap";
// import "@src/data-structure/heap/heap-sort";
// BiscuitsSort.sort();
// import "@src/data-structure/tree/segment-tree/index";
// import "@src/data-structure/tree/AVL/index";
// import "@src/data-structure/tree/red-black-tree/index";
// import "@src/algorithm/sort/base-sort/msd";
// import "@src/question/string-match/index";
function reorderList(head: ListNode) {
  if (!head || !head.next || !head.next.next) return head;
  function reserve(head: ListNode) {
    let cur = head;
    let pre = null;
    while (cur) {
      const next = cur.next;
      cur.next = pre;
      pre = cur;
      cur = next;
    }
    return pre;
  }
  function merge(head: ListNode, newHead: ListNode) {
    while (newHead) {
      const rest = newHead.next;
      newHead.next = head.next;
      head.next = newHead;
      head = newHead.next;
      newHead = rest;
    }
  }
  // write code here
  // 寻找链表重点
  let left = head;
  let right = head.next;
  while (right && right.next) {
    left = left.next;
    right = right.next.next;
  }
  // 逆序后半部分链表
  const newHead = reserve(left.next);
  left.next = null;

  LinkedListUtil.loopList(head);
  LinkedListUtil.loopList(newHead);
  // 循环合并前后链表
  merge(head, newHead);
  console.log(head.val);
}
const head = LinkedListUtil.build(3);
reorderList(head);
LinkedListUtil.loopList(head);
// import "./app";
