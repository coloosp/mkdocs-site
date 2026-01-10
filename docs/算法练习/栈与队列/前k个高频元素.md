# 前k个高频元素
优先队列正式登场！优先队列的特点就是会自动排序，我们访问时也只能访问和弹出顶端元素
## 代码（优先队列）
```
class Solution {
public:
    class mycompare{
public:
    bool operator()(const pair<int,int>&left ,const pair<int,int>&right){//小顶堆自定义排序
        return left.second >right.second;
    }

    };

    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map <int,int> map;
        for(int i=0;i<nums.size();i++){
            map[nums[i]]++;
        }

        priority_queue <pair<int,int>,vector<pair<int,int>>,mycompare> que;//小顶堆形式优先队列

        unordered_map <int,int> :: iterator it=map.begin();
        for(;it!=map.end();it++){
            que.push(*it);
            if(que.size()>k){
                que.pop();
            }
        }
            vector <int> result;
            for(int i=0;i<k;i++){
                result.push_back(que.top().first);
                que.pop();
            }

        return result;





    }
};
```
## 解析
这里我们使用哈希表来统计频次，然后利用迭代器按顺序访问并加入到优先队列中，最后使用结果数组收集即可。常态的优先队列是默认大顶堆排序，也就是堆顶元素是最大值，但是我们需要维护前k个最大频次，实际上我们每次需要弹出最小频次，所以应该是小顶堆结构（有些反常识），并且我们存储的是二元组，需要自定义排序，因为优先队列只需要维护自己的k个元素，实际上时间复杂度是O（nlogk）

那么可不可以先使用哈希表再转化为vector排序呢？
## 代码
```
class Solution {
public:

    static bool compare(const pair <int,int>&left,const pair <int,int>&right ){
            return left.second > right.second;
        }

    vector<int> topKFrequent(vector<int>& nums, int k) {
        unordered_map <int,int> map;
        for(int i=0;i<nums.size();i++){
            map[nums[i]]++;
        }

        vector <pair<int,int>> vec;

        unordered_map <int,int> ::iterator it=map.begin();
        for(;it!=map.end();it ++){
            vec.push_back(*it);
        }

        sort(vec.begin(),vec.end(),compare);
        
        vector <int> result;
        for(int i=0;i<k;i++){
            result.push_back(vec[i].first);
        }
        return result;
    }
};
```
## 解析
和前面思路接近，不得不说STL真是C++伟大的发明。值得一提的是在类里面使用sort的自定义排序函数需要是静态函数（我也忘了）
