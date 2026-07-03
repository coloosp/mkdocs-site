# 删除链表的倒数第N个节点
[删除链表的倒数第N个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/?envType=study-plan-v2&envId=top-100-liked)

这道题当然也可以计算链表的长度再移动len-n的长度删除，但这样真的还算是中等题的思路吗

本题采用双指针来解决，应该是这道题的标准解法

测试案例说明n小于链表长度，不用担心超过链表的问题，但是其他地方的类似题应该考虑这一点

总之使用头结点应该是很好的选择

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
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        //首先我们还得手搓一个头结点，保证不会被空节点坑
        //使用双指针来实现这道题，思路是先让fast指针走n格，然后slow和fast一起走
        //当fast->next指向nullptr时，slow会指向倒数第n个节点的前驱，就可以实现删除了
        ListNode* dummyHead =new ListNode; //虚拟头结点
        dummyHead->next=head;
        ListNode*fast=dummyHead;
        ListNode*slow=dummyHead;

        int i=0;
        while(fast!=nullptr && i<n){
            i++;
            fast=fast->next;
        }



        while(fast!=nullptr&&fast->next!=nullptr){
            slow=slow->next;
            fast=fast->next;
        }

        ListNode * t=slow->next;
        slow->next=t->next;
        delete t;
         ListNode *result=dummyHead->next;
         delete dummyHead;
         return result;


    }
};
```