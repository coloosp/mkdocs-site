# 组合总和 III
[组合总和](https://leetcode.cn/problems/combination-sum-iii/description/)
和前面的做法差不多，这里我们不是检查元素数量，而是检查元素数量之后再检查元素之和，思路接近，试着击败它吧！

## 代码
```
class Solution {
public:
    vector <vector<int>> result;
    vector <int> path;
    void backtracking(int n,int k,int index){
        if(path.size()==k){
            int ans=0;
            for(int i=0;i<path.size();i++){
                ans+=path[i];
            }
            if(ans==n){
                result.push_back(path);
            }
            return ;
        }
        for(int i=index;i<=9;i++){
            path.push_back(i);
            backtracking(n,k,i+1);
            path.pop_back();
        }



    }




    vector<vector<int>> combinationSum3(int k, int n) {
        backtracking(n,k,1);
        return result;




    }
}; 
```

## 解析
嘛，应该没什么好说的了，如果清楚前面一道题的话，这里应该很容易理解倒是