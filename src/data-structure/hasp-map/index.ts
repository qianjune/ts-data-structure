/**
 * @description 哈希表
 * 哈希冲突的处理：链地址法 seperate chaining
 * 如果发生冲突，就把新的值链接在旧值的后面，形成链表
 * -------
 * hashMap就是一个treeMap的数组
 * hashSet就是一个treeSet的数组
 * 当链表的长度达到一定成都后，java8会把该链表改成一颗红黑树
 * （数据量少的时候，链表快；数据量大的时候，红黑树快，转换的前提是K是可比较类型）
 */
import * as int from "int32";
import { AVLMap as TreeMap } from "../tree/AVL/AVL-map";
// 这里应该用红黑树，但是红黑树没有实现remove，用AVL代替
class HashTable<K, V> {
  // 不同数量级采用的素数
  private static capacity = [
    53,
    97,
    193,
    389,
    769,
    1543,
    3079,
    6151,
    12289,
    24593,
    49157,
    98317,
    196613,
    393241,
    786433,
    1572869,
    3145739,
    6291469,
    12582917,
    25165843,
    50331653,
    100663319,
    201326611,
    402653189,
    805306457,
    1610612741,
  ];
  private static readonly upperTol = 10;
  private static readonly lowerTol = 2;
  private static capacityIndex = 0;
  private hashTable: TreeMap<K, V>[];
  private M: number; // 素数,也代表长度,长度过小会出现很多哈希冲突，影响运行效率
  private size: number;
  constructor() {
    this.M = HashTable.capacity[HashTable.capacityIndex];
    this.size = 0;
    for (let i = 0; i < this.M; i++) {
      this.hashTable[i] = new TreeMap<K, V>();
    }
  }

  private hashCode(str: K): number {
    if (typeof str === "string") {
      let hash = 0;
      if (hash == 0 && str.length > 0) {
        for (let i = 0; i < str.length; i++) {
          hash = int.add(int.multiply(31, hash), str.charCodeAt(i));
        }
      }
      return hash;
    }
    throw new Error(`str is not string, please override hashCode`);
  }
  private hash(key: K): number {
    return (this.hashCode(key) & 0x7fffffff) % this.M;
  }
  public getSize(): number {
    return this.size;
  }
  public add(key: K, value: V): void {
    const map = this.hashTable[this.hash(key)];
    if (map.contains(key)) {
      // 修改
      map.set(key, value);
    } else {
      // 添加
      map.add(key, value);
      this.size++;
      if (
        this.size >= HashTable.upperTol * this.M &&
        HashTable.capacityIndex < HashTable.capacity.length - 1
      ) {
        HashTable.capacityIndex++;
        this.resize(HashTable.capacity[HashTable.capacityIndex]);
      }
    }
  }
  private resize(newM: number) {
    const newHashTable: TreeMap<K, V>[] = Array.from({ length: newM });
    for (let i = 0; i < newM; i++) {
      newHashTable[i] = new TreeMap();
    }
    const oldM = this.M;
    this.M = newM;
    for (let i = 0; i < oldM; i++) {
      const map = this.hashTable[i];
      const keySet = map.keySet();
      for (const key of keySet.keys()) {
        newHashTable[this.hash(key)].add(key, map.get(key));
      }
      this.hashTable = newHashTable;
    }
  }
  public remove(key: K): V {
    const map = this.hashTable[this.hash(key)];
    let ret = null;
    if (map.contains(key)) {
      ret = map.remove(key);
      this.size--;
      if (
        this.size < HashTable.lowerTol * this.M &&
        HashTable.capacityIndex >= 1
      ) {
        HashTable.capacityIndex--;
        this.resize(HashTable.capacity[HashTable.capacityIndex]);
      }
    }
    return ret;
  }
  public set(key: K, value: V): void {
    const map = this.hashTable[this.hash(key)];
    if (!map.contains(key)) {
      throw new Error(`key do not exist`);
    }
    map.set(key, value);
  }
  public get(key: K): V {
    return this.hashTable[this.hash(key)].get(key);
  }
  public contains(key: K): boolean {
    return this.hashTable[this.hash(key)].contains(key);
  }
}

export { HashTable };
