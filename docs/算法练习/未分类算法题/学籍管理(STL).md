# 学籍管理
[学籍管理](https://www.luogu.com.cn/problem/P5266)
好吧，这种水题还能待在提高-，使用map轻松解决吧（这份力量不属于你）
注意我们使用的是unordered_map，这种数据容器可以在查询的时候实现O(1)底层是哈希表
```
#include <iostream>
# include <vector>
# include <queue>
#include <algorithm>
# include <unordered_map>
// #include <bits/stdc++.h>
using namespace std;


int main() {
	int n;
	cin >> n;
	unordered_map <string, long long> map;
	int ans = 0;
	while (n--) {
		int choice;
		cin >> choice;
		if (choice == 1) {
			string name;
			long long score;
			cin >> name >> score;
			if (map.find(name) == map.end()) {
				ans++;
			}
			map[name] = score;
			cout << "OK" << endl;
		}
		else if (choice == 2) {
			string name;
			cin >> name;
			if (map.find(name) != map.end()) {
				cout << map[name] << endl;
			}
			else {
				cout << "Not found" << endl;
			}
		}
		else if (choice ==3) {
			string name;
			cin >> name;
			if (map.find(name) != map.end()) {
				map.erase(name);
				cout << "Deleted successfully" << endl;
				ans--;
			}
			else {
				cout << "Not found" << endl;
			}
		}
		else if (choice == 4) {
			cout << ans << endl;
		}

	}





	return 0;
}
```