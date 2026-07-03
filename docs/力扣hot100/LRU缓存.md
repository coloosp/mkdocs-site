# LRU缓存
[LRU缓存](https://leetcode.cn/problems/lru-cache/description/?envType=study-plan-v2&envId=top-100-liked)
如果各位学习过操作系统，肯定听说过这个LRU最近最少使用算法，如果各位初见这道题真的可以算是困难题了，不过不用担心，这种属于经典题目，按照固定套路来就行

给大家简单翻译一下到底在做什么？
想象我们有一个队列或者数组，这个容器有最大的内存上限与两个操作
* get操作是访问，被访问的节点会被移动到尾部（我们把尾部当做新的，首部当成旧的），并且获取该节点的值。
* put操作有两种情况，当我们put的key已经存在，说明节点已经存在，这个时候我们需要更新该节点，即不仅更新节点值，并且将其移动到尾部；否则如果不存在对应节点需要加入新节点，首先需要检查容量是否已满，如果满了弹出队首元素，这是最久未使用元素，然后加入新的节点

使用的数据结构有双向链表和哈希表
双向链表是因为我们需要从首部和尾部移除与加入元素，这样做更方便
哈希表是因为当检索元素时不管是什么链表时间复杂度都是O(n)，使用哈希表可以把这个过程压缩到O(1)

来看看我们的实现步骤：
在私有private中
1. 构造Node结构体
2. 实现哈希表，容量与头尾哨兵节点L，R
3. 实现remove函数，移除指定元素，这是双向链表优于单链表的好处，单链表必须知道前驱节点才能实现O(1)
4. 实现insert函数，在尾部插入节点

在public中
1. 实现初始化，初始化容量，哨兵节点L与R
2. 实现get函数，如果能够访问到对应key，更新到尾部并返回其值，否则返回-1
3. 实现put函数，如果存在对应节点，更新值并且更新到尾部。否则检查容量是否已满，已满时弹出队首老东西再插入新节点，未满时直接插入新节点到队尾

```
class LRUCache {
private:
    struct Node {
        int key;
        int value;
        Node *pre, *next;
        Node(int k, int v) {
            key = k;
            value = v;
            pre = nullptr;
            next = nullptr;
        }
    };
    int n;                          // 容量
    unordered_map<int, Node*> hash; // 哈希表
    Node *L, *R;                    // L是头部哨兵节点，R是尾部哨兵节点

    // 移除对应节点
    void remove(Node* node) {
        Node* prenode = node->pre;
        Node* nextnode = node->next;

        prenode->next = nextnode;
        nextnode->pre = prenode;
        hash.erase(node->key);
    }

    // 插入新节点到尾部
    void insert(int key, int value) {
        Node* prenode = R->pre;

        Node* newnode = new Node(key, value);

        newnode->pre = prenode;
        newnode->next = R;

        R->pre = newnode;
        prenode->next = newnode;
        hash[key] = newnode;
    }

public:
    LRUCache(int capacity) {
        n = capacity;

        L = new Node(-1, -1);
        R = new Node(-1, -1);

        L->next = R;
        R->pre = L;
    }

    // 访问并更新节点
    int get(int key) {
        if (hash.find(key) != hash.end()) // 找到对应节点
        {
            Node* node = hash[key];
            remove(node);                   // 移除
            insert(node->key, node->value); // 并更新

            return node->value;
        } else
            return -1;
    }

    // 执行两种操作如果存在节点则更新数据
    // 如果不存在，判断容量是否已满，满则弹出老东西，否则直接加入
    void put(int key, int value) {
        if (hash.find(key) != hash.end()) {
            Node* node = hash[key];
            remove(node);
            insert(key, value); // 注意传入的是新的值
        } else {
            if (hash.size() == n) // 容量已满
            {
                Node* oldnode = L->next; // 老东西该滚蛋了
                remove(oldnode);
                insert(key, value);
            } else
                insert(key, value);
        }
    }
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache* obj = new LRUCache(capacity);
 * int param_1 = obj->get(key);
 * obj->put(key,value);
 */
```

实现get和put时时间复杂度都为O(1)
空间复杂度为O(n) 

恭喜各位完成链表章节
