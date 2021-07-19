// 705. 设计哈希集合
// 难度：简单
class MyHashSet {
  list: number[];
  constructor() {
    this.list = [];
  }
  _getIndex(key: number) {
    return this.list.findIndex((val) => val === key);
  }
  add(key: number): void {
    const index = this._getIndex(key);
    if (index < 0) {
      this.list.push(key);
    }
  }

  remove(key: number): void {
    const index = this._getIndex(key);
    if (index > -1) {
      this.list.splice(index, 1);
    }
  }

  contains(key: number): boolean {
    return this._getIndex(key) > -1;
  }
}

/**
 * Your MyHashSet object will be instantiated and called as such:
 * var obj = new MyHashSet()
 * obj.add(key)
 * obj.remove(key)
 * var param_3 = obj.contains(key)
 */
