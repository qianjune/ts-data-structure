// 437. 路径总和 III
// 解题方式：哈希 + 递归 + 回溯

// 解题思路
// 这道题用到了一个概念，叫前缀和。就是到达当前元素的路径上，之前所有元素的和。
// 前缀和怎么应用呢？
// 在同一个路径之下（可以理解成二叉树从root节点出发，到叶子节点的某一条路径），如果两个数的前缀总和是相同的，那么这些节点之间的元素总和为零。进一步扩展相同的想法，如果前缀总和currSum，在节点A和节点B处相差target，则位于节点A和节点B之间的元素之和是target。
// 因为本题中的路径是一棵树，从根往任一节点的路径上(不走回头路)，有且仅有一条路径，因为不存在环。(如果存在环，前缀和就不能用了，需要改造算法)
// 抵达当前节点(即B节点)后，将前缀和累加，然后查找在前缀和上，有没有前缀和currSum-target的节点(即A节点)，存在即表示从A到B有一条路径之和满足条件的情况。结果加上满足前缀和currSum-target的节点的数量。然后递归进入左右子树。
// 左右子树遍历完成之后，回到当前层，需要把当前节点添加的前缀和去除。避免回溯之后影响上一层。因为思想是前缀和，不属于前缀的，我们就要去掉它。

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */
class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
function pathSum(root: TreeNode | null, targetSum: number): number {
  const map = new Map();
  map.set(0, 1);

  function _preSumCount(root: TreeNode | null, curSum: number) {
    if (!root) return 0;
    let res = 0;
    curSum += root.val;

    //---核心代码
    // 看看root到当前节点这条路上是否存在节点前缀和加target为currSum的路径
    // 当前节点->root节点反推，有且仅有一条路径，如果此前有和为currSum-targetSum,而当前的和又为currSum,两者的差就肯定为target了
    // currSum-target相当于找路径的起点，起点的sum+targetSum=currSum，当前点到起点的距离就是target
    res += map.get(curSum - targetSum) || 0;
    // 更新路径上当前节点前缀和的个数
    map.set(curSum, (map.get(curSum) || 0) + 1);

    //---核心代码

    const left = _preSumCount(root.left, curSum);
    const right = _preSumCount(root.right, curSum);
    // if (left > 0 && root.val === 0) {
    //   left++;
    // }
    // if (right > 0 && root.val === 0) {
    //   right++;
    // }
    res = res + left + right;
    console.log(root.val, map, curSum);

    // 4.回到本层，恢复状态，去除当前节点的前缀和数量
    map.set(curSum, (map.get(curSum) || 0) - 1);

    return res;
  }
  // 前缀和为0的是1条路径
  return _preSumCount(root, 0);
}
// const node = new TreeNode(1);
// node.left = new TreeNode(-2);
// node.right = new TreeNode(-3);
// console.log(pathSum(node, -1));
const node = new TreeNode(0);
node.left = new TreeNode(1);
node.right = new TreeNode(1);
console.log(pathSum(node, 1));
// const node = new TreeNode(1);
// node.left = new TreeNode(-2);
// node.right = new TreeNode(-3);
// node.left.left = new TreeNode(1);
// node.left.right = new TreeNode(3);
// node.right.left = new TreeNode(-2);
// node.right.right = new TreeNode(null);
// node.left.left.left = new TreeNode(-1);
// console.log(pathSum(node, 3));
export { pathSum };
