# 寻宝（prim算法）
[寻宝](https://kamacoder.com/problempage.php?pid=1053)

## 代码
```
# include <iostream>
# include <vector>
# include <climits>
using namespace std;
int main(){
	int v,e;
	cin >>v>>e;
	vector <vector <int>> graph (v+1,vector <int>(v+1,10001));
	int i,j,l;
	while(e--){
		cin >>i>>j>>l;
		graph[i][j]=l;
		graph[j][i]=l;
	}//制图

	vector <bool >  isTree(v+1,false);//判断节点是否在生成树中
	vector <int> minDist(v+1,10001);//生成树到其他节点的最小距离

	for(int i=1;i<v;i++){
		int minval=INT_MAX;
		int cur=-1;

		for(int j=1;j<=v;j++){
			if(!isTree[j] && minval >minDist[j]){
				minval=minDist[j];
				cur =j;
			}
		}//将距离生成树最近的节点设置为当前节点cur

		isTree[cur]=true;//将cur加入生成树

		for(int k=1;k<=v;k++){
			
			if(!isTree[k] && minDist[k] > graph[cur][k]){
				minDist[k]=graph[cur][k];
			}

		}//更新minDist数组

	}
	int result=0;
	for(int i=2;i<=v;i++){
		result+=minDist[i];
	}
	 
	cout <<result <<endl;

}
```

## 解析
最小生成树问题：如何选取一张无向图，能够连通所有节点且总路径最小

prim算法在于对节点的处理，
按照一下三步解决问题：
1. 将未在生成树中且距离生成树最近的节点作为当前节点
2. 将当前节点加入生成树中
3. 根据当前节点更新minDist数组

prim是基于贪心的算法，这个算法的核心思想是每次总加入最小的边，知道包含全部节点。

应该更新几次才能把n个节点全部连通呢？
答案是n-1次，因为我们会实现一个最小生成树，是一个不成环的图（如果成环意味着至少同时有两个节点连接了一个节点，这样显然不是最小的路径了）

为什么是将minDist数组的i=2开始的值累加就是最小路径呢？实际上可以想象我们minDist的更新过程，minDist可以分成两部分，已经在生成树中的部分（这一部分以后不会更新，它们的含义指在生成树中由x到它的最小路径，而x指的是当时被包含在生成树的cur节点），不在生成树的节点，它们的minDist值指距离最小生成树的最小路径距离。

要记住我们最后加的是边，minDist[1],指节点1到节点1的距离（这显然没有意义），minDist[2]开始才是边的含义