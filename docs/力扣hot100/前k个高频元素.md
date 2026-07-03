# 前k个高频元素
[前k个高频元素](https://leetcode.cn/problems/top-k-frequent-elements/description/?envType=study-plan-v2&envId=top-100-liked)

本题的思路和上一题完全一样，我们先使用哈希表统计频率，再使用优先队列排序前k个即可

可能一些STL与C++迭代器的知识各位不了解，作者可能讲不清楚，各位如果不了解可以自行搜索

应该提到的是优先队列的自定义排序功能
因为我们要统计的是<数字，频次>的二元组形式，所以需要优先队列根据二元组的第二个值排序

`priority_queue<存储节点，存储容器,自定义类>`

思路相同，应该没什么好说的

```
class Solution {
public:
    struct cmp{
        bool operator()(const pair<int,int>&left,const pair<int,int>&right)
        {
            return left.second >right.second;//小顶堆
        }
    };

    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map<int,int> freqHash;//频率哈希表
        for(int i=0;i<nums.size();i++)
        {
            freqHash[nums[i]]++;
        }

        priority_queue <pair<int,int>,vector<pair<int,int>>,cmp> pq;//优先队列

        unordered_map<int,int>::iterator it=freqHash.begin();
        for(;it!=freqHash.end();it++)
        {
            pq.push(*it);//加入迭代器解引用
            if(pq.size()>k) //加入后超过k个弹出一个
            {
                pq.pop();
            }
        }

        vector<int> result;

        //收集结果
        while(!pq.empty())
        {
            result.push_back(pq.top().first);
            pq.pop();
        }

        return result;
    }
};
```

时间复杂度O(n)
空间复杂度O(n)

