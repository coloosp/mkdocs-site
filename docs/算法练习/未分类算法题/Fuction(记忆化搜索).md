# Fuction（记忆化搜索）
[记忆化搜索](https://www.luogu.com.cn/problem/P1464)
记忆化搜索！我也是第一次接触这个，实际上很好理解，我们把计算过的保留，如果检测到没有计算过的才进行计算。是不是有点耳熟，像是动规？
代码很简单，嗯，思想很重要，记搜的好题，属于隔两个月可以拿出来看的
```
#include <iostream>
# include <vector>
# include <queue>
#include <algorithm>
# include <unordered_map>
# include <unordered_set>
# include <cmath>
// #include <bits/stdc++.h>
using namespace std;
long long dp[25][25][25];

long long w(long long a,long long b,long long c) {
	if (a <= 0 || b <= 0 || c <= 0) return 1;

	 if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);

	 if (a < b && b < c) {
		if (dp[a][b][c - 1] == 0) {
			dp[a][b][c - 1] = w(a, b, c - 1);
		}

		if (dp[a][b - 1][c - 1] == 0) {
			dp[a][b - 1][c - 1] = w(a, b - 1, c - 1);
		}

		if (dp[a][b - 1][c]==0) {
			dp[a][b - 1][c] = w(a, b - 1, c);
		}

		dp[a][b][c] = dp[a][b][c - 1] + dp[a][b - 1][c - 1] - dp[a][b - 1][c];

	}

	else {
		if (dp[a - 1][b][c] == 0) {
			dp[a - 1][b][c] = w(a - 1, b, c);
		}
		if (dp[a - 1][b][c - 1]==0) {
			dp[a - 1][b][c - 1] = w(a - 1, b, c - 1);
		}
		if (dp[a - 1][b - 1][c]==0) {
			dp[a - 1][b - 1][c] = w(a - 1, b - 1, c);
		}
		if (dp[a - 1][b - 1][c - 1] == 0) {
			dp[a - 1][b - 1][c - 1] = w(a - 1, b - 1, c - 1);
		}
		dp[a][b][c] = dp[a - 1][b][c] + dp[a - 1][b][c - 1] + dp[a - 1][b - 1][c] - dp[a - 1][b - 1][c - 1];
	}
	


	return dp[a][b][c];

}

int main() {
	
	while (true) {
		long long a, b, c;
		cin >> a >> b >> c;
		if (a == -1 && b == -1 && c == -1) {
			break;
		}
		cout <<"w("<<a<<", "<<b<<", "<<c<<")"<<" = " << w(a, b, c) << endl;
	}





	return 0;
}
```

，，，注意卡输出，，，