/**
 * @description 字典树/前缀树
 * 用来处理字符串
 * 时间复杂度和字符串的长度相关：w：代表字符长度
 * 每一个节点有26个子节点（不包含大小姐，符号的情况）
 */

class Node {
  isWord: boolean; // 当前的节点是否是一个单词的结尾 如：pan/panda
  next: Map<string, Node>;
  constructor(isWord?: boolean) {
    this.isWord = isWord ?? false;
    this.next = new Map();
  }
}

class Trie {
  root: Node;
  size: number;
  constructor() {
    this.root = new Node();
    this.size = 0;
  }
  public getSize(): number {
    return this.size;
  }
  public add(word: string): void {
    // 非递归方式
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!cur.next.get(c)) {
        cur.next.set(c, new Node());
      }
      cur = cur.next.get(c);
    }
    if (!cur.isWord) {
      cur.isWord = true;
      this.size++;
    }
  }
}

export { Trie };
