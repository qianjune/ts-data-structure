import "module-alias/register";
import "reflect-metadata";
// import { BiscuitsSort } from "@src/question/biscuits-sort";
import { LinkedList } from "@src/data-structure/linkedList";

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

// BiscuitsSort.sort();

const myLinkedList = new LinkedList();
myLinkedList.add(1);
myLinkedList.add(2);
myLinkedList.add(3);
myLinkedList.add(2.5, 2);
myLinkedList.toString();
console.log(`cur:${myLinkedList.get(2)}`);
