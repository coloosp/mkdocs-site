# 数组中第K个最大元素
[数组中第K个最大元素](https://leetcode.cn/problems/kth-largest-element-in-an-array/description/?envType=study-plan-v2&envId=top-100-liked)

好吧直接说思路，这道题要实现O(n)的时间复杂度意味着我们必须在一趟遍历中实现排序，目前实际上还没有哪一个算法能够稳定在任何情况做到(真的可能有这种算法吗)

我们转换一下思路，我们需要把所有元素排序吗？不需要，我们只需要找到第K个最大元素，换句话说，我们只需要维护前k个元素的有序性即可

也就是我们这一章的主题了，堆与堆排序，说到这里，我们需要实现最小堆还是最大堆呢？答案应该是最小堆，有点反常识，如果只能检查堆顶的话，最大堆只能做到找到所有元素的最大值(如果是这样就用不上堆了)

我们的思路是维护一个k大小的最小堆(堆顶为这个堆的最小值)，当有新数值遍历到，如果这个值大于堆顶时，我们弹出堆顶并加入该数值。最后我们会得到堆中最大的k个元素，并且堆顶为第k个最大元素

每一次维护堆的有序性都是常数的时间复杂度，所以总体的时间复杂度只有O(n)

作者使用的是C++，已经有无敌的优先队列可以实现堆了，哈哈哈

```
class Solution {
public:
    int findKthLargest(vector<int>& nums, int k) {
        //我们C++有正义的优先队列
        //我们会实现一个大小为k的小顶堆，当堆顶比后续遍历元素更小是弹出

        priority_queue<int,vector<int>,greater<int>> pq;
        for(int i=0;i<k;i++)
            {
                pq.push(nums[i]);
            }
        
        for(int i=k;i<nums.size();i++)
        {
            if(pq.top() <nums[i])
            {
                pq.pop();
                pq.push(nums[i]);
            }
        }

        return pq.top();
    }
};
```
时间复杂度O(n)
空间复杂度O(1)
当然也不要忘了基本功，让我们来自己实现一遍堆吧！
```
class Solution {
public:
    //将heap[k]位置的节点调整到正确的位置
    void heapAdjust(vector<int>&heap,int x,int len)
    {
        heap[0]=heap[x];
        for(int i=2*x;i<=len;i*=2)
        {
            //选择更小的叶子节点
            if(i<len && heap[i] >heap[i+1])
                {
                    i++;
                }
            //下沉结束
            if(heap[0]<=heap[i])
                break;
            else
                {
                    heap[x]=heap[i];//将heap[i]对应上移
                    x=i;//移动x此时的下标
                }
        }
        heap[x]=heap[0];//放入heap[x]最终位置
    }

    void buildMinHeap(vector<int>&heap,int len)
    {
        for(int i=len/2;i>0;i--) //从一般开始向上调整
            {
                heapAdjust(heap,i,len);
            }
    }


    int findKthLargest(vector<int>& nums, int k) {
       vector<int> heap(k+1); 

       for(int i=0;i<k;i++)
        {
            heap[i+1]=nums[i];
        }

        buildMinHeap(heap,k);
        
        for(int i=k;i<nums.size();i++)
        {
            //遇到更大值弹出堆顶元素，并加入更大值调整
            if(nums[i] >heap[1])
                {
                    heap[1]=nums[i];
                    heapAdjust(heap,1,k);
                }
        }

        return heap[1];//注意0是哨兵位置
    }
};
```

因为作者本质懒b，后面就用优先队列实现吧！


