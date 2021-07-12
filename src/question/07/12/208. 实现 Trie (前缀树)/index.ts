// 208. 实现 Trie (前缀树)
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

  insert(word: string): void {
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

  search(word: string): boolean {
    let cur = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word.charAt(i);
      if (!cur.next.get(c)) {
        return false;
      }
      cur = cur.next.get(c);
    }
    return cur.isWord;
  }

  startsWith(prefix: string): boolean {
    let cur = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i];
      if (!cur.next.get(c)) {
        return false;
      }
      cur = cur.next.get(c);
    }
    return true;
  }
}

/**
 * Your Trie object will be instantiated and called as such:
 * var obj = new Trie()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
const myTrie = new Trie();
myTrie.search("a");
export { Trie };
