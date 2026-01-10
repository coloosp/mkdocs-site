# 螺旋矩阵 II
[螺旋矩阵](https://leetcode.cn/problems/spiral-matrix-ii/)
小时候最害怕的一集，虽然现在也不能说百分百做出来，嗯，考验代码基本功的题目，关键在于正确判断数组的边界条件，对于每一次循环需要同样的处理，理清思路才能做对
## 代码
```
class Solution {
public:
    vector<vector<int>> generateMatrix(int n) {
        vector <vector<int>> matrix(n,vector<int>(n,0));
        int startx=0;
        int starty=0;
        int loop=n/2;//循环次数为n的一般
        int count=1;//计数器
        int offset=1;//为了保持左闭右开的边界条件
        int i,j;
        while(loop--){
            i=startx;
            j=starty;

            for(;j<n-offset;j++){
                matrix[i][j]=count++;
            }

            for(;i<n-offset;i++){
                matrix[i][j]=count++;
            }

            for(;j>starty;j--){
                matrix[i][j]=count++;
            }

            for(;i>startx;i--){
                matrix[i][j]=count++;
            }

            startx++;
            starty++;
            offset++;
        }

        if(n % 2 ==1){
            matrix[n/2][n/2]=count;
        }
           return matrix;
    }
};
```

## 解析
这里采用了左闭右开的形式来处理每一次遍历边，四条边为一循环，也就是说，对于一个边长为n的正方形需要循环n/2次，每一次循环后，遍历的长度都会少1，并且i和j的初始位置都会加1，按照这样的思路来完成吧