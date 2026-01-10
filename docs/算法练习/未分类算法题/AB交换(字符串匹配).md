# AB交换
[AB交换](https://www.luogu.com.cn/problem/U535982)

对于这种题，实际上我们只有两种策略，ABABABAB,或者BABABAB,而我们知道一次修改可以改正两个位置错误，所以只需要统计两种策略需要修改的位置错误最小值即可

```
 #include <bits/stdc++.h>
using namespace std;


int main() {
	int a;
	cin >> a;
	while (a--) {
		long long n;
		cin >> n;
		string s;
		cin >> s;
		string target_AB = "";
		string target_BA = "";
		for (int i = 0; i < n; i++) {
			target_AB += "AB";
			target_BA += "BA";
		}

		int dif_a = 0;
		int dif_b = 0;
		for (long long i = 0; i < 2 * n; i++) {
			if (s[i] != target_AB[i]) {
				dif_a++;
			}
			else if (s[i] != target_BA[i]) {
				dif_b++;
			}
		}
		cout << min(dif_a, dif_b) / 2<<endl;

	}








	return 0;
}
```