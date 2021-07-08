// 剑指 Offer 30. 包含min函数的栈
// 辅助栈

class MinStack {
  private stack: number[];
  private minStack: number[];
  constructor() {
    this.stack = [];
    this.minStack = [];
  }

  push(x: number): void {
    if (
      this.minStack.length === 0 ||
      this.minStack[this.minStack.length - 1] >= x
    ) {
      this.minStack.push(x);
    }
    this.stack.push(x);
  }

  pop(): void {
    if (this.stack.pop() === this.minStack[this.minStack.length - 1]) {
      this.minStack.pop();
    }
  }

  top(): number {
    return this.stack[this.stack.length - 1];
  }

  min(): number {
    return this.minStack[this.minStack.length - 1];
  }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(x)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.min()
 */
