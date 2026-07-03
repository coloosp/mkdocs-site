# A-B数对（哈希）
[A-B数对](https://www.luogu.com.cn/problem/P1102)
哈希就完了，见到这种匹配问题哈希几乎是必考虑的，不仅是书写上的最佳，也几乎是时间复杂度的最佳，其次才是回溯与dp

```
#include <iostream>
# include <vector>
# include <queue>
# include <unordered_map>
// #include <bits/stdc++.h>
using namespace std;

int main() {
	long long n, c;
	cin >> n >> c;
	vector <long long > nums(n + 1, 0);
	unordered_map <long, long> hash;
	for (long long i = 0; i < n; i++) {
		long long a;
		cin >> a;
		nums[i] = a;
		hash[a]++;
	}
	long long result = 0;
	for (long long i = 0; i < n; i++) {
		if (hash.find(nums[i] - c) != hash.end()) {
			result+=hash[nums[i]-c];
		}
	}

	cout << result << endl;


	return 0;
}
```
