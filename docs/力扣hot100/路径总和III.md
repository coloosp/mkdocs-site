# 路径总和III
[路径总和III](https://leetcode.cn/problems/path-sum-iii/description/?envType=study-plan-v2&envId=top-100-liked)
各位请不要着急思考优化方案，各位想想怎么暴力完成这道题，或者说，如果只限定根节点开始的路径该如何计算
这其实不难想，使用先序遍历搜索即可，在每个节点处判断是否符合条件(比较类似于寻找二叉树中某一个特定值的节点个数)

我们知道二叉树本身是递归定义的，左子树本身也可以称为一棵树，思路很简单，对于所有节点都当做根节点进行搜索一遍，也就是进行时间复杂度为O(n²)的搜索

## 暴力算法
```
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    //确定从当前节点开始满足的路径数
    int dfs(TreeNode* node,long long target)
    {
        if(node==nullptr)
        {
            return 0;
        }
        int result=0;
        if(node->val==target) //如果当前节点满足条件
            result++;
        int lf=dfs(node->left,target-node->val);//搜索其左边路径
        int rt=dfs(node->right,target-node->val);//搜索其右边路径
        return lf+rt+result;
    }
    int pathSum(TreeNode* root, int targetSum) {
        //来使用最暴力的算法吧！
        if(root==nullptr)
            return 0;
        int result=dfs(root,targetSum);//搜索以根节点为根的路径数
        int lf=pathSum(root->left,targetSum);//搜索以左孩子为根的左子树的路径数
        int rt=pathSum(root->right,targetSum);
        return result+lf+rt;
    }
};
```

时间复杂度O(N²)
空间复杂度O(1)

## 回溯+哈希+前缀和
对于这道题的回溯需要一定的熟练度，如果各位还不清楚回溯的话可以看看[回溯杂谈](https://coloosp.github.io/mkdocs-site/算法杂谈/backtrack/)，或者跳过这种方法等写过一定的回溯题再来完成。
不算好想啊，首先这三个知识点就不算简单，并且我们根本就没做到回溯啊可恶(╬▔皿▔)╯，哈希表很好解释，如果各位还记得我们的梦开始的地方[两数之和](https://leetcode.cn/problems/two-sum?envType=study-plan-v2&envId=top-100-liked)

就知道为什么要使用哈希表了，哈希+前缀和的思想在[和为k的子数组](https://leetcode.cn/problems/subarray-sum-equals-k/submissions/695604896/)中也有使用，有趣的是这道题有两种解法，一种是回溯，一种是哈希+前缀和。

各位如果完成了上述题目，就知道为什么要使用哈希+前缀和了，**这是因为我们要搜索一个区间段的值**，这种情况我们需要知道从原点到b点的值-从原点到a点的值，就可以知道(a,b]区间段的值了

为什么要使用回溯？因为对于二叉树来说不止一条路径，也就是说我们会走回头路，回溯就是因为我们在对于一条路径搜索结束后返回的特性，因为函数栈会自动帮我们恢复一些参数，所以平时在完成递归/前序遍历时我们不会察觉到回溯，但这里我们需要恢复哈希表的原先状态，所以显式表现出了回溯的写法，这是我的理解

虽然代码看起来很简洁，但是用到的方法并不简单

```
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    unordered_map <long long,int> hashmap; //全局哈希表
    int result=0;
    
    //sum存储的是根节点到node的值
    void backtracking(TreeNode* node,long long sum,int targetSum)
    {
        if(node==nullptr)
            return;

        sum+=node->val;

        result+=hashmap[sum-targetSum];

        hashmap[sum]++;//插入sum值

        backtracking(node->left,sum,targetSum);
        backtracking(node->right,sum,targetSum);

        hashmap[sum]--;//撤回该节点的插入值
    }
    int pathSum(TreeNode* root, int targetSum) {
        //回溯与前缀和！
        hashmap[0]=1;//需要提前插入这个键值对，这是相当必要的！
        backtracking(root,0,targetSum);
        return result;
    }
};
```

时间复杂度O(n)
空间复杂度O(n)
