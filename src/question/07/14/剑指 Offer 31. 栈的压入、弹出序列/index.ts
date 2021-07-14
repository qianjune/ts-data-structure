// 剑指 Offer 31. 栈的压入、弹出序列

function validateStackSequences(pushed: number[], popped: number[]): boolean {
  const stack = [];
  let i = 0,
    j = 0;
  while (i < pushed.length) {
    stack.push(pushed[i]);
    i++;
    while (j < popped.length && popped[j] === stack[stack.length - 1]) {
      stack.pop();
      j++;
    }
  }

  return stack.length === 0;
}
