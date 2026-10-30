---
title: "微积分-数列极限技巧与例题"
date: 2026-07-22
excerpt: "定理：如果一个序列收敛，则其 Cesàro 均值收敛于同一个极限"
tags:
  - Math
  - Calculus
columns:
  - mathematics
mathjax: true
---

**定理**：如果一个序列收敛，则其 Cesàro 均值收敛于同一个极限

若 $$\lim_{n\to\infty} a_n = a$$，则  

$$
\lim_{n\to\infty}\frac{a_1+a_2+\cdots+a_n}{n}=a.
$$

**证明**：

先证明 $$a=0$$ 的情形。对任意给定的 $$\varepsilon>0$$，由 $$\lim_{n\to\infty} a_n=0$$，存在正整数 $$N_1$$，使得当 $$n>N_1$$ 时，

$$
|a_n|<\frac{\varepsilon}{2}. \tag{1}
$$

固定 $$N_1$$，记前 $$N_1$$ 项的和为  

$$
S_{N_1}=a_1+a_2+\cdots+a_{N_1}.
$$

因为 $$S_{N_1}$$ 是常数，所以 $$\lim_{n\to\infty}\frac{S_{N_1}}{n}=0$$。于是存在正整数 $$N_2$$，使得当 $$n>N_2$$ 时，

$$
\left|\frac{S_{N_1}}{n}\right|<\frac{\varepsilon}{2}. \tag{2}
$$

取 $$N=\max\{N_1,N_2\}$$（或者取更大的整数以确保严格）。当 $$n>N$$ 时，有 $$n>N_1$$ 且 $$n>N_2$$，因此 (1) 和 (2) 同时成立。此时，

$$
\begin{aligned}
\left|\frac{a_1+a_2+\cdots+a_n}{n}\right|
&= \left|\frac{S_{N_1}}{n}+\frac{a_{N_1+1}+a_{N_1+2}+\cdots+a_n}{n}\right| \\
&\le \left|\frac{S_{N_1}}{n}\right| + \frac{|a_{N_1+1}|+|a_{N_1+2}|+\cdots+|a_n|}{n}.
\end{aligned}
$$

由 (1)，对每个 $$k>N_1$$ 都有 $$|a_k|<\varepsilon/2$$，故

$$
\frac{|a_{N_1+1}|+\cdots+|a_n|}{n}
< \frac{(n-N_1)\cdot \frac{\varepsilon}{2}}{n}
= \frac{n-N_1}{n}\cdot\frac{\varepsilon}{2}
< \frac{\varepsilon}{2},
$$

因为 $$\frac{n-N_1}{n}<1$$。再结合 (2)，得到

$$
\left|\frac{a_1+\cdots+a_n}{n}\right|
< \frac{\varepsilon}{2} + \frac{\varepsilon}{2} = \varepsilon.
$$

由 $$\varepsilon$$ 的任意性，即证 $$\lim_{n\to\infty}\frac{a_1+\cdots+a_n}{n}=0$$。

当 $$a\ne0$$ 时，令 $$b_n=a_n-a$$，则 $$b_n\to0$$。由已证的 $$a=0$$ 情形，有

$$
\lim_{n\to\infty}\frac{b_1+b_2+\cdots+b_n}{n}=0.
$$

即

$$
\lim_{n\to\infty}\frac{(a_1-a)+(a_2-a)+\cdots+(a_n-a)}{n}=0,
$$

等价于

$$
\lim_{n\to\infty}\left(\frac{a_1+\cdots+a_n}{n}-a\right)=0.
$$

因此

$$
\lim_{n\to\infty}\frac{a_1+\cdots+a_n}{n}=a.
$$

证毕。

即便 $$\{a_n\}$$ 本身发散，它的 Cesàro 均值仍然可能收敛。

### 例 2.2.3

设 $$a>1$$，令  

$$
\sqrt[n]{a}=1+y_n,\quad y_n>0 \quad (n=1,2,\dots).
$$

对任意 $$n\ge2$$，由二项式定理：

$$
a=(1+y_n)^n=1+n y_n+\frac{n(n-1)}2y_n^2+\cdots+y_n^n>1+n y_n,
$$

因此

$$
0<y_n<\frac{a-1}{n}. \tag{1}
$$

任给 $$\varepsilon>0$$，取正整数

$$
N=\max\left\{2,\left\lfloor \frac{a-1}{\varepsilon}\right\rfloor\right\}.
$$

当 $$n>N$$ 时，有 $$n\ge3$$（特别地 $$n\ge2$$），且

$$
n>\frac{a-1}{\varepsilon},
$$

从而由 (1) 得

$$
|\sqrt[n]{a}-1|=y_n<\frac{a-1}{n}<\varepsilon.
$$

由 $$\varepsilon$$ 的任意性，$$\lim_{n\to\infty}\sqrt[n]{a}=1$$。

---

### 例 2.2.4 使用二项式定理处理 n 次根号

设 $$n\ge2$$，令  

$$
\sqrt[n]{n}=1+y_n,\quad y_n>0.
$$

由二项式定理，

$$
n=(1+y_n)^n=1+n y_n+\frac{n(n-1)}2y_n^2+\cdots+y_n^n>1+\frac{n(n-1)}2y_n^2,
$$

所以

$$
n-1>\frac{n(n-1)}2y_n^2.
$$

因为 $$n\ge2$$，$$n-1>0$$，两边同除以 $$\frac{n(n-1)}2$$，得

$$
y_n^2<\frac{2}{n},
$$

即

$$
0<y_n<\sqrt{\frac{2}{n}}. \tag{2}
$$

任给 $$\varepsilon>0$$，取正整数

$$
N=\max\left\{2,\left\lfloor \frac{2}{\varepsilon^2}\right\rfloor\right\}.
$$

当 $$n>N$$ 时，有 $$n\ge3$$（特别地 $$n\ge2$$），且

$$
n>\frac{2}{\varepsilon^2},
$$

结合 (2) 得

$$
|\sqrt[n]{n}-1|=y_n<\sqrt{\frac{2}{n}}<\varepsilon.
$$

因此 $$\lim_{n\to\infty}\sqrt[n]{n}=1$$。

---

关于 $$\lim_{n\to\infty}\sqrt[n]{n^k}=1$$ 的说明

若 $$k$$ 为正整数，则

$$
\sqrt[n]{n^k}=\left(\sqrt[n]{n}\right)^k.
$$

由已证的 $$\sqrt[n]{n}\to1$$，结合幂函数的连续性（或极限的四则运算）可知其 $$k$$ 次幂也趋于 $$1$$。因此结论成立。

变式1：$$\lim_{n\to\infty}\sqrt[n]{3n+2}=1$$

变式2 作业第二章1.9.4：

$$
\lim_{n\to\infty} \left( \sqrt[n]{n^2+1} - 1 \right) \sin\frac{n\pi}{2}
$$

其极限为 **0**

---

证明 $$\displaystyle \lim_{n\to\infty} \sqrt[n]{n^2+1}=1$$（三次项放缩法）

令  

$$
x_n = \sqrt[n]{n^2+1} - 1 > 0 \quad (n\ge 1)
$$

则 

$$
n^2+1 = (1+x_n)^n.
$$

由二项式定理，展开式中所有项均为正，故当 \(n\ge 3\) 时，有  

$$
n^2+1 = \sum_{i=0}^n \binom{n}{i} x_n^i > \binom{n}{3} x_n^3.
$$

于是  

$$
\binom{n}{3} x_n^3 < n^2+1 \quad\Longrightarrow\quad x_n^3 < \frac{6(n^2+1)}{n(n-1)(n-2)}.
$$

当 $$n\ge 4$$ 时，有  

$$
n-1 \ge \frac{n}{2},\qquad n-2 \ge \frac{n}{2},
$$

且 $$n^2+1 \le 2n^2$$。因此  

$$
\frac{6(n^2+1)}{n(n-1)(n-2)}
\le \frac{6\cdot 2n^2}{n\cdot \frac{n}{2}\cdot \frac{n}{2}}
= \frac{12n^2}{\frac{n^3}{4}}
= \frac{48}{n}.
$$

所以  

$$
0 < x_n^3 < \frac{48}{n} \quad\Longrightarrow\quad 0 < x_n < \sqrt[3]{\frac{48}{n}}.
$$

当 $$n\to\infty$$ 时，$$\sqrt[3]{48/n} \to 0$$，由夹逼准则得  

$$
\lim_{n\to\infty} x_n = 0.
$$

即  

$$
\lim_{n\to\infty} \left( \sqrt[n]{n^2+1} - 1 \right) = 0.
$$

右边因子 $$\sin\frac{n\pi}{2}$$ 有界（其绝对值 $$\le$$ 1）。根据“无穷小量与有界量的乘积仍为无穷小量”，得 

$$
\lim_{n\to\infty} \left( \sqrt[n]{n^2+1} - 1 \right) \sin\frac{n\pi}{2} = 0.
$$

### 构造辅助数列判断数列极限技巧

$$
a_n = \frac{1}{2}\cdot \frac{3}{4}\cdot \frac{5}{6}\cdots \frac{2n-1}{2n}
$$

猜测结果会趋向于 0。

$$
a_n = \frac{1}{2}\cdot \frac{3}{4}\cdot \frac{5}{6}\cdots \frac{2n-1}{2n}
$$

**构造一个辅助数列**，令

$$
b_n = \frac{2}{3}\cdot \frac{4}{5}\cdot \frac{6}{7}\cdots \frac{2n}{2n+1}
$$

因为 $$\frac{1}{2}<\frac{2}{3}$$，$$\frac{3}{4}<\frac{4}{5}$$，……，$$\frac{2n-1}{2n}<\frac{2n}{2n+1}$$，
所以显然有：

$$
0 < a_n < b_n
$$

**将两者相乘**：

$$
a_n \cdot b_n = 
\left(\frac{1}{2}\cdot \frac{3}{4}\cdots \frac{2n-1}{2n}\right)
\cdot
\left(\frac{2}{3}\cdot \frac{4}{5}\cdots \frac{2n}{2n+1}\right)
\\
a_n b_n = \frac{1}{2n+1}
$$

既然 $$0<a_n<b_n$$，那么：

$$
a_n^2 < a_n b_n = \frac{1}{2n+1}
$$

所以：

$$
0 < a_n < \frac{1}{\sqrt{2n+1}}
$$

当 $$n \to \infty$$ 时，$$\frac{1}{\sqrt{2n+1}} \to 0$$。

由**夹逼准则**：

$$
\lim_{n\to\infty} a_n = 0
$$

这个乘积等价于 $$\frac{1}{\sqrt{\pi n}}$$，所以它趋于 0 的速度大约是和 $$\frac{1}{\sqrt{n}}$$ 一样慢，但最终还是会趋近于 0。

---

已按要求将所有 `\[...\]` 替换为 `$$...$$`，将所有 `\(...\)` 替换为 `$...$`，其余内容与格式均保持不变。

---

### 使用阿贝尔变换判断数列极限

第二章 1. 12

**已知条件：** 设 $$S_n = a_1 + a_2 + \cdots + a_n$$，且 $$\lim_{n\to\infty} S_n = S$$（收敛）。

---

(1) 证明：$$\lim_{n\to\infty} \frac{1}{n}(a_1 + 2a_2 + \cdots + n a_n) = 0$$

**证明：**

令 $$S_0 = 0$$，则通项 $$a_k = S_k - S_{k-1}$$（$$k=1,2,\cdots,n$$）。

对和式进行**阿贝尔变换（分部求和）**：

$$
\begin{aligned}
\sum_{k=1}^n k a_k &= \sum_{k=1}^n k (S_k - S_{k-1}) \\
&= (1S_1 + 2S_2 + \cdots + nS_n) - [1S_0 + 2S_1 + 3S_2 + \cdots + nS_{n-1}] \\
&= nS_n - (S_1 + S_2 + \cdots + S_{n-1}).
\end{aligned}
$$

（注：合并同类项时，$$S_1$$ 的系数为 $$1-2=-1$$，$$\cdots$$，$$S_{n-1}$$ 的系数为 $$(n-1)-n=-1$$，仅 $$S_n$$ 的系数为 $$n$$。）

两边同时除以 $$n$$，得：

$$
\frac{1}{n}\sum_{k=1}^n k a_k = S_n - \frac{S_1 + S_2 + \cdots + S_{n-1}}{n}. \tag{1}
$$

接下来分别计算右边两项的极限：

- 由题设，$$\lim_{n\to\infty} S_n = S$$。
- 考虑第二项。由**柯西算术平均值定理**（若 $$x_n \to x$$，则 $$\frac{x_1+\cdots+x_n}{n} \to x$$），因为 $$S_n \to S$$，所以前 $$n-1$$ 项的平均值也趋于 $$S$$：

$$
\lim_{n\to\infty} \frac{S_1 + S_2 + \cdots + S_{n-1}}{n} = \lim_{n\to\infty} \frac{n-1}{n} \cdot \frac{S_1 + \cdots + S_{n-1}}{n-1} = 1 \cdot S = S.
$$

将上述两个极限代入 (1) 式，得：

$$
\lim_{n\to\infty} \frac{1}{n}\sum_{k=1}^n k a_k = S - S = 0.
$$

证毕。

---

#### (2) 证明：$$\lim_{n\to\infty} (n! \cdot a_1 a_2 \cdots a_n)^{\frac{1}{n}} = 0$$（其中 $$a_i > 0$$）

**证明：**

首先对乘积进行恒等变形，将阶乘分配到每一项中：

$$
n! \cdot a_1 a_2 \cdots a_n = (1 \cdot 2 \cdots n) \cdot (a_1 a_2 \cdots a_n) = (1a_1)(2a_2)\cdots(na_n).
$$

因此，待求极限的表达式为这 $$n$$ 个正数的几何平均：

$$
\sqrt[n]{n! \cdot a_1 a_2 \cdots a_n} = \sqrt[n]{(1a_1)(2a_2)\cdots(na_n)}. \tag{2}
$$

因为 $$a_i > 0$$，显然所有项 $$k a_k > 0$$。对它们使用**几何-算术平均不等式（AM-GM）**：

$$
\sqrt[n]{(1a_1)(2a_2)\cdots(na_n)} \le \frac{1a_1 + 2a_2 + \cdots + n a_n}{n}. \tag{3}
$$

结合 (2)(3)，得到夹逼关系：

$$
0 < \sqrt[n]{n! \cdot a_1 a_2 \cdots a_n} \le \frac{1}{n}\sum_{k=1}^n k a_k.
$$

由第 (1) 问已证的结论，$$\lim_{n\to\infty} \frac{1}{n}\sum_{k=1}^n k a_k = 0$$。

根据**夹逼准则**，左边恒大于 0，右边趋于 0，故中间项必趋于 0：

$$
\lim_{n\to\infty} (n! \cdot a_1 a_2 \cdots a_n)^{\frac{1}{n}} = 0.
$$

证毕。

---

## 第 13 题

**题设：** \(\lim_{n\to\infty} a_n = a\)，\(\lim_{n\to\infty} b_n = b\)。  
**求证：**
\[
\lim_{n\to\infty} \frac{a_1 b_n + a_2 b_{n-1} + \cdots + a_n b_1}{n} = ab.
\]

---

### 证明

令
\[
\alpha_n = a_n - a,\qquad \beta_n = b_n - b,
\]
则
\[
\alpha_n \to 0,\qquad \beta_n \to 0.
\]
由收敛数列的有界性，存在常数 \(M>0\)，使得对一切 \(n\)，
\[
|\alpha_n| \le M,\qquad |\beta_n| \le M.
\]

记
\[
c_n = \frac{1}{n}\sum_{k=1}^n a_k b_{n+1-k}.
\]
将 \(a_k = a + \alpha_k\)，\(b_{n+1-k} = b + \beta_{n+1-k}\) 代入，得
\[
\begin{aligned}
c_n &= \frac{1}{n}\sum_{k=1}^n (a+\alpha_k)(b+\beta_{n+1-k}) \\
&= ab + a\cdot \frac{1}{n}\sum_{k=1}^n \beta_{n+1-k}
      + b\cdot \frac{1}{n}\sum_{k=1}^n \alpha_k
      + \frac{1}{n}\sum_{k=1}^n \alpha_k \beta_{n+1-k}.
\end{aligned}
\]

因为 \(\sum_{k=1}^n \beta_{n+1-k} = \sum_{j=1}^n \beta_j\)（只是倒序求和），由算术平均值定理（\(\beta_j\to0\) 蕴含其前 \(n\) 项平均值趋于 \(0\)）得
\[
\frac{1}{n}\sum_{k=1}^n \beta_{n+1-k} = \frac{1}{n}\sum_{j=1}^n \beta_j \to 0.
\]
同理，
\[
\frac{1}{n}\sum_{k=1}^n \alpha_k \to 0.
\]

因此，只需证明最后一项
\[
T_n := \frac{1}{n}\sum_{k=1}^n \alpha_k \beta_{n+1-k} \to 0.
\]

任给 \(\varepsilon>0\)。由 \(\alpha_k\to0\)，存在 \(N_1\)，使得当 \(k>N_1\) 时，\(|\alpha_k|<\varepsilon\)。由 \(\beta_j\to0\)，存在 \(N_2\)，使得当 \(j>N_2\) 时，\(|\beta_j|<\varepsilon\)。取 \(N=\max\{N_1,N_2\}\)。

将和 \(\sum_{k=1}^n \alpha_k \beta_{n+1-k}\) 分成三段：
\[
\sum_{k=1}^n = \sum_{k=1}^{N} + \sum_{k=N+1}^{n-N} + \sum_{k=n-N+1}^{n}.
\]
（当 \(n\le 2N\) 时，中间为空，此时只需考虑边界，结论显然，以下设 \(n>2N\)。）

- **中间部分**：当 \(N<k\le n-N\) 时，有 \(k>N\) 且 \(n+1-k>N\)，所以
  \[
  |\alpha_k|<\varepsilon,\qquad |\beta_{n+1-k}|<\varepsilon.
  \]
  因此
  \[
  \left|\sum_{k=N+1}^{n-N} \alpha_k \beta_{n+1-k}\right|
  \le \sum_{k=N+1}^{n-N} \varepsilon^2
  \le n\varepsilon^2.
  \]

- **边界部分**：前 \(N\) 项和后 \(N\) 项，共有 \(2N\) 项。每项满足 \(|\alpha_k|\le M\)，\(|\beta_{n+1-k}|\le M\)，故
  \[
  \left|\sum_{k=1}^{N} + \sum_{k=n-N+1}^{n}\right|
  \le 2N M^2.
  \]

于是
\[
|T_n| \le \frac{2N M^2}{n} + \varepsilon^2.
\]
先取 \(n\) 足够大，使得 \(\frac{2N M^2}{n}<\varepsilon\)，则
\[
|T_n| < \varepsilon + \varepsilon^2.
\]
由 \(\varepsilon\) 的任意性，得到 \(T_n\to0\)。

综上，
\[
\lim_{n\to\infty} c_n = ab.
\]
证毕。

---

## 第 14 题

**题设：** 数列 \(\{a_n\}\) 满足
\[
\lim_{n\to\infty} \frac{a_1+a_2+\cdots+a_n}{n} = a \quad (a\text{ 有限}).
\]
**求证：**
\[
\lim_{n\to\infty} \frac{a_n}{n} = 0.
\]

---

### 证明

令
\[
S_n = a_1 + a_2 + \cdots + a_n.
\]
题设即
\[
\lim_{n\to\infty} \frac{S_n}{n} = a.
\]

当 \(n\ge 2\) 时，
\[
\frac{a_n}{n} = \frac{S_n - S_{n-1}}{n}
= \frac{S_n}{n} - \frac{n-1}{n}\cdot \frac{S_{n-1}}{n-1}.
\]

由题设，
\[
\frac{S_n}{n} \to a,\qquad \frac{S_{n-1}}{n-1} \to a,
\]
且
\[
\frac{n-1}{n} \to 1.
\]
因此
\[
\lim_{n\to\infty} \frac{a_n}{n}
= a - 1\cdot a = 0.
\]
证毕。
