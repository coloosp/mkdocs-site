# 删除链表的倒数第n个节点
[删除链表倒数第n个节点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)
朴素方法可能是遍历整个链表计算长度，然后再来一次删除节点，这里使用双指针，方法还是很巧妙的
## 代码
```
class Solution {
public:
    ListNode* removeNthFromEnd(ListNode* head, int n) {
        ListNode* DummyHead=new ListNode(0);
        DummyHead->next=head;
        ListNode* fast=DummyHead;
        ListNode* slow=DummyHead;
        n++;
        while(n-- && fast!=nullptr){
            fast=fast->next;
        }
        while(fast!=nullptr && slow !=nullptr){
                fast=fast->next;
                slow=slow->next;
        }
        ListNode *tmp=slow->next;
        slow->next=slow->next->next;
        delete tmp;

        return DummyHead->next;

    }
};
```
## 解析
双指针法，实际上还是很容易理解的，fast先移动n+1次，然后慢指针和快指针一起移动，当fast移动到nullptr时，slow刚好会移动到倒数第n+1个节点，然后删除即可（不要忘了删除对应节点防止内存泄漏）