---
title: "离散数学-集合论"
date: 2026-03-11
excerpt: "集合与元素、集合间关系、集合运算与运算律、笛卡尔积及经典例题。"
tags:
  - Math
  - Discrete Mathematics
columns:
  - mathematics
mathjax: true
---

> **💡 考情综述**
> 集合论是离散数学2的基石。作为基础工具，虽然不像函数、关系或图论考察得那么频繁，但常作为 **判断题、填空题** 或 **第一道大题** 出现。
>
> - **核心考点**：集合相等的证明、归纳定义、运算律化简。

---

## 1.1 集合与元素

- **定义**：确定的、互不相同对象构成的整体。
- **表示方法**：
- 枚举法 (Roster method)
- 描述法 (Set-builder notation)
- 抽象原则
- 🔥 **归纳定义（重点）**：
- 需掌握构造集合的三步法：**基础条款 + 归纳条款 + 极小性条款**。

## 1.2 集合间的关系

- **基本关系**：相等 ($$=$$) 与 包含 ($$\subseteq$$)。
- 🔥 **证明相等（重点题型）**：
- **元素法**：$$\forall x (x \in A \leftrightarrow x \in B)$$
- **双向包含法**：证 $$A \subseteq B$$ 且 $$B \subseteq A$$（最常用）
- **运算法**：利用集合运算律进行等价变换。
- **幂集 (Power Set)**：
- 符号：$$P(A)$$ 或 $$2^A$$
- 定义：$$A$$ 的所有子集构成的集合。
- 性质：若 $$|A|=n$$，则 $$|P(A)|=2^n$$。

## 1.3 集合的运算

- **常规运算**：交 ($$\cap$$)、并 ($$\cup$$)、补 ($$\overline{A}$$)、差 ($$-$$)。
- **特殊运算**：对称差 ($$\oplus$$ 或 $$\Delta$$)
- 定义：$$A \oplus B = (A-B) \cup (B-A)$$
- 含义：属于 $$A$$ 或属于 $$B$$，但不属于两者交集的部分。
- **广义交、并**

## 1.4 集合的运算律

- **基础律**：交换律、结合律、分配律。
- **吸收律**：
- $$A \cup (A \cap B) = A$$
- $$A \cap (A \cup B) = A$$
- 🔥 **De Morgan's Laws (德·摩根律)**：
- $$\overline{A \cup B} = \overline{A} \cap \overline{B}$$
- $$\overline{A \cap B} = \overline{A} \cup \overline{B}$$

## 1.5 笛卡尔积

- **有序对**：$$<x,y>$$ 或 $$(x,y)$$。
- **定义**：$$A \times B = \{<x,y> \mid x \in A \land y \in B\}$$。
- **性质**：一般不满足交换律（除非 $$A=B$$ 或其中之一为空集）。
- **有穷集的计数**：$$|A \times B| = |A| \cdot |B|$$。

## 经典例题

#### 1. 罗素悖论(Russell's Paradox)：

若 $$C=\{S| S \text{是集合} \land S \notin S \}$$，证明 $$C$$ 不是集合。

证明：假设 $$C$$ 是集合，则:

1. 若 $$C\in C$$ ，则 $$C$$ 作为元素应当满足 $$C\in C \Rightarrow C \notin C$$，矛盾
2. 若 $$C\notin C$$，则 $$C$$ 是集合且 $$C\notin C$$，则 $$C\in C$$

综上，$$C$$ 不是集合。

#### 2. 运算律的简单运用

假设 $$A, B \subset U$$，$$U$$ 是全集，证明以下三个结论等价：

1. $$A\subset B$$
2. $$A\cup B = B$$
3. $$A\cap B = A$$

#### 3.对称差

证明：$$(A\oplus B)\oplus C=A\oplus (B\oplus C)$$
