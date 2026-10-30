---
title: "宏观经济学-金融市场与利率"
date: 2026-05-10
excerpt: "我们转向另一个领域：利率是怎么确定的？很明显这与金融市场相关。金融市场极其复杂，因此必须将其简化。研究金融市场的目的就是为了更好的理解央行是怎么确定利率的。"
tags:
  - Economics
  - Macroeconomics
columns:
  - macroeconomics
mathjax: true
---

我们转向另一个领域：利率是怎么确定的？很明显这与金融市场相关。金融市场极其复杂，因此必须将其简化。研究金融市场的目的就是为了更好的理解央行是怎么确定利率的。

提一嘴美国，美国的央行是联邦储备系统（Federal Reserve System），理事会设在华盛顿，有七位理事，美联储主席将会是成员之一。12家地区银行将作为联邦储备银行，而联邦开放市场委员会（FOMC）将制定利率决议。

欧盟则不同，每个国家都派出一名成员，不过此外与美国很类似。

为什么要关注货币政策（Monetary Policy）？因为货币政策将会是短期内极好的工具。货币政策与财政政策（Fiscal Policy）是短期内调节总产量的好办法。货币政策在短期内很灵活，但是中长期来看，起效持续性不如财政政策。

## 货币市场

货币政策在金融市场起作用。金融市场有数百万种工具（Financial Instrument）！为了简化金融市场，我们假定投资者只有两种金融资产的选择：**货币**和**债券**。

- **货币**用于交易（Transaction），例如流通中现金[^1]；
- **债券**无法交易[^2]，但是可以提供利率回报；

人们有一定的货币，那么有要花费多少到债券上？多少保留？选择合理的权衡才能达到利益最大化。选择的比例，很明显取决于人们对交易的需求与利率的比例关系。

如果利率变高，以至于直接购买债券就能够获得很高的收益（超过了交易能带来的收益），那么该买点债券了。

$$
M^d=\$YL(i)
$$

名义GDP增加的情况下

<svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义箭头标记 -->
  <defs>
    <!-- 坐标轴箭头 -->
    <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
    <!-- 移动指示箭头 -->
    <marker id="moveArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
  </defs>
  <!-- 背景 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- 1. 坐标轴 -->
  <!-- Y轴: Interest rate i -->
  <line x1="60" y1="450" x2="60" y2="50" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- X轴: Money M -->
  <line x1="60" y1="450" x2="560" y2="450" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- 轴标签 -->
  <text x="45" y="250" font-family="Arial, sans-serif" font-size="14" transform="rotate(-90, 45, 250)" text-anchor="middle">Interest rate, i</text>
  <text x="560" y="475" font-family="Arial, sans-serif" font-size="14" text-anchor="end">Money, M</text>
  <!-- 2. 需求曲线 (向下倾斜) -->
  <!-- 曲线 Md (左侧) -->
  <!-- 使用贝塞尔曲线 (Q) 模拟弧度 -->
  <path d="M 130 50 Q 140 350 420 420" fill="none" stroke="black" stroke-width="2" />
  <!-- 曲线 Md' (右侧，移动后) -->
  <path d="M 230 50 Q 240 350 520 420" fill="none" stroke="black" stroke-width="2" />
  <!-- 5. 曲线标签 -->
  <!-- Md 标签 -->
  <text x="360" y="380" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Md</text>
  <text x="360" y="400" font-family="Arial, sans-serif" font-size="12">(for nominal</text>
  <text x="360" y="415" font-family="Arial, sans-serif" font-size="12">income $Y)</text>
  <!-- Md' 标签 -->
  <text x="460" y="350" font-family="Arial, sans-serif" font-size="14" font-weight="bold">Md'</text>
  <text x="460" y="370" font-family="Arial, sans-serif" font-size="12">(for</text>
  <text x="460" y="385" font-family="Arial, sans-serif" font-size="12">$Y' > $Y)</text>
</svg>

在这个图中，我们看到名义GDP $$\$Y$$[^3] 变大了，这意味着交易变多了，支出变多了，需要更多货币用于交易。

央行是垄断货币供给的唯一机构，负责货币的供应。假定央行货币供给是 $$M$$

$$
M^S=M^d=\$YL(i)
$$

我们假定央行决定进行**扩张性货币政策**，发行更多的货币。这种情况下，如果要保持原有均衡，就需要降低利率。[^4]

<svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义箭头标记 -->
  <defs>
    <!-- 坐标轴箭头 -->
    <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
    <!-- 移动指示箭头 (蓝色风格) -->
    <marker id="shiftArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#4472C4" />
    </marker>
  </defs>
  <!-- 背景 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- 1. 坐标轴 -->
  <!-- Y轴: Interest rate i -->
  <line x1="60" y1="450" x2="60" y2="50" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- X轴: Money M -->
  <line x1="60" y1="450" x2="560" y2="450" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- 轴标签 -->
  <text x="45" y="250" font-family="Arial, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90, 45, 250)" text-anchor="middle">Interest rate, i</text>
  <text x="560" y="475" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="end">Money, M</text>
  <!-- 2. 货币供给线 (Vertical Lines) - 蓝色 -->
  <!-- Ms (左侧) x=220 -->
  <line x1="220" y1="50" x2="220" y2="450" stroke="#4472C4" stroke-width="2" />
  <text x="230" y="60" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4472C4" font-style="italic">M<tspan dy="-5" font-size="10">s</tspan></text>
  <!-- Ms' (右侧) x=340 -->
  <line x1="340" y1="50" x2="340" y2="450" stroke="#4472C4" stroke-width="2" />
  <text x="350" y="60" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#4472C4" font-style="italic">M<tspan dy="-5" font-size="10">s'</tspan></text>
  <!-- 3. 货币需求曲线 Md (Teal色) -->
  <!-- 经过计算的贝塞尔曲线，确保经过点(220, 279)和(340, 351) -->
  <!-- Start(140, 50) Control(140, 380) End(540, 380) -->
  <path d="M 140 50 Q 140 380 540 380" fill="none" stroke="#006666" stroke-width="2.5" />
  <text x="500" y="370" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#006666" font-style="italic">M<tspan dy="-5" font-size="10">d</tspan></text>
  <!-- 4. 虚线投影与均衡点 -->
  <!-- 均衡点 A (220, 279) -->
  <!-- 水平虚线 i -->
  <line x1="60" y1="279" x2="220" y2="279" stroke="#666" stroke-width="1" stroke-dasharray="5,5" />
  <text x="50" y="284" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="end">i</text>
  <!-- 底部标签 M -->
  <text x="220" y="470" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="middle">M</text>
  <!-- 均衡点 A' (340, 351) -->
  <!-- 水平虚线 i' -->
  <line x1="60" y1="351" x2="340" y2="351" stroke="#666" stroke-width="1" stroke-dasharray="5,5" />
  <text x="50" y="356" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="end">i'</text>
  <!-- 底部标签 M' -->
  <text x="340" y="470" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="middle">M'</text>
  <!-- 交点圆点 -->
  <circle cx="220" cy="279" r="4" fill="black" />
  <text x="230" y="275" font-family="Arial, sans-serif" font-size="14" font-weight="bold">A</text>
  <circle cx="340" cy="351" r="4" fill="black" />
  <text x="350" y="345" font-family="Arial, sans-serif" font-size="14" font-weight="bold">A'</text>
  <!-- 5. 移动指示箭头 (Shift Arrow) -->
  <line x1="240" y1="100" x2="310" y2="100" stroke="#4472C4" stroke-width="2" marker-end="url(#shiftArrow)" />
</svg>

在经济变热的情况下，名义GDP上升了，此时我们知道 $$M^d$$ 曲线右移，如果央行 Do Nothing，利率就要自动上升。

<svg width="600" height="500" viewBox="0 0 600 500" xmlns="http://www.w3.org/2000/svg">
  <!-- 定义箭头标记 -->
  <defs>
    <!-- 坐标轴箭头 -->
    <marker id="axisArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
    <!-- 移动指示箭头 (绿色风格) -->
    <marker id="shiftArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#008080" />
    </marker>
  </defs>
  <!-- 背景 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- 1. 坐标轴 -->
  <!-- Y轴: Interest rate i -->
  <line x1="60" y1="450" x2="60" y2="50" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- X轴: Money M -->
  <line x1="60" y1="450" x2="560" y2="450" stroke="black" stroke-width="1.5" marker-end="url(#axisArrow)" />
  <!-- 轴标签 -->
  <text x="45" y="250" font-family="Arial, sans-serif" font-size="14" font-weight="bold" transform="rotate(-90, 45, 250)" text-anchor="middle">Interest rate, i</text>
  <text x="300" y="490" font-family="Arial, sans-serif" font-size="14" font-weight="bold" text-anchor="middle">Money, M</text>
  <!-- 2. 货币供给线 (Vertical Line) - 深蓝色 -->
  <!-- Ms 固定在 x=300 -->
  <line x1="300" y1="40" x2="300" y2="450" stroke="#204a87" stroke-width="2" />
  <text x="310" y="50" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#204a87" font-style="italic">M<tspan dy="-5" font-size="10">s</tspan></text>
  <!-- 底部标签 M -->
  <text x="300" y="470" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="middle">M</text>
  <!-- 3. 货币需求曲线 (Curves) - 蓝绿色 (Teal) -->
  <!-- Md (原始曲线 - 下方) -->
  <!-- 经过点 A(300, 320) -->
  <path d="M 160 50 Q 180 350 500 400" fill="none" stroke="#699c9c" stroke-width="2.5" />
  <text x="440" y="380" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#699c9c" font-style="italic">M<tspan dy="-5" font-size="10">d</tspan></text>
  <!-- Md' (新曲线 - 上方) -->
  <!-- 经过点 A'(300, 180) -->
  <path d="M 240 40 Q 260 340 540 390" fill="none" stroke="#006666" stroke-width="2.5" />
  <text x="500" y="360" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#006666" font-style="italic">M<tspan dy="-5" font-size="10">d</tspan>'</text>
  <text x="500" y="380" font-family="Arial, sans-serif" font-size="12" font-weight="bold" fill="black">($Y' > $Y)</text>
  <!-- 4. 均衡点与虚线投影 -->
  <!-- 均衡点 A (300, 320) - 低利率 -->
  <line x1="60" y1="320" x2="300" y2="320" stroke="#666" stroke-width="1" stroke-dasharray="5,5" />
  <text x="50" y="325" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="end">i</text>
  <circle cx="300" cy="320" r="4" fill="black" />
  <text x="310" y="320" font-family="Arial, sans-serif" font-size="14" font-weight="bold">A</text>
  <!-- 均衡点 A' (300, 180) - 高利率 -->
  <line x1="60" y1="245" x2="300" y2="245" stroke="#666" stroke-width="1" stroke-dasharray="5,5" />
  <text x="50" y="250" font-family="Arial, sans-serif" font-size="14" font-style="italic" text-anchor="end">i'</text>
  <circle cx="300" cy="245" r="4" fill="black" />
  <text x="310" y="245" font-family="Arial, sans-serif" font-size="14" font-weight="bold">A'</text>
  <!-- 5. 移动指示箭头 (Shift Arrow) -->
  <line x1="180" y1="80" x2="250" y2="80" stroke="#008080" stroke-width="2" marker-end="url(#shiftArrow)" />
</svg>

这不行，央行正在试图调节 $$m$$ ，一种方法是使用直升机撒钱，央行直接向公众发放货币以刺激消费：刺激流动性的需求。

但是正常情况下，央行主要通过扩张性和紧缩性公开市场操作来调节 $$m$$ 。央行发行证券收回货币流动性（紧缩性），或者购买证券输入流动性（扩张性）。

如果央行购买债券，那么债券需求将会增加，此时债券价格上涨，利率自然就会下降了。为什么？

## 债券和利率

假定债券保证明年给定 $100 作为收益，那么利率（收益率）就是

$$
i=\frac{\$100-\$P_{B}}{\$P_{B}}
$$

所以利率和债券的价格成反相关。

## 均衡下的利率

我们将讨论一点更技术性的描述。在之前的简单模型中，我们假设只有“央行”和“个人”，钱就是现金。但在现实中，我们大部分钱是存在银行里的（存款）。

在金融市场中有很多金融中介机构，这里面最重要的机构之一就是银行。银行产生**支票存款（Checkable Deposit）**。存款是货币的一部分。

银行自己的存款称为银行准备金（Reserves），存在中央银行，对央行来说，称为央行货币（Central Bank Money）或者基础货币（High Power Money）。

既然钱都在银行里，那银行需要什么？

- 准备金：法定存款准备金
- 准备金率：法定存款准备金占总存款的比例

为了简化计算，假设人们手里不拿现金，所有的钱都以支票存款的形式存在银行里。所以，人们对货币的需求将等于对存款的需求：

$$
M^d=\$YL(i)
$$

因为只有银行需要持有央行的钱（准备金），对基础货币的需求（$$H^d$$）就等于对准备金的需求。

$$
H^d=\theta \times M^d=\theta \$YL(i)
$$

设央行的基础货币供应量为 $$H$$，则有

$$
H=\theta \$YL(i)
$$

这就是均衡下的情况。该公式解释了货币市场的供需均衡：

$$
\frac{1}{\theta}H=\$YL(i)
$$

左边是货币的供给量，右边是货币的需求量。

要是人们手里有存款也有现金，参考金融学的货币供给一节。

---

[^1]: 货币有一堆定义，但是我们可以根据货币最基本的特性：流通性予以理解。货币在这里就是用于流通交易。详见金融学货币部分。

[^2]: 虽然严谨来说确实可以

[^3]: 为什么要用名义GDP？假定物价固定，实际GDP增长，因此要以需求上升，在任何利率下货币需求都上升。但是如果物价通胀了一倍，你的货币确实要多一倍！所以使用名义GDP。

[^4]: 你也许注意到了货币需求曲线的末端是几乎水平的，这并非巧合，详见流动性陷阱
