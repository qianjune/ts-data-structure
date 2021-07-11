// 剑指 Offer 33. 二叉搜索树的后序遍历序列
// 解题方式：辅助栈
// 反转 后序遍历 后的第一位就是根节点，根节点之后大于根节点的都是右节点，
// 但遇到第一个小于根节点的，将根节点设为栈的第一个值
function verifyPostorder(postorder: number[]): boolean {
  let root = Infinity;
  const stack: number[] = [];
  for (let i = postorder.length - 1; i >= 0; i--) {
    console.log(`${postorder[i]},${root}`);
    if (postorder[i] > root) return false;
    while (stack.length > 0 && stack[0] > postorder[i]) {
      root = stack.shift();
    }
    stack.unshift(postorder[i]);
  }
  return true;
}

console.log(`result: ${verifyPostorder([1, 3, 2, 6, 5])}`);

export { verifyPostorder };
