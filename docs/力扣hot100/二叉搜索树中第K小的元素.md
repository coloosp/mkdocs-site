# 二叉搜索树中第K小的元素
[二叉搜索树中第K小的元素](https://leetcode.cn/problems/kth-smallest-element-in-a-bst/description/?envType=study-plan-v2&envId=top-100-liked)

和前面一样，只要知道二叉搜索树中序遍历的特性就能简单完成，作者懒得想了用了偷懒的方法(貌似大佬们也是这样写的，所以没啥问题)

使用一个数组收集后返回就行
各位要是节省空间的话使用count计数也行

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
    void inorder(TreeNode* root,vector<int>& nums)
    {
        if(root==nullptr)
            return;
        inorder(root->left,nums);
        nums.push_back(root->val);
        inorder(root->right,nums);
    }
    int kthSmallest(TreeNode* root, int k) {
        vector <int> nums;
        inorder(root,nums);
        return nums[k-1];
    }
};
```
时间复杂度O(n)
空间复杂度O(n)

