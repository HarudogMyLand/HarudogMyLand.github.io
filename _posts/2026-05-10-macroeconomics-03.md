---
title: "宏观经济学-商品市场与均衡产出"
date: 2026-05-10
excerpt: "什么决定了均衡的产出水平？我们将会分短，中，长期分析。"
tags:
  - Economics
  - Macroeconomics
columns:
  - macroeconomics
mathjax: true
---

什么决定了均衡的产出水平？我们将会分短，中，长期分析。

## 短期分析

在短期内，关键机制是，**需求决定产量**。

因此短期内。必须关注消费者的需求。短期内产出取决于需求与商业周期。会有什么因素促进或抑制需求？需求有哪些部分？

我们衡量**总需求**（Aggregate Demand）的构成：

$$
Z=C+I+G+X-IM
$$

- $$C$$ 是消费（Consumption），消费者商品与服务总和
- $$I$$ 是投资（Investment），这里特指**固定资产投资 (Fixed Investment)**
- $$G$$ 是政府（Government）支出，政府负责的服务与商品[^1]
- $$X$$ 是出口（Export），向外国出口货物
- $$IM$$ 是进口（Import），本国消费者、公司与政府对外购买的商品或服务
- 除此之外还有库存投资（Inventory），生产的一些滞后要素

我们暂时中假定经济是**封闭经济**，并假定所有产品生产出来后立刻投入市场。很多小型经济体通常有更大的涉外经济规模，美国就相对没有。

假定投资是一个**外生变量**（Exogenous），也就是说，企业投资多少和当前的产出没关系（虽然显然有关系，但那是之后的IS-LM模型的任务） 

因此在我们的封闭经济模型中：

$$
Z=C+I+G
$$

模型是动态的，我们假定消费函数是：

$$
C=C(Y)=c_{0}+c_{1}Y_{D}
$$

为简单假定消费就是可支配收入的一个线性函数。

其中的参数 $$c_{1}$$ 称为边际消费倾向（propensity to consume)。

参数 $$c_{0}$$ 被称为是自发消费指数，经济上，代表消费者信心。

同时，可支配收入 $$Y_{D}$$ 被定义为：

$$
Y-T=Y_{D}
$$

其中 $$T$$ 是税务部分，或者说不可支配收入。

**更精确的定义**：

$$
T=\text{Taxes}−\text{Transfers}
$$

（税收减去转移支付）。

收入扣税之后就是可支配收入了。

现在，我们已经得到了

$$
Z=C+I+G
$$

那么 

$$
Z=c_{0}+c_{1}(Y-T)+\overline{I}+G
$$

考虑到短期内**需求决定产量**为调节，因此均衡时有条件：

$$
Y=Z
$$

则 

$$
c_{0}+c_{1}(Y-T)+\overline{I}+G=Y
$$

因此 

$$
Y=\frac{1}{1-c_{1}}[c_{0}-c_{1}T+\overline{I}+G]
$$

前面的 $$\frac{1}{1-c_{1}}$$ 称为**乘数**，我的支出是你的收入，你的收入增加导致你的消费增加，进而成为他的收入... 无限循环。这个过程的结果的数学本质就是：

$$
1+c_{1}+c_{1}^2+c_{1}^3+...=\frac{1}{1-c_{1}}
$$

 (几何级数求和)。

当 $$c_{1}$$ 接近于1，消费者将大部分用于消费时，产出增加，收入 $$Y$$ 也增加。

<svg width="600" height="550" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义箭头标记 -->
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#000" />
    </marker>
  </defs>
  <!-- 背景 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- 坐标轴 -->
  <!-- Y轴 -->
  <line x1="50" y1="450" x2="50" y2="50" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
  <!-- X轴 -->
  <line x1="50" y1="450" x2="550" y2="450" stroke="black" stroke-width="2" marker-end="url(#arrow)" />
  <!-- 轴标签 -->
  <text x="560" y="455" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Income, Y</text>
  <text x="30" y="40" font-family="Arial, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90, 40, 250)" text-anchor="middle">Demand Z, Production Y</text>
  <!-- 45度线 (生产线 Y=Z) -->
  <!-- 起点(50,450) 终点(450,50) -->
  <line x1="50" y1="450" x2="450" y2="50" stroke="#666666" stroke-width="2" />
  <text x="320" y="130" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#333">Production</text>
  <text x="400" y="100" font-family="Arial, sans-serif" font-size="12" fill="#666">Slope = 1</text>
  <!-- 需求曲线 ZZ -->
  <!-- 截距设在(50, 320), 均衡点设在(300, 200) -->
  <!-- 延长线至 (500, 104) -->
  <line x1="50" y1="320" x2="500" y2="104" stroke="#C71585" stroke-width="3" />
  <text x="460" y="150" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#C71585">ZZ</text>
  <text x="460" y="175" font-family="Arial, sans-serif" font-size="16" font-weight="bold" fill="#C71585">Demand</text>
  <text x="400" y="210" font-family="Arial, sans-serif" font-size="12" fill="#333">Slope = c<tspan dy="3" font-size="10">1</tspan></text>
  <!-- 均衡点 A -->
  <circle cx="300" cy="200" r="4" fill="black" />
  <text x="290" y="190" font-family="Arial, sans-serif" font-size="14" font-weight="bold">A</text>
  <!-- 虚线投影 -->
  <line x1="300" y1="200" x2="300" y2="450" stroke="#666" stroke-width="1.5" stroke-dasharray="5,5" />
  <line x1="300" y1="200" x2="50" y2="200" stroke="#666" stroke-width="1.5" stroke-dasharray="5,5" />
  <!-- 投影标签 -->
  <text x="300" y="470" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Y</text>
  <text x="35" y="205" font-family="Arial, sans-serif" font-size="14" text-anchor="end">Y</text>
  <!-- 均衡点说明文字 -->
  <text x="310" y="220" font-family="Arial, sans-serif" font-size="13">Equilibrium Point:</text>
  <text x="310" y="238" font-family="Arial, sans-serif" font-size="13">Y = Z</text>
  <!-- 自发支出标记 (Autonomous Spending) -->
  <!-- 大括号 -->
  <path d="M45,320 Q35,320 35,330 L35,375 Q35,385 25,385 Q35,385 35,395 L35,440 Q35,450 45,450" fill="none" stroke="#333" stroke-width="1.5"/>
  <text x="60" y="380" font-family="Arial, sans-serif" font-size="12" fill="#333">Autonomous</text>
  <text x="60" y="395" font-family="Arial, sans-serif" font-size="12" fill="#333">Spending</text>
  <!-- 45度角标记 -->
  <path d="M80,450 A30,30 0 0,0 72,428" fill="none" stroke="#666" stroke-width="1"/>
  <text x="85" y="440" font-family="Arial, sans-serif" font-size="11" font-weight="bold">45°</text>
</svg>

### 储蓄悖论

凯恩斯模型提出了一个反直觉的要点：这也是后面IS关系的由来

投资等于储蓄。

我们考虑均衡条件：

$$
Y=I+C+G
$$

两边同时减去 $$C$$ 和 $$T$$

$$
Y-T-C=I+G-T
$$

左侧定义为**私人储蓄**：可支配收入没花掉的部分 $$S_p$$
右侧 $$G-T$$ 定义为**公共储蓄**：政府的税减去花的钱 $$S_g$$

所以 

$$
S_{p} = I-S_{g}\Rightarrow I=S_{p} + S_{g}
$$

投资的资金来源，要么来自私人存的钱，要么来自政府省下的钱。这也解释了为什么这个市场叫 **IS** (Investment-Savings)。

$$
\overline{I} = S(Y) + \overline{S}^G
$$

多存点钱似乎是好事，偏好储蓄也是中国居民的一大特点。但是短期宏观经济学分析来看并不完全是。**消费者仅仅是因为想存更多钱（心理变化），导致了宏观经济的变动**。

#### 节俭悖论 (The Paradox of Thrift)

- **情景假设**：消费者信心下降，想为未来多存点钱，$$c_0$$ 下降。

微观直觉上，我少花钱多存钱，我的财富会增加。

然而宏观推导来看   
1. $$c_0 \downarrow \Rightarrow 需求 Z \downarrow$$
2. 消费 $$C$$ 下降，并且根据乘数效应，产出 $$Y$$ 大幅下降 （$$Y\downarrow \downarrow$$）
3. **关键点**：私人储蓄
4. 

$$
S_{p}=-c_{0}+(1-c_{1})(Y-T)
$$

一方面，$$c_0$$下降倾向于增加储蓄（直接效应）, 另一方面，$$Y$$ 下降会减少储蓄（因为你赚的少了，能存的自然也少了，间接效应），最终 $$S_p$$ 下降。

最终

$$
    I=S_p+(T−G)
$$

**生效条件为经济低迷期**：当经济处于**流动性陷阱**或**严重衰退**时，投资对利率不敏感，且存在大量闲置资源。此时，多出来的储蓄不会自动转化为生产性投资，而是“漏出”为闲置资金，悖论极为明显。

**悖论结论**： 
人们试图存更多的钱，结果导致经济衰退，而最终大家手里的总储蓄量**根本没有增加**（甚至在投资也是内生变量的模型中，储蓄会减少）。

在开放经济体中，**一国的过度储蓄，可能会通过资本流动，在别国引发需求过旺或资产泡沫，而不是直接导致本国收入下降**。2000年代初，中国和石油出口国的高储蓄率导致全球长期利率走低。这并没有导致全球衰退，反而催生了美国房地产泡沫。

<svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义：箭头 -->
  <defs>
    <!-- 蓝色轴箭头 -->
    <marker id="arrowBlue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#4472C4" />
    </marker>
    <!-- 绿色指示箭头 -->
    <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#548235" />
    </marker>
  </defs>
  <!-- 背景 -->
  <rect width="100%" height="100%" fill="white" />
<text x="300" y="30" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#000" text-anchor="middle">
    需求下降的影响
  </text>
  <!-- 1. 坐标轴 (蓝色) -->
  <!-- Y轴 -->
  <line x1="50" y1="450" x2="50" y2="30" stroke="#4472C4" stroke-width="2" marker-end="url(#arrowBlue)" />
  <!-- X轴 -->
  <line x1="50" y1="450" x2="570" y2="450" stroke="#4472C4" stroke-width="2" marker-end="url(#arrowBlue)" />
  <!-- 轴标签 -->
  <text x="10" y="40" font-family="Arial, sans-serif" font-size="16" fill="#000">Y,Z</text>
  <text x="560" y="480" font-family="Arial, sans-serif" font-size="16" fill="#000">Y</text>
  <!-- 2. 45度线 (灰蓝色) -->
  <!-- 起点(50,450) 终点(450,50) -->
  <line x1="50" y1="450" x2="450" y2="50" stroke="#8EA9DB" stroke-width="1.5" />
  <!-- 3. 需求曲线 Z (红色) -->
  <!-- Z0 (初始高位) -->
  <!-- 假设交点在 (380, 120)，斜率0.5。起点计算: y - 120 = 0.5(x - 380) => 当x=50, y=285 -->
  <line x1="50" y1="285" x2="480" y2="70" stroke="#C00000" stroke-width="2.5" />
  <text x="490" y="80" font-family="Arial, sans-serif" font-size="16" fill="#000">Z₀</text>
  <!-- Z1 (下降后低位) -->
  <!-- 向下平移约 70px。起点 (50, 355) -->
  <line x1="50" y1="355" x2="480" y2="140" stroke="#C00000" stroke-width="2.5" />
  <text x="490" y="150" font-family="Arial, sans-serif" font-size="16" fill="#000">Z₁</text>
  <!-- 4. 垂直辅助线 (Y0 和 Y1) -->
  <!-- 均衡点0: (380, 120) -->
  <line x1="380" y1="120" x2="380" y2="450" stroke="#4472C4" stroke-width="1" />
  <!-- 均衡点1: Z1与45度线交点。450-y = x-50 => x+y=500. Z1方程: y = -0.5x + 380. 解得 x=240, y=260 -->
  <line x1="240" y1="260" x2="240" y2="450" stroke="#4472C4" stroke-width="1" />
  <!-- 5. 绿色指示箭头 -->
  <!-- 向下箭头 (Z0 -> Z1) -->
  <line x1="400" y1="130" x2="400" y2="175" stroke="#548235" stroke-width="2" marker-end="url(#arrowGreen)" />
  <!-- 向左箭头 (Y0 -> Y1) -->
  <line x1="370" y1="470" x2="250" y2="470" stroke="#548235" stroke-width="2" marker-end="url(#arrowGreen)" />
  <!-- 6. 底部标签 -->
  <text x="375" y="480" font-family="Arial, sans-serif" font-size="16" fill="#000">Y₀</text>
  <text x="235" y="480" font-family="Arial, sans-serif" font-size="16" fill="#000">Y₁</text>
</svg>

[^1]: 注意这并不包含政府转移支付，例如医疗和社会保险金
