---
title: "力扣排名记录"
date: 2026-10-20 15:15:00
draft: false
categories: ["随笔"]
tags: ["随笔"]
feature: "feature.jpg" 
summary: "一点一线一面"
---

## 力扣排名记录

| 时间         | 排名      |
| :--------- | :------ |
| 2026.10.22 | 34, 340 |
| 2026.10.23 | 33, 579 |
| 2026.10.24 | 31, 323 |
| 2026.10.25 | 29, 294 |
| 2026.10.26 | 27, 869 |
| 2026.10.27 | 27, 219 |
| 2026.10.28 | 25. 911 |
| 2026.10.29 | 25, 207 |
| 2026.10.30 | 24, 028 |
| 2026.10.31 | 23, 046 |
| 2026.11.01 | 22, 427 |
| 2026.11.02 | 21, 551 |
| 2026.11.03 | 20, 738 |
| 2026.11.04 | 20, 289 |
| 2026.11.05 | 19, 384 |
| 2026.11.06 | 18, 752 |
| 2026.11.07 | 17, 690 |
| <br />     | <br />  |

<br />

## 2026.10.31

T2509 ：求两节点的最近公共祖先（只适用于 完全二叉树 且 left = node\**2, right =* node\*2+1 的树，一般的，见 11.03）

对于 完全二叉树 且 left = node\**2, right =* node\*2+1 的树，求两个点的 lca，直接 谁大谁往上走

```C++
while(node1 != node2){
    if(node1 > node2){
        node1 /= 2;
    }else{
        node2 /= 2;
    }
}
lca = node1;
```

## 2026.11.01

1、对于没有给出 TreeNode \*root 但给出 vector\<vector\<int>> edges 的题目（一般是多叉/无向树等），要自己建树:

- 建树结构：二维数组
- 建树方式：遍历 edges，取出 from 和 to，特殊的，对于无向树，两边都要 push\_back，若有边权，则二维数组里的元素需改为 pair\<int,int>
- 有些题目没有规定 树的根节点，由于 **根节点 天然将所有点分为两边**，在未规定 根节点的情况下，每个节点都可以是 根节点，所以对于复杂问题，可以试试 将每个节点视为树的根 来思考，对于简单的，一般 默认 0 是根节点就行？
- 建完树后，就可以思考 dfs 的逻辑了（最最最经典的 dfs 就多叉树的深度）

## 2026.11.02

1、对于自顶向下的 dfs，有种先序遍历的味道，父节点需要向下传递信息，到当前节点时，先处理答案，同时更新信息，然后处理子节点，最后无需返回任何信息，即 **函数通常是** **`void`** **的，括号中会有** **`something`**。

函数格式通常是：（典例：dfs 求深度）

```C++
void dfs(type cur, type fa, type something){
    update(answer);
    update(something);
    for(auto &child){
        dfs(child,cur,something); // 这是多叉树，二叉树就 dfs(左/右) 就可以了
    }
}
```

 2、对于自底向上的 dfs，就是 后序遍历了，先处理子节点，子节点的处理结果需要向上返回，当前节点需要汇总这些处理结果，更新答案，最后也是向上返回当前的信息，即 **函数通常是 有类型的， 括号中没有** **`something`**。

函数格式通常是：（典例：dfs 求高度）

```C++
type dfs(type cur,type fa){
    type something;
    for(auto &child){
        something += dfs(child,cur);
        // 更新操作不一定是 +，更新位置不一定是在 for 里面，还是得 具体情况具体分析
        // 例如 求高度 的话，就是先求 mx，然后 cur_h = mx+1; 最后 return cur_h;
    }
    update(answer);
    return something;
}
```

3、对于更复杂的题目，要同时 自底向上 和 自顶向下，额，直接看函数格式吧。既然是同时有，所以一般来说，**函数有类型，括号里有** **`something`**。

函数格式通常是：（典例 T3331）

```C++
type dfs(type cur,type fa,type something1){
    

    return something2 // 这里返回的 可能是更新后的 something1，也可能是由子节点传上来的，也有可能是其他的，反正，具体情况具体分析
}
```

## 2026.11.03

求一般树的最近公共祖先：LCA

```C++
class Solution {
public:
    vector<vector<int>> adj; // 用于建树
    vector<int> depths; // 记录深度，用于求第 k 祖先
    vector<vector<int>> pa; // 记录祖先，用于求 lca

    vector<int> assignEdgeWeights(vector<vector<int>>& edges, vector<vector<int>>& queries) {
        // 建树
        for(auto &e : edges){
            int a = e[0], b = e[1];
            if(adj.size() < max(a,b)+1) adj.resize(max(a,b)+1);
            adj[a].push_back(b);
            adj[b].push_back(a);
        }
        // 初始化
        int n = adj.size();
        depths.resize(n);
        int m = bit_width(1u*n);
        pa.resize(n,vector<int>(m,-1)); // pa 是 n 行，logn+1 列

        dfs(1,-1,0); // 初始化 depth
        
        for(int i = 0; i+1 < m ;i++){
            for(int node = 0; node < n; node++){
                int p = pa[node][i];
                if(p != -1) pa[node][i+1] = pa[p][i]; // 初始化 pa
            }
        }

        // 这是解题，供参考，具体情况具体分析
        vector<int> ans(queries.size());
        for(int i = 0; i < queries.size(); i++){
            int node1 = queries[i][0], node2 = queries[i][1];
            int lca = get_lca(node1,node2); // 求最近公共祖先
            int lenth = depths[node1]-depths[lca]+depths[node2]-depths[lca];
            ans[i] = lenth == 0 ? 0 : getpow(lenth-1);
        }
        return ans;
    }

    int get_k_ancestor(int node,int k){
        int m = bit_width(1u*k);
        for(int i = m-1 ; i >= 0 ; i--){
            if(k >> i & 1) node = pa[node][i];
        }
        return node;
    }

    int get_lca(int node1,int node2){
        if(depths[node1] < depths[node2]) swap(node1,node2);

        node1 = get_k_ancestor(node1,depths[node1]-depths[node2]);
        if(node1 == node2) return node1;

        int m = bit_width(adj.size());
        for(int i = m-1 ; i >= 0 ; i--){
            int pa1 = pa[node1][i], pa2 = pa[node2][i];
            if(pa1 != pa2) node1 = pa1, node2 = pa2;
        }
        return pa[node1][0];
    }

    int getpow(int pow){
        int MOD = 1e9+7;
        long long a = 2;
        long long res = 1;
        while(pow > 0){
            if(pow & 1) res = res*a%MOD;
            a = a*a%MOD;
            pow >>= 1;
        }
        return res;
    }

    void dfs(int cur,int fa,int depth){
        depths[cur] = depth;
        pa[cur][0] = fa;
        for(auto &child : adj[cur]){
            if(child == fa) continue;
            dfs(child,cur,depth+1);
        }
    }
};
```

## 2026.11.04

&#x20;回溯问题：选或不选。尤其适用于 子集型 回溯

主要是要想清楚：回答问题需要依靠哪些基本元素，依次考虑这些基本元素 “选或不选”，所有元素考虑完后，得到当前“**选择策略**”下的答案，由此更新问题的答案

例如：T78

给你一个整数数组 `nums` ，数组中的元素 互不相同 。返回该数组所有可能的子集（幂集）。

基本元素就是 nums 中的每一个数，依次考虑这些数“选或不选”，所有数考虑完后，就是一种子集，更新答案即可

```C++
class Solution {
public:
    vector<int> nums;
    vector<int> temp;
    vector<vector<int>> ans;
    vector<vector<int>> subsets(vector<int>& nums) {
        this->nums = nums;
        dfs(0);
        return ans;  
    }
    void  dfs(int i){
        if(i == nums.size()){
            ans.push_back(temp);
            return;
        }

        dfs(i+1);

        temp.push_back(nums[i]);
        dfs(i+1);
        temp.pop_back(); // 恢复现场：一对一进行逆操作就好了。这里就是逆 line 19 的操作
    }
};
```

或者用 “枚举 选当前位置哪个”

```C++
class Solution {
public:
    vector<int> nums;
    vector<int> temp;
    vector<vector<int>> ans;
    vector<vector<int>> subsets(vector<int>& nums) {
        this->nums = nums;
        dfs(0);
        return ans;  
    }

    void  dfs(int i){
        ans.push_back(temp); // 子集型问题，每个节点都可以是答案，直接 push_back

        for(int j = i ; j < nums.size(); j++){  // 枚举当前位置可以放的放 下标 j
            temp.push_back(nums[j]); 
            dfs(j+1); // 注意这里是 j+1 ，表示下一个位置的枚举起点
            temp.pop_back();
        }
    }
};
```

同时，也有 [二进制枚举](https://leetcode.cn/discuss/post/3571304/cong-ji-he-lun-dao-wei-yun-suan-chang-ji-enve/) 的技巧，这直接看题目的数据范围就知道能不能用了

```C++
class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        int n = nums.size();
        vector<vector<int>> ans(1 << n);
        for (int s = 0; s < (1 << n); s++) { // 枚举全集 U 的所有子集 s
            for (int i = 0; i < n; i++) {
                if (s >> i & 1) { // i 在集合 s 中
                    ans[s].push_back(nums[i]);
                }
            }
        }
        return ans;
    }
};
```

## 2026.11.05

学习了 **划分型** 和 **组合型** 回溯（以下都是对于 选或不选 这一方法）

总的来说：**加入答案要判断、选或不选要判断、剪枝操作要判断**

对于 **划分型**，和 子集型 回溯最大的区别就是，**要想 ”不选“ 是有条件的**，只有当前位置不是最后一个时，才能够 不选 当前位置下的划分，否则，当当前位置时最后一个时，就必须选择当前位置下的划分，即 `if(i != s.size()-1)` 时，才能不选

同时要考虑 剪枝 操作，提前 return 。例如，T131

```C++
class Solution {
public:
    string subs = "";
    vector<string> path;
    vector<vector<string>> ans;
    vector<vector<string>> partition(string s) {
        dfs(0,s);
        return ans;
    }
    void dfs(int i,string &s){
        if(i == s.size()){
            ans.push_back(path); // 最后一个位置 已经将所有符合回文条件的 subs 放入 path 中了，ans 直接 push_back 就行 
            return;
        }

        if(i != s.size()-1){ // 只有当 i 不是最后一个位置时，才能不选
            subs.push_back(s[i]);
            dfs(i+1,s); // 不选 i 和 i+1 之间的 ','，即，不把 subs 放入 path 中
            subs.pop_back();
        }

        subs.push_back(s[i]);
        if(ispalind(subs)){
            path.push_back(subs);
            subs = "";
            dfs(i+1,s); // 选择 i 和 i+1 之间的 ','
            subs = path.back();
            path.pop_back();
        }
        subs.pop_back();
    }
    bool ispalind(string &subs){
        for(int i = 0; i < subs.size()/2; i++){
            if(subs[i] != subs[subs.size()-1-i]) return false;
        }
        return true;
    }
};
```

对于 **组合型**，和之前的类型最大区别是，由当前“选择”策略下得到的答案，在更新问题的答案时，**有长度上的规定**，通常就是 `if(path.size() == k)` 才能把 path 加入 ans

同样，要考虑 剪枝 操作。例题：T77

```C++
class Solution {
public:
    vector<int> path;
    vector<vector<int>> ans;
    vector<vector<int>> combine(int n, int k) {
        dfs(n,k);
        return ans;
    }
    void dfs(int i, int k){
        if(path.size() == k){
            ans.push_back(path);
            return;
        }
        if(i + path.size() < k) return;
        if(path.size() > k) return;

        if(i-1 >= k-path.size()) 
            dfs(i-1,k);

        path.push_back(i);
        dfs(i-1,k);
        path.pop_back();
    }
};
```

## 2026.11.06

学习了 \*\*排列型 \*\*回溯 和 \*\*有重复值 \*\*的回溯

对于 **排列型回溯**，“全排” 嘛，每个位置上都必须放一个元素，通常**会有一个  vector\<bool> vis 数组 来辅助判断**当前位置能不能放该元素，对于**更复杂问题**，就会有**更多数组来辅助判断**。

例题：T52 N皇后，就有三个 bool 数组来辅助判断

```C++
class Solution {
public:
    int ans = 0;
    vector<bool> col_vis;
    vector<bool> diag1, diag2;
    int totalNQueens(int n)  {
        col_vis.resize(n,false);
        diag1.resize(2*n-1,false);
        diag2.resize(2*n-1,false);
        dfs(0,n);
        return ans;
    }
    // 处理第 i 行皇后的列号
    void dfs(int i, int n){
        if(i == n){
            ans++;
            return;
        }

        for(int j = 0; j < n ; j++){
            int num1 = i+j, num2 = i-j+n-1;
            if(!col_vis[j] && !diag1[num1] && !diag2[num2]){
                col_vis[j] = true;
                diag1[num1] = true;
                diag2[num2] = true;
                dfs(i+1,n);
                col_vis[j] = false;
                diag1[num1] = false;
                diag2[num2] = false;
            }
        }
    }
};
```

对于 **有重复值** 的回溯，这个相对更难，通常就是用 **选或不选 的策略**来做，并**在此基础上特判条件**，选 可能要特判条件，不选 也可能要特判条件，情况复杂没法一概而论。

例题：T1079 活字印刷

> 输入："AAB"
>
> 输出：8
>
> 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。

```C++
class Solution {
public:
    vector<bool> vis;
    int path_size = 0;
    int ans = 0;
    int numTilePossibilities(string tiles) {
        vis.resize(tiles.size(),false);
        sort(tiles.begin(),tiles.end());
        dfs(0,tiles);
        return ans;
    }
    void dfs(int i,string &tiles){
        if(path_size != 0){
            ans++;            
        }
        if(i == tiles.size()){
            return;
        }

        for(int j = 0; j < tiles.size(); j++){
            if(vis[j]) continue;
            // 相同字母要出现，前面的相同字母必须出现，否则考虑下一个
            if((j > 0 && tiles[j] == tiles[j-1]) && !vis[j-1]) continue;
            path_size++;
            vis[j] = true;
            dfs(i+1,tiles);
            vis[j] = false;
            path_size--;
        }

    }
};
```

## 2026.11.07

学习了 搜索 和 折半搜索 的技巧

对于 搜索 ，比较简单，就是按照题意搜索出它想要的情况，通常是 选或不选 的策略

例题：T1415 开心字符串

```C++
class Solution {
public:
    string ans = "";
    int k = 0;
    string path = "";
    string getHappyString(int n, int k) {
        if(k > 3*(1<<(n-1))) return "";
        this->k = k;
        dfs(0,n);
        return ans;
    }
    void dfs(int i,int n){
        if(i == n){
            k--;
            if(k == 0) ans = path; // path 依次就是按照升序得到的
            return;
        }
        if(ans.size() != 0) return;

        for(char c = 'a' ; c <= 'c' ; c++){
            if(i == 0 || (i != 0 && c != path.back())){
                path += c;
                dfs(i+1,n);
                path.pop_back();
            }
        }
    }

};
```

对于 **折半搜索** ，感觉上来说是 大体量的子集型回溯 + 两数之和 问题，一般是会给你一个数组（或者其他集合），你想要的是这个数组中的某一个子集，如下例题，就是从数组中选取数量最多且异或和为 target 的一个子集，若是直接对整个数组进行 选或不选，有 $2^n$ 种情况，在 n 很大的情况下不可行，于是便可将数组对半拆开，然后再对 左右数组 进行 选或不选，**得到 左右数组 所有子集的异或和情况**，这时的枚举总量就是 $2 \cdot 2^{n/2}$，接下来就像 **两数之和** 问题了，**枚举左查找右**，具体见下代码

例题：T3877 达到目标异或值的最少删除次数

```C++
class Solution {
public:
    int minRemovals(vector<int>& nums, int target) {
        int size = nums.size();
        vector<int> nums1(nums.begin(),nums.begin()+size/2);
        vector<int> nums2(nums.begin()+size/2,nums.end());
        int ans = INT_MAX;
        auto map1 = get_map(nums1);
        auto map2 = get_map(nums2);

        for(auto [num,size1] : map1){
            if(map2.count(target^num)){
                ans = min(ans,size-size1-map2[target^num]);
            }
        }
        return ans == INT_MAX ? -1 : ans;
    }
    unordered_map<int,int> get_map(vector<int> &nums){
        unordered_map<int,int> mp;
        dfs(0,0,0,nums,mp);
        return mp;
    }
    void dfs(int i,int size,int xornum,vector<int> &nums,unordered_map<int,int> &mp){
        if(i == nums.size()){
            mp[xornum] = max(mp[xornum],size);
            return;
        }

        dfs(i+1,size,xornum,nums,mp);

        size++;
        xornum ^= nums[i];
        dfs(i+1,size,xornum,nums,mp);
        xornum ^= nums[i];
        size--;
    }
};
```

