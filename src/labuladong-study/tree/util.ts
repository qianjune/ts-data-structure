import { TreeNode } from "../public/tree";

class TreeUtil {
  buildByArr(arr: number[]) { }
  loopTreeByPreOrder(root: TreeNode) {
    if (!root) return;
    console.log(root.val);
    this.loopTreeByPreOrder(root.left);
    this.loopTreeByPreOrder(root.right);
  }
  loopTreeByInOrder(root: TreeNode) {
    if (!root) return;
    this.loopTreeByInOrder(root.left);
    console.log(root.val);
    this.loopTreeByInOrder(root.right);
  }
  loopTreeByPostOrder(root: TreeNode) {
    if (!root) return;
    this.loopTreeByPostOrder(root.left);
    this.loopTreeByPostOrder(root.right);
    console.log(root.val);
  }
}

export { TreeUtil };
