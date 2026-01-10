# 翻转字符串II
[翻转字符串II](https://leetcode.cn/problems/reverse-string-ii/)
注意边界问题和条件的划分，实际上处理方式还是和前面的翻转字符串一样
## 代码
```
class Solution {
public:
    void reverse (string&s,int a,int b){
        for(int i=a,j=b;i<j;i++,j--){
            swap(s[i],s[j]);
        }
    }
    string reverseStr(string s, int k) {
        for(int i=0;i<s.size();i+=2*k){
            if(i+k >=s.size()){
                reverse(s,i,s.size()-1);
            }
            else{
                reverse(s,i,i+k-1);//注意，如果是翻转的k个字符，那么应该是i——（i+k-1）
            }


        }


    return s; 


    }
};
```
## 解析
本题描述了三种条件，实际上只需要两种处理形式即可，因为我们的i一直是翻转字符串的初始端（左端），一种情况是可以翻转k个字符，直接翻转即可，另一只是i到字符串末尾不足k个，那就把i到字符串末尾的所有字符全部翻转