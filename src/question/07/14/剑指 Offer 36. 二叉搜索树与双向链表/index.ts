// 剑指 Offer 36. 二叉搜索树与双向链表
// 解题方式：中序遍历 + 双向链表

const treeToDoublyList = function (root) {
  if (!root) return null;

  let head = null;
  let pre = null;
  var _inOrder = function (root) {
    if (!root) return null;
    _inOrder(root.left);
    // 指向最小的node
    if (!!pre) {
      pre.right = root;
    } else {
      head = root;
    }
    root.left = pre;
    pre = root;
    _inOrder(root.right);
  };
  _inOrder(root);
  head.left = pre;
  console.log(pre.val, head.val);
  pre.right = head;
  return head;
};
