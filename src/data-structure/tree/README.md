## 平衡二叉树

高度和节点数量之间的关系是O(logn)
标注节点高度，最下面的叶子节点高度为1，越上面越大，两个子节点高度不同时，取高度值较大的
平衡因子：左右子树的高度差

### 满二叉树

除了叶子节点，其他节点都有两个子节点

### 完全二叉树

每个一个节点都是从左到右填满

### 堆

对于任意一个叶子节点，左右高度差不能超过1

### AVL树

对于任意一个节点，左的左子树的高度和右子树的高度差不能超过1
