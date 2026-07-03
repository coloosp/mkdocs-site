# 和为k的子数组

实际上是在求解连续子串的问题，实际上是前缀和的题目，注意连续序列和非连续序列的问题，如果题目要求的是非连续就可能考虑回溯之类的东西[组合总和](https://leetcode.cn/problems/combination-sum-ii/description/)比如这道题

另外因为这道题含义负数，不方便使用滑动窗口，因为你根本不知道该往哪里滑动

实际上我们可以先计算前缀和，表示的意思是直到下标i（下标i不算入）为止的总和
那么很好理解，下标a到下标b的总和应该是
s[b+1]-s[a],总之各位根据自己创建的前缀和数组处理下标

## 暴力算法
```
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        //使用前缀和的思想来完成
        int result=0;
        vector <int> sum(nums.size()+1,0);
        for(int i=1;i<=nums.size();i++){
            sum[i]=nums[i-1]+sum[i-1];
        }
        //本质上是两层暴力搜索
        for(int i=0;i<nums.size();i++){
            for(int j=i+1;j<=nums.size();j++){
                if(sum[j]-sum[i]==k)
                    result++;
            }
        }

        return result;
    }
};
```
时间复杂度O(n²)
空间复杂度O(n)
## 哈希表
各位是否想到了这里实际上是找一个数与另一个数的差？那其实我们梦开始的地方两数之和很类似啦
```
class Solution {
public:
    int subarraySum(vector<int>& nums, int k) {
        //使用前缀和的思想来完成+哈希表的方法来实现
        int result=0;
        vector <int> sum(nums.size()+1,0);
        for(int i=1;i<=nums.size();i++){
            sum[i]=nums[i-1]+sum[i-1];
        }
        unordered_map<int,int> hash;

        

        //使用哈希表搜索
        for(int i=0;i<=nums.size();i++){
            if(hash.count(sum[i]-k)!=0)
                result+=hash[sum[i]-k];

            hash[sum[i]]++;
        }

        return result;
    }
};
```

时间复杂度O(n)
空间复杂度O(n)

## unordered_map
unordered_map 是 C++ STL 中基于哈希表实现的无序键值对容器（键唯一），核心优势是 插入/查询/删除 操作的平均时间复杂度 O (1)
头文件`#include <unordered_map>`
值得注意的是检测mp[key]如果不存在会自动插入，这也是这到题需要检查的原因


| 操作方法                | 功能说明                                                                 | 示例                          |
|-------------------------|--------------------------------------------------------------------------|-------------------------------|
| `mp[key]`               | 访问/修改value：key存在则返回value，不存在则自动插入key，value初始化为0   | `hash[sum[i]]++;`（计数+1）|
| `mp.count(key)`         | 判断key是否存在：存在返回1，不存在返回0（因key唯一）| `if (hash.count(target)) {...}` |
| `mp.find(key)`          | 查询key：存在返回迭代器，不存在返回`mp.end()`                           | `auto it = hash.find(target);` |
| `mp.insert({k, v})`     | 插入键值对：key已存在则插入失败（不覆盖）| `hash.insert({0, 1});`（初始化前缀和0） |
| `mp.erase(key)`         | 删除key对应的键值对：key不存在则无操作                                 | `hash.erase(sum[i]);`         |
| `mp.size()`/`mp.empty()`| 获取键值对数量/判断是否为空                                             | `if (hash.empty()) return 0;` |

