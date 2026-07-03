# perket（回溯）

简单的回溯，检测每一次的酸苦度值即可

```
#include <bits/stdc++.h>
using namespace std;

int s_sum = 1;
int b_sum = 0;
int result = INT_MAX;
void backtracking(int n,vector<int>&s,vector <int>&b,int index) {
	if (index == n) {
		return;
	}

	for (int i = index; i < n; i++) {
		s_sum *= s[i];
		b_sum += b[i];
		result = min(result,abs(s_sum - b_sum));
		backtracking(n, s, b, i + 1);
		s_sum /= s[i];
		b_sum -= b[i];
	}
}



int main() {
	int n;
	cin >> n;
	vector <int> s(n);
	vector <int> b(n);
	int a1,a2 ;
	for (int i = 0; i < n; i++) {
		cin >> a1 ;
		cin >> a2;
		s[i] = a1;
		b[i] = a2;
	}
	backtracking(n, s, b, 0);

	cout << result << endl;


}
```