### 时间复杂度

logn 是树
mn 是 回朔算法

### 链表

树：
1. 树是链表的衍生

指针
link: https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484505&idx=1&sn=0e9517f7c4021df0e6146c6b2b0c4aba&chksm=9bd7fa51aca07347009c591c403b3228f41617806429e738165bd58d60220bf8f15f92ff8a2e&scene=21#wechat_redirect
1. 快慢指针
 a. 链表中是否有环
 b. 环的起始位置
 c. 寻找链表的中点
 d. 寻找链表的倒数第K个数
2. 左右指针
 a. 二分查找
 b. 两数之和
 c. 反转数组
 d. 互动窗口算法

### 树

1. 快速排序就是二叉数的前序遍历
2. 归并排序就是二叉树的后续遍历

#### 快速排序

快速排序的逻辑是，若要对nums[lo..hi]进行排序，我们先找一个分界点p，通过交换元素使得nums[lo..p-1]都小于等于nums[p]，且nums[p+1..hi]都大于nums[p]，然后递归地去nums[lo..p-1]和nums[p+1..hi]中寻找新的分界点，最后整个数组就被排序了。

快速排序的代码框架如下：

void sort(int[] nums, int lo, int hi) {

    /****** 前序遍历位置 ******/
    // 通过交换元素构建分界点 p
    int p = partition(nums, lo, hi);
    /************************/

    sort(nums, lo, p - 1);
    sort(nums, p + 1, hi);

}

#### 归并排序

归并排序的逻辑，若要对nums[lo..hi]进行排序，我们先对nums[lo..mid]排序，再对nums[mid+1..hi]排序，最后把这两个有序的子数组合并，整个数组就排好序了。

归并排序的代码框架如下：

void sort(int[] nums, int lo, int hi) {

    int mid = (lo + hi) / 2;
    sort(nums, lo, mid);
    sort(nums, mid + 1, hi);

    /****** 后序遍历位置 ******/
    // 合并两个排好序的子数组
    merge(nums, lo, mid, hi);
    /************************/

}
先对左右子数组排序，然后合并

### 动态规划

1. 主要用于求最值 - 穷举所有结果
重叠子问题
最优子结构
状态转移方程

明确「状态」 -> 定义 dp 数组/函数的含义 -> 明确「选择」-> 明确 base case。

##### 动态规划答疑篇

1. dp数组遍历方向
2. 最优子结构
