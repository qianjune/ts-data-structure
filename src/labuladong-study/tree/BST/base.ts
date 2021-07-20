/**
 * @description 二分搜索数
 */

import { TreeNode } from "@src/labuladong-study/public/tree";

// 查找第k大的数
// 用中序遍历
// 优化：给treeNode维护排名size

// 累加数
// 用中序遍历
// 要点：中序遍历正常是生序，先right就变成降序

// 判断二分搜索树的合法性
// isValidBST(root,null,null)
const isValidBST = (root: TreeNode, min: TreeNode, max: TreeNode): boolean => {
  if (!root) return true;
  if (!min && min.val > root.val) return false;
  if (!max && max.val < root.val) return false;
  return isValidBST(root.left, min, root) && isValidBST(root.right, root, max);
};

// contains
// if(target > root ) 遍历右边
// if(target < root ) 遍历左边

// add
// 就增加到左边或右边的最下层

// delete
// 3种情况
// -- 1. 没有子节点，直接删除
// -- 2. 有一个子节点，子节点直接代替
// -- 3. 有两个子节点，找到右侧最小的节点替换要删除的节点
TreeNode minNode = getMin(root.right);
root.val = minNode.val; // 最小值拿过来后
root.right = deleteNode(root.right, minNode.val); // 再删除最小值
