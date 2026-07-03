# k倍区间（前缀和）
[k倍区间](https://www.luogu.com.cn/problem/P8649)
变态的时间复杂度要求，我们利用O（n²）就会直接暴死
同余

## 代码
```
#include <iostream>
using namespace std;
#define int long long
int cnt[100005];
signed main() {


	int n, k;
	cin >> n >> k;
	int sumd = 0;
	for (int i = 1; i <= n; i++) {
		int a;
		cin >> a;
		sumd = (sumd + a) % k;
		cnt[sumd]++;
	}
	cnt[0]++;
	int result = 0;
	for (int i = 0; i < k; i++) {
		result += cnt[i] * (cnt[i] - 1) / 2;
	}
	cout << result;



	
}
```

## 解析
这里首先必须要求long long，
我们需要理解一个概念，我们利用前缀和，sumdI(r0)-sumd(l0-1)这个值与k取模，如果等于0，当然是k倍区间。但实际上，如果sumd(a1)与sumd(a2)除以k的余数相等，(a1,a2)也是k倍区间。也就是把相同余数的区间两两组合，就可以得到k倍区间。这里我们还需要对于0余数特殊处理，很好理解，我们计算的都是（0，r）,如果需要两两组合，实际上0区间没有被统计进去，故+1