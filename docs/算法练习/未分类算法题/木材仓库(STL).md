# 木材仓库（STL）
[木材仓库](https://www.luogu.com.cn/problem/P5250)
比前面的踹哈精神要厉害一点，不过也是水题哈哈
或许应该使用二分或者其他来查找，不过stl再深一点我也不会啦

```
#include <iostream>
# include <vector>
# include <queue>
#include <algorithm>
# include <unordered_map>
# include <unordered_set>
// #include <bits/stdc++.h>
using namespace std;


int main() {
	int n;
	cin >> n;
	unordered_set <long long> st;
	while (n--) {
		int choice;
		cin >> choice;
		if (choice == 1) {
			long long len;
			cin >> len;
			if (st.find(len) != st.end()) {
				cout << "Already Exist" << endl;
				continue;
			}
			st.insert(len);
		}

		else if (choice == 2) {
			long long len;
			cin >> len;
			if (st.empty()) {
				cout << "Empty" << endl;
			}
			else if (st.find(len) != st.end()) {
				cout << len << endl;
				st.erase(len);
			}
			else {
				long long nlen = 0;
				long long sublen = INT_MAX;
				for (unordered_set<long long>::iterator it = st.begin(); it != st.end(); it++) {
					if (abs(*it - len) < sublen) {
						nlen = *it;
						sublen = abs(*it - len);
					}
					else if (abs(*it - len) == sublen) {
						if (*it < nlen) {
							nlen = *it;
						}
					}

				}//写这么多if你想死吗

				st.erase(nlen);
				cout << nlen << endl;

			}
		}


	}





	return 0;
}
```