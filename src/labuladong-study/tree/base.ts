import { TreeNode } from "../public/tree";

// 计算树的节点数
const count = (root: TreeNode): number => {
  if (!root) return 0;
  return 1 + count(root.left) + count(root.right);
};

// 镜像反转
const invertTree = (root: TreeNode) => {
  if (!root) return null;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};

// 链接同层的节点
const connectTreeNode = (root: TreeNode) => {
  const connect = (node1: TreeNode, node2: TreeNode): void => {
    if (!node1 || !node2) return;
    node1.next = node2;
    connect(node1.left, node1.right);
    connect(node2.left, node2.right);
    connect(node1.right, node2.left);
  };
  connect(root.left, root.right);
  return root;
};

// 压平二叉树变成链表
const flatten = (root: TreeNode): void => {
  if (!root) return;
  flatten(root.left); // 先分别压平左右
  flatten(root.right);
  const left = root.left;
  const right = root.right;
  root.left = null;
  root.right = left;
  let p = root;
  while (p) {
    p = p.right;
  }
  p.right = right;
};
