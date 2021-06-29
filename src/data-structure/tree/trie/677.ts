/**
 * @description leetCode 677 trie相关
 */

class Node {
  value: number; // 当前节点存储的对应值
  next: Map<string, Node>;
  constructor(value?: number) {
    this.value = value ?? 0;
    this.next = new Map();
  }
}
class MapSum {
  private static Node = Node;
  private root: Node;
  constructor() {
    this.root = new MapSum.Node();
  }

  public insert(word: string, val: number): void {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!cur.next.get(c)) {
        cur.next.set(c, new MapSum.Node());
      }
      cur = cur.next.get(c);
    }
    cur.value = val;
  }
  public sum(prefix: string): number {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix.charAt(i);
      if (cur.next.get(c) === null) {
        return 0;
      }
      cur = cur.next.get(c);
    }
    return this._sum(cur);
  }
  private _sum(node: Node) {
    if (node.next.size === 0) {
      return node.value;
    }
    let res = node.value;
    const cur = node;
    for (const key in cur.next.keys) {
      res += this._sum(cur.next.get(key));
    }
    return res;
  }
}

export { MapSum };
