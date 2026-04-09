# K个一组翻转链表
[K个一组翻转链表](https://leetcode.cn/problems/reverse-nodes-in-k-group/description/?envType=study-plan-v2&envId=top-100-liked)
虽然标注是困难题，实际上不是很难，各位扎实掌握头插法翻转链表这道题不算很难

## 代码
作者写的可能不是最简代码，但足够使用了
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
    ListNode* reverseKGroup(ListNode* head, int k) {
        //思路更可能是设置pre前驱指针和post尾指针维护
        //首先让我们设置虚拟头结点吧
        //使用头插法的思维进行插入
        ListNode* dummyhead=new ListNode;
        dummyhead->next =head;
        ListNode*pre =dummyhead;
        ListNode* post=head;//尾指针
        int count=0;//经过节点计数
        ListNode* p=pre;//工作指针
        ListNode* t=pre;//暂存指针
        ListNode* temp;//维护pre指针
        while(post!=nullptr)
        {   
            if(count%k==0 && count!=0)
            {
                p=pre->next;
                temp=p;                        
                pre->next=post;
                while(p!=post)//进行头插法
                {
                    t=p;
                    p=p->next;
                    t->next=pre->next;
                    pre->next=t;
                }
                pre=temp;//更新pre前驱
            }
            count++;
            post=post->next;
        }
        //在结尾我们还需要判断处理一次
        if(count%k==0)
        {
            p=pre->next;                       
            pre->next=post;
            while(p!=post)//进行头插法
            {
                t=p;
                p=p->next;
                t->next=pre->next;
                pre->next=t;
            }
        }


        ListNode* result=dummyhead->next;
        delete dummyhead;
        return result;
    }
};
```
时间复杂度O(n) 
空间复杂度O(1)
各位也可以使用栈来完成，不过链表我们就使用链表的做法更好