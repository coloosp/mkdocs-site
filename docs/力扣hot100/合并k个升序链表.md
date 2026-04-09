# 合并k个升序链表
[合并k个升序链表](https://leetcode.cn/problems/merge-k-sorted-lists/?envType=study-plan-v2&envId=top-100-liked)
如果各位学习过外部排序，一定听说过k路归并排序以及败者树吧
可惜作者也只是了解并不知道败者树该怎么写，所以我们可以采取一些轻松的方式
先明确我们的思路，就是每一次加入最小的节点
我们可以使用堆的特性来记录当前加入堆中的最小节点，显而易见我们采用小顶堆，我们只会维护堆顶为最小值，至于堆的下面我们不关心

在C++中可以使用优先队列priority_queue来模拟堆的功能
各位可以现行了解一下堆，优先队列以及运算符重载的特性，我不能保证自己能够讲清楚这些

## 优先队列
```
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    struct cmp
    {
      bool operator()(const ListNode* a,const ListNode* b)
      {
        return a->val > b->val; //小顶堆
      }  
    };
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        priority_queue<ListNode*,vector<ListNode*>,cmp> pq;

        for(ListNode* head : lists) //先加入每个链表的头结点
        {
            if(head)
            {
                pq.push(head);
            }
        }
        ListNode dummyhead;
        ListNode* r=&dummyhead;
        while(!pq.empty())
        {
            ListNode* node=pq.top();//获取堆顶的节点
            r->next=node;
            r=node;
            pq.pop();
            if(node->next)  //如果该节点的链表还存在后继
            {
                pq.push(node->next);
            }
        }   
        return dummyhead.next;
    }
};
```
时间复杂度：O(nlogk)
空间复杂度：O(K)，每次只存储k个节点

看起来不算难，或许是因为我们使用了强大的STL,如果自己手搓链表为节点的堆看起来是有点困难的

## 暴力朴素
如果各位不清楚优先队列和堆，我们直接来点纯粹的，别管什么技巧了，见到题就是干！
```
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* mergeKLists(vector<ListNode*>& lists) {
        int k = lists.size();
        ListNode dummyhead;
        ListNode* r = &dummyhead;

        while (true) {
            int min = -1;
            for (int i = 0; i < k; i++) {  //找出首个非空节点
                if (lists[i]) {
                    min = i;
                    break;
                }
            }

            if (min == -1) //如果全为空停止
                break;

            for (int i = 0; i < k; i++) { //找出最小节点
                if (lists[i] && lists[i]->val < lists[min]->val) {
                    min = i;
                }
            }

            r->next = lists[min];
            r = lists[min];

            //更新lists的后续节点
            if (lists[min]->next) {
                lists[min] = lists[min]->next;
            } else {
                lists[min] = nullptr;
            }
        }
        r->next=nullptr;//置空
        return dummyhead.next;
    }
};
```
时间复杂度O(nk²)
空间复杂度O(1)