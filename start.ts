import "module-alias/register";
import "reflect-metadata";
// import { quickSort, QuickSort } from "@src/algorithm/quick-sort";
// QuickSort.sort<number>([4, 6, 5, 2, 3, 8, 7, 1]);
// import "@src/algorithm/insert-sort";
// rx 学习
// import './experiment/rx-dev/index'
// 算法
// import './experiment/algorithm/index'
// import { BinarySearch } from "@src/algorithm/binary-search";
// BinarySearch.search();
import { BTS2 } from "@src/algorithm/binary-search-tree/index2";

const myBTS = new BTS2<number>()
myBTS.add(5)
myBTS.add(3)
myBTS.add(2)
myBTS.add(4)
myBTS.add(6)
myBTS.add(8)
console.log(myBTS)
console.log(myBTS.toString())