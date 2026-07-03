# n皇后
[n皇后](https://leetcode.cn/problems/n-queens/?envType=study-plan-v2&envId=top-100-liked)

不瞒各位，这道题作者写了不下五遍，属于是回溯的老朋友了，各位写完这道题对回溯也有足够的了解了

这其实是一个有趣的数学问题，但计算机的解决方式显然是一力破万法

## 解析
其实这道题很简单，你第一眼想到该怎么做？
我们先摆一个皇后，然后接着在下一行摆下一个棋子，然后检查是否合法，合法就继续，不合法就更新下一列

也就是暴力尝试，把所有可能性列举一遍

仅仅是这里需要检查是否合法，或许才是这道题的精髓
我们在前面已经认识到如何检查合法性了
```
void isValid();

void backtracking(参数) {
    if (终止条件 && 筛选函数) {
        存放结果;
        return;
    }

    for (选择：下一层集合中元素）) {
    if(筛选函数){
        处理节点;
        backtracking(路径，选择列表); // 递归
        回溯，撤销处理结果
        }
    }
}


```

首先说明，我们会在每行限定摆一颗棋子，然后转到下一行，知道我们摆到最后一行都合法就结束，并且收集结果

因此我们只需要检查正上方，左上方，右上方即可
因为其他地方当前一定还没放棋子

最后看看回溯递归三步：
1. 确定传入参数：棋盘，因为这里需要确定长度n所有不能作为全局变量，n，当前行数row
2. 确定终止条件：当row==n时说明搜索到了最后一行，可以结束
3. 单层逻辑：很简单，检查该行各列是否合法，在合法的位置放入棋子并进入下一行

## 代码
```
class Solution {
public:
    vector<vector<string>> result;

    //检查是否合法
    bool isValid(vector<string>&board,int n,int row,int col)
    {
        //只需要检测该行的上方，左上角，右上角即可
        for(int i=row-1;i>=0;i--)//正上方
        {
            if(board[i][col]=='Q')
                return false;
        }

        for(int i=1;row-i>=0 &&col-i>=0;i++)//左上方
        {
            if(board[row-i][col-i]=='Q')
                return false;
        }

        for(int i=1;row-i>=0 &&col+i<n;i++)//右上方
        {
            if(board[row-i][col+i]=='Q')
                return false;
        }

        return true;
    }

    void backtracking(vector<string>&board,int n,int row)
    {
        if(row==n)
        {
            result.push_back(board);
            return ;
        }

        for(int i=0;i<n;i++)
        {
            if(isValid(board,n,row,i))//判断当前棋子是否合法
            {
                board[row][i]='Q';
                backtracking(board,n,row+1);
                board[row][i]='.';
            }
        }
    }

    vector<vector<string>> solveNQueens(int n) {
       vector<string> board(n,string(n,'.')); //棋盘
        backtracking(board,n,0);
        return result;

    }
};
```

这是一道经典套路题，不过也是相当出名的困难题，解决困难题是让人开心的，做到这里的你值得这样的开心

回溯章节结束

