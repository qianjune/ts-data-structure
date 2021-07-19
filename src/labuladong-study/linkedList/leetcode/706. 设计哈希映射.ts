// 706. 设计哈希映射
// 难度：简单

class MyHashMap {
  list: number[];
  constructor() {
    this.list = [];
  }

  put(key: number, value: number): void {
    this.list[key] = value;
  }

  get(key: number): number {
    return this.list[key] !== undefined ? this.list[key] : -1;
  }

  remove(key: number): void {
    this.list[key] = undefined;
  }
}

/**
 * Your MyHashMap object will be instantiated and called as such:
 * var obj = new MyHashMap()
 * obj.put(key,value)
 * var param_2 = obj.get(key)
 * obj.remove(key)
 */
