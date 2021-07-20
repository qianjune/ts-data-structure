/**
 * @description 树节点
 */

class TreeNode {
  val: number;
  left: TreeNode;
  right: TreeNode;
  next: TreeNode;
  constructor(
    val?: number | null,
    left?: TreeNode | null,
    right?: TreeNode | null
  ) {
    this.val = val || null;
    this.left = left || null;
    this.right = right || null;
    this.next = null;
  }
}

export { TreeNode };
