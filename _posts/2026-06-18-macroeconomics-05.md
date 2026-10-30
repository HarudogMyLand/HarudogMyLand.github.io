---
title: "宏观经济学-IS-LM 模型"
date: 2026-06-18
excerpt: "疫情之后，得益于股票房价等资产价格的大幅上涨，美国经济家庭财富和非营利组织的净资产显著增长。尽管2022年资产价值有所下降，但与之前的增长相比，降幅较小。"
tags:
  - Economics
  - Macroeconomics
columns:
  - macroeconomics
mathjax: true
---

疫情之后，得益于股票房价等资产价格的大幅上涨，美国经济家庭财富和非营利组织的净资产显著增长。尽管2022年资产价值有所下降，但与之前的增长相比，降幅较小。

财富的增加使得消费者感觉更富有，从而增加了总需求。此外，疫情期间政府的大规模转移支付和消费机会的减少导致储蓄率大幅上升，形成了约2.7万亿至2.8万亿美元的超额储蓄。

为了补偿性消费，人们动用这些储蓄，导致旅游、餐饮和酒店等服务需求激增，这给总需求带来了巨大的上行压力，导致经济过热。

经济过热的后果是高通胀，为了应对此情况，美联储实施了紧缩的货币政策，提高利率以给经济降温。同时，美国政府可以使用财政政策来处理经济过热问题。[^1]

由此可以看出，消费市场和货币市场是紧密相连的，不可分割而语。必须需要一个能够整合消费市场和金融市场的模型，IS-LM模型应运而生。

## IS-LM 模型

在整合凯恩斯的工作的基础上，希克斯和汉森提出了一个创造性的设想，一个整合了金融与商品市场的模型：IS-LM模型。名称来自于两个市场中的几个重要参数。

### IS 关系

商品市场均衡性质是：

$$
Y=Z
$$

我们将 $$Z$$ 视为收入，投资与政府支出的函数。

但是在这个模型中，投资不是常量，投资（固定资产投资）是利率和总收入的函数：

$$
I=I(Y, i)
$$

因此，均衡时的总产量 $$Y$$ 满足

$$
Y=C(Y-T)+I(Y,i)+G
$$

特别的，$$I$$ 是 $$Y$$ 的增函数，$$i$$ 的减函数。

这就是我们所说的 $$IS$$ 关系。

<svg width="600" height="550" viewBox="0 0 600 550" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景：白色 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- 定义字体样式 -->
  <style>
    .axis-label { font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; fill: #333; }
    .label-text { font-family: Arial, sans-serif; font-size: 14px; fill: #333; }
    .curve-label { font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; fill: #8B0000; }
    .point-label { font-family: Arial, sans-serif; font-size: 14px; font-weight: bold; font-style: italic; fill: #000; }
  </style>
  <!-- 坐标系 -->
  <!-- Y轴 -->
  <line x1="60" y1="500" x2="60" y2="50" stroke="black" stroke-width="1" />
  <!-- X轴 -->
  <line x1="60" y1="500" x2="550" y2="500" stroke="black" stroke-width="1" />
  <!-- 轴标签 -->
  <!-- Y轴标签 (旋转) -->
  <text x="50" y="300" transform="rotate(-90, 40, 300)" class="axis-label" text-anchor="middle">D, Z</text>
  <!-- X轴标签 -->
  <text x="305" y="540" class="axis-label" text-anchor="middle">Output, Y</text>
  <!-- 45度线 (Y=Z) -->
  <!-- 起点(60, 500) 终点(510, 50) -> 确保是正方形比例的对角线 -->
  <line x1="60" y1="500" x2="510" y2="50" stroke="#555555" stroke-width="1.5" />
  <!-- 45度角标识 -->
  <path d="M100,500 A40,40 0 0,0 90,470" fill="none" stroke="#555" stroke-width="1" stroke-dasharray="2,2" />
  <text x="105" y="490" class="label-text" font-size="12px">45°</text>
  <!-- 需求曲线 ZZ (红色) -->
  <!-- 设定经过均衡点 A(300, 260) -->
  <!-- 使用贝塞尔曲线模拟轻微的弧度，或者直线。这里使用微弧线以贴近原图 -->
  <!-- 起点 (60, 340) -> 均衡点 (300, 260) -> 终点 (540, 150) -->
  <path d="M 60 340 Q 300 260 540 120" fill="none" stroke="#8B0000" stroke-width="2.5" />
  <!-- 曲线标签 (Demand ZZ) -->
  <text x="545" y="140" class="curve-label" text-anchor="start">Demand</text>
  <text x="545" y="160" class="curve-label" text-anchor="start">ZZ</text>
  <!-- 均衡点 A -->
  <!-- 坐标计算：在45度线上，x=300时，y=500-(300-60)=260 -->
  <circle cx="330" cy="230" r="4" fill="black" />
  <text x="330" y="220" class="point-label" text-anchor="middle">A</text>
  <!-- 虚线辅助线 -->
  <!-- 垂直向下指引到 Y -->
  <line x1="330" y1="240" x2="330" y2="500" stroke="#666" stroke-width="1" stroke-dasharray="5,5" />
  <!-- X轴上的点标签 Y -->
  <text x="310" y="520" class="point-label" text-anchor="middle">Y</text>
</svg>

不同于我们第三讲的图片，需求函数并不是线性函数。 只有假设了消费函数和投资函数是线性的情况下才能将 ZZ 绘制为直线。

#### IS 曲线

在不同的利率 $$i$$ 下，ZZ曲线必然移动。具体而言，假定利率 $$i$$ 增加，则投资 $$I$$ 下降，曲线会下移，取得新的 $$Y$$ 值。这个全新的对应关系绘制出 $$Y-i$$ 函数。

<svg width="600" height="850" viewBox="0 0 600 850" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <!-- 定义箭头 -->
    <marker id="arrowEnd" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="black" />
    </marker>
    <!-- 定义紫色箭头 (用于Shift) -->
    <marker id="shiftArrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth">
      <path d="M0,0 L0,6 L9,3 z" fill="#5D5C98" />
    </marker>
  </defs>
  <!-- 背景填充白色 -->
  <rect width="100%" height="100%" fill="white" />
  <!-- =========================================
       图 (a): The Goods Market
       原点设为 (80, 400)
       ========================================= -->
  <text x="50" y="200" font-family="Arial" font-size="16" fill="#333">(a)</text>
  <!-- 坐标轴 (a) -->
  <line x1="80" y1="400" x2="80" y2="40" stroke="black" stroke-width="1.5" />
  <line x1="80" y1="400" x2="550" y2="400" stroke="black" stroke-width="1.5" />
  <!-- 轴标签 (a) -->
  <text x="60" y="220" font-family="Arial" font-size="14" font-weight="bold" transform="rotate(-90, 60, 220)" text-anchor="middle">Demand, Z</text>
  <text x="315" y="435" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Output, Y</text>
  <!-- 45度线 -->
  <!-- 起点(80,400), 终点(430, 50) -->
  <line x1="80" y1="400" x2="430" y2="50" stroke="#333" stroke-width="1.5" />
  <text x="115" y="390" font-family="Arial" font-size="12" fill="#333">45°</text>
  <path d="M110,400 A30,30 0 0,0 106,374" fill="none" stroke="#333" stroke-width="1"/>
  <!-- 设定关键点坐标 -->
  <!-- Point A (高产出): X=380 (距离原点300). Y必须也距离300 => Y = 400-300 = 100 -->
  <!-- Point A' (低产出): X=220 (距离原点140). Y必须也距离140 => Y = 400-140 = 260 -->
  <!-- ZZ 曲线 (低利率 i) -->
  <!-- 经过点 A(380, 100), 斜率约 0.5 -->
  <!-- y - 100 = -0.5(x - 380) => 当x=80, y=250. 当x=520, y=30 -->
  <line x1="80" y1="250" x2="520" y2="30" stroke="#5D5C98" stroke-width="2.5" />
  <text x="530" y="40" font-family="Arial" font-size="16" font-weight="bold" fill="#5D5C98" font-style="italic">ZZ</text>
  <text x="460" y="55" font-family="Arial" font-size="14" font-weight="bold" fill="#333">(for <tspan font-style="italic">i</tspan>)</text>
  <!-- ZZ' 曲线 (高利率 i' > i) -->
  <!-- 经过点 A'(220, 260), 斜率约 0.5 -->
  <!-- 向下平移。起点x=80, y=330. 终点x=520, y=110 -->
  <line x1="80" y1="330" x2="520" y2="110" stroke="#5D5C98" stroke-width="2.5" />
  <text x="530" y="120" font-family="Arial" font-size="16" font-weight="bold" fill="#5D5C98" font-style="italic">ZZ'</text>
  <text x="460" y="135" font-family="Arial" font-size="14" font-weight="bold" fill="#333">(for <tspan font-style="italic">i' > i</tspan>)</text>
  <!-- 移动箭头 -->
  <line x1="450" y1="80" x2="450" y2="135" stroke="#5D5C98" stroke-width="4" marker-end="url(#shiftArrow)" />
  <!-- 点 A 和 A' (图 a) -->
  <circle cx="380" cy="100" r="4" fill="black" />
  <text x="375" y="90" font-family="Arial" font-size="14" font-weight="bold">A</text>
  <circle cx="220" cy="260" r="4" fill="black" />
  <text x="210" y="250" font-family="Arial" font-size="14" font-weight="bold">A'</text>
  <!-- =========================================
       图 (b): The IS Curve
       原点设为 (80, 800)
       ========================================= -->
  <text x="50" y="600" font-family="Arial" font-size="16" fill="#333">(b)</text>
  <!-- 坐标轴 (b) -->
  <line x1="80" y1="800" x2="80" y2="480" stroke="black" stroke-width="1.5" />
  <line x1="80" y1="800" x2="550" y2="800" stroke="black" stroke-width="1.5" />
  <!-- 轴标签 (b) -->
  <text x="60" y="640" font-family="Arial" font-size="14" font-weight="bold" transform="rotate(-90, 60, 640)" text-anchor="middle">Interest, i</text>
  <text x="315" y="835" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Output, Y</text>
  <!-- 垂直虚线连接两个图 -->
  <!-- 对应 Y (A点 X=380) -->
  <line x1="380" y1="100" x2="380" y2="800" stroke="#999" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="380" y="420" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Y</text>
  <text x="380" y="820" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Y</text>
  <!-- 对应 Y' (A'点 X=220) -->
  <line x1="220" y1="260" x2="220" y2="800" stroke="#999" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="220" y="420" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Y'</text>
  <text x="220" y="820" font-family="Arial" font-size="14" font-weight="bold" text-anchor="middle">Y'</text>
  <!-- 关键点在图 (b) 上的位置 -->
  <!-- A: (380, low interest). Let's say y=720 -->
  <!-- A': (220, high interest). Let's say y=600 -->
  <!-- IS 曲线 -->
  <!-- 使用贝塞尔曲线连接 A' 和 A，并向两端延伸 -->
  <!-- Control points adjusted for smooth convex shape -->
  <path d="M 140 540 Q 200 700 480 750" fill="none" stroke="#555" stroke-width="2.5" />
  <text x="490" y="745" font-family="Arial" font-size="16" font-weight="bold" fill="#555" font-style="italic">IS curve</text>
  <!-- 点 A 和 A' (图 b) -->
  <!-- A' 位置 (220, ~610 based on curve) -->
  <!-- 为了精确，我们显式计算或调整曲线经过点。这里手动微调点到曲线上。 -->
  <!-- 假设 A' 在 (220, 610), A 在 (380, 710) -->
  <!-- 水平虚线 i 和 i' -->
  <line x1="80" y1="728" x2="380" y2="728" stroke="#999" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="70" y="715" font-family="Arial" font-size="14" font-style="italic" text-anchor="end">i</text>
  <circle cx="380" cy="728" r="4" fill="black" />
  <text x="390" y="718" font-family="Arial" font-size="14" font-weight="bold">A</text>
  <line x1="80" y1="647" x2="220" y2="647" stroke="#999" stroke-width="1.5" stroke-dasharray="5,5" />
  <text x="70" y="637" font-family="Arial" font-size="14" font-style="italic" text-anchor="end">i'</text>
  <circle cx="220" cy="647" r="4" fill="black" />
  <text x="230" y="637" font-family="Arial" font-size="14" font-weight="bold">A'</text>
</svg>

该图像的形状符合经济学意义，利率越高，人们越不乐意进行生产投入了。这一利率和产出的关系由向下倾斜的曲线表示，称为 IS 曲线。

#### IS 曲线的移动

IS 曲线是在给定税收 $$T$$ 和政府支出 $$G$$ 的情况下画出来的，$$T$$ 或者 $$G$$ 的变化将会导致 $$IS$$ 曲线的移动。

当 $$T$$ 增加时，可支配收入减少，产出减少，该曲线会向左移动。实际上，任何降低 $$c_{0}$$ 值的事物都会使得该曲线向左移动，消费者信心减少，财富减少，诸如此类。

### LM 关系

LM关系很简单。请回顾我们的金融货币市场均衡：

$$
M=\$YL(i)
$$

左边的 $$M$$ 代表名义货币存量，并假设央行直接控制 $$M$$，

两边同时除以 $$P$$，得到

$$
\frac{M}{P}=YL(i)
$$

在均衡点，货币供给和货币需求的值恰好相等，$$M$$ 是 $$Y$$ 和 $$i$$ 的函数。均衡条件重新表述为实际货币供给等于实际货币需求。

<svg width="800" height="450" viewBox="0 0 800 450" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="450" fill="white" />
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="black" />
    </marker>
  </defs>
  <!-- (a) 货币市场 -->
  <g transform="translate(60, 50)">
    <!-- 坐标轴 -->
    <line x1="0" y1="300" x2="320" y2="300" stroke="black" stroke-width="1.5" />
    <line x1="0" y1="300" x2="0" y2="0" stroke="black" stroke-width="1.5" />
    <!-- 轴标签 -->
    <text x="-10" y="150" font-family="sans-serif" font-size="14"
          transform="rotate(-90 -10,150)" text-anchor="middle">
      利率，i
    </text>
    <text x="160" y="325" font-family="sans-serif" font-size="14" text-anchor="middle">
      M/P
    </text>
    <text x="160" y="345" font-family="sans-serif" font-size="14" text-anchor="middle">
      (真实)货币，M/P
    </text>
    <text x="160" y="370" font-family="sans-serif" font-size="16" text-anchor="middle">
      (a)
    </text>
    <!-- 货币供给 -->
    <line x1="150" y1="300" x2="150" y2="20" stroke="black" stroke-width="1.5" />
    <text x="155" y="15" font-family="serif" font-style="italic" font-size="14">
      M<tspan baseline-shift="super" font-size="10">s</tspan>
    </text>
    <!-- Md(Y)，经过 A -->
    <path d="
      M 60 50
      Q 100 200 150 245
      Q 220 280 280 280
    " stroke="black" fill="none" stroke-width="1.5" />
    <text x="220" y="295" font-family="serif" font-style="italic" font-size="14">
      M<tspan baseline-shift="super" font-size="10">d</tspan>(Y)
    </text>
    <!-- Md'(Y'>Y)，经过 A' -->
    <path d="
      M 110 50
      Q 140 100 150 118
      Q 230 160 300 180
    " stroke="black" fill="none" stroke-width="1.5" />
    <text x="240" y="170" font-family="serif" font-style="italic" font-size="14">
      M<tspan baseline-shift="super" font-size="10">d'</tspan>(Y'>Y)
    </text>
    <!-- 需求右移箭头 -->
    <line x1="100" y1="100" x2="150" y2="100"
          stroke="black" stroke-width="2" marker-end="url(#arrowhead)" />
    <!-- A 点 -->
    <circle cx="150" cy="245" r="3" fill="black" />
    <text x="160" y="245" font-family="serif" font-style="italic" font-size="14">A</text>
    <!-- A' 点 -->
    <circle cx="150" cy="118" r="3" fill="black" />
    <text x="160" y="118" font-family="serif" font-style="italic" font-size="14">A'</text>
    <!-- 水平虚线 -->
    <line x1="0" y1="245" x2="150" y2="245" stroke="gray" stroke-dasharray="5,5" />
    <text x="-15" y="250" font-family="serif" font-style="italic" font-size="14">i</text>
    <line x1="0" y1="118" x2="150" y2="118" stroke="gray" stroke-dasharray="5,5" />
    <text x="-15" y="123" font-family="serif" font-style="italic" font-size="14">i'</text>
  </g>
  <!-- (b) LM 曲线 -->
  <g transform="translate(460, 50)">
    <!-- 坐标轴 -->
    <line x1="0" y1="300" x2="320" y2="300" stroke="black" stroke-width="1.5" />
    <line x1="0" y1="300" x2="0" y2="0" stroke="black" stroke-width="1.5" />
    <!-- 轴标签 -->
    <text x="-10" y="150" font-family="sans-serif" font-size="14"
          transform="rotate(-90 -10,150)" text-anchor="middle">
      利率，i
    </text>
    <text x="160" y="325" font-family="sans-serif" font-size="14" text-anchor="middle">
      收入，Y
    </text>
    <text x="160" y="370" font-family="sans-serif" font-size="16" text-anchor="middle">
      (b)
    </text>
    <!-- LM 曲线（严格经过 A 与 A'） -->
    <path d="
      M 40 280
      Q 90 260 110 245
      Q 170 170 215 118
      Q 260 70 280 40
    " stroke="black" fill="none" stroke-width="2" />
    <text x="240" y="35" font-family="sans-serif" font-weight="bold" font-size="14">
      LM 曲线
    </text>
    <!-- A 点 -->
    <circle cx="110" cy="245" r="3" fill="black" />
    <text x="100" y="235" font-family="serif" font-style="italic" font-size="14">A</text>
    <!-- A' 点 -->
    <circle cx="215" cy="118" r="3" fill="black" />
    <text x="205" y="108" font-family="serif" font-style="italic" font-size="14">A'</text>
    <!-- 虚线投影 -->
    <line x1="0" y1="245" x2="110" y2="245" stroke="gray" stroke-dasharray="5,5" />
    <text x="-15" y="250" font-family="serif" font-style="italic" font-size="14">i</text>
    <line x1="0" y1="118" x2="215" y2="118" stroke="gray" stroke-dasharray="5,5" />
    <text x="-15" y="123" font-family="serif" font-style="italic" font-size="14">i'</text>
    <line x1="110" y1="300" x2="110" y2="245" stroke="gray" stroke-dasharray="5,5" />
    <text x="105" y="315" font-family="serif" font-style="italic" font-size="14">Y</text>
    <line x1="215" y1="300" x2="215" y2="118" stroke="gray" stroke-dasharray="5,5" />
    <text x="210" y="315" font-family="serif" font-style="italic" font-size="14">Y'</text>
  </g>
  <!-- 标题 -->
  <text x="400" y="430" font-family="sans-serif"
        font-weight="bold" font-size="18" text-anchor="middle">
    图  LM 曲线的推导
  </text>
  <!-- 跨图对齐虚线 -->
  <line x1="210" y1="295" x2="460" y2="295" stroke="lightgray" stroke-dasharray="2,2" />
  <line x1="210" y1="168" x2="460" y2="168" stroke="lightgray" stroke-dasharray="2,2" />
</svg>

如图 a 反映了图 b 中货币收入水平下的利率水平，金融市场均衡就代表着，产出水平越高，货币需求越大，均衡的利率也越高。因此产生了 **LM曲线**。

#### LM曲线的移动

实际货币存量 $$\frac{M}{P}$$ 的变化将会引起 LM 曲线的移动。

考虑名义货币供给从 $$M$$ 增加到 $$M'$$ ，因此当价格水平不变的时候，实际货币供给增加，均衡理论下降到 $$i'$$，另一方面，LM曲线向下移动到 LM'，货币供给减少将导致均衡利率上升，货币供给减少引起曲线上移。

<svg width="500" height="400" viewBox="0 0 500 400" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="white" />
  <line x1="80" y1="50" x2="80" y2="320" stroke="black" stroke-width="1.5" /> <line x1="80" y1="320" x2="450" y2="320" stroke="black" stroke-width="1.5" /> <text x="35" y="180" font-family="serif" font-size="16" transform="rotate(-90, 35, 180)">利率, $$i$$</text>
  <text x="240" y="360" font-family="serif" font-size="16">收入, $$Y$$</text>
  <path d="M 120,230 Q 250,200 380,100" fill="none" stroke="black" stroke-width="1.2" />
  <text x="390" y="95" font-family="serif" font-size="14">LM ($$M/P$$)</text>
  <path d="M 120,290 Q 250,260 380,160" fill="none" stroke="black" stroke-width="2" />
  <text x="390" y="180" font-family="serif" font-size="14">LM' ($$M'/P > M/P$$)</text>
  <line x1="310" y1="138" x2="310" y2="320" stroke="black" stroke-width="1" stroke-dasharray="5,5" />
  <text x="305" y="338" font-family="serif" font-size="14" font-style="italic">Y</text>
  <line x1="80" y1="138" x2="310" y2="138" stroke="black" stroke-width="1" stroke-dasharray="5,5" />
  <circle cx="310" cy="138" r="3" fill="black" />
  <text x="60" y="142" font-family="serif" font-size="14" font-style="italic">i</text>
  <line x1="80" y1="198" x2="310" y2="198" stroke="black" stroke-width="1" stroke-dasharray="5,5" />
  <circle cx="310" cy="198" r="3" fill="black" />
  <text x="60" y="202" font-family="serif" font-size="14" font-style="italic">i'</text>
  <path d="M 345,125 L 345,155" fill="none" stroke="black" stroke-width="1.5" />
  <path d="M 338,148 L 345,158 L 352,148" fill="none" stroke="black" stroke-width="1.5" />
  <text x="180" y="390" font-family="sans-serif" font-size="16" font-weight="bold">图 5-5 LM 曲线的移动</text>
</svg>

记得把这幅图改一下！！！

在实践中，中央银行设定操作利率并调控货币供给量，需确保该利率与金融市场的均衡状态相匹配。

收入 $$Y$$ 的变化如何影响利率 $$i$$ ？

如果产出（收入）$$Y$$ 增加 $$\rightarrow$$ 交易需求增加 $$\rightarrow$$ 货币需求 $$M^d$$ 曲线向右移动。在货币供给 $$M/P$$ 不变的情况下，人们为了获得现金会抛售债券，导致债券价格下跌，**利率 $$i$$ 上升**。因此，在 $$i-Y$$ 坐标系中，**LM 曲线是向上倾斜的**。

> **现代视角**：
> 在布兰查德较新的教材版本中，LM 曲线常被简化为一条**水平线**。因为现代央行（如美联储）通常直接设定**目标利率 ($$i = \bar{i}$$)**，而不是固定货币供给量。但在学习初级模型时，理解向上倾斜的 LM 曲线对理解“挤出效应”至关重要。

---

## 综合 IS-LM 模型

$$
\text{IS关系}\quad Y=C(Y-{T})+I(Y,i)+G
$$

$$
\text{LM关系}\quad \frac{M}{P}=YL(i)
$$

将两条曲线放在同一个 $$i-Y$$ 图中。

**均衡点 $$A$$**：代表了**商品市场和金融市场同时达到均衡**。

在该点，给定的利率 $$i^*$$ 产生的需求恰好等于产出 $$Y^*$$，且该产出水平下产生的货币需求恰好等于央行的货币供给。

### 财政政策、经济活动与利率

政府支出不变增加税收，减少赤字的政策称为**财政紧缩**，赤字增加，或是因为支出增加，或是因为税收减少，被称为**财政扩张**。这些政策对财政产出、成分与利率有什么影响？

1. 具体分析对 IS 与 LM 曲线移动的影响
2. 描述这些移动对均衡的影响
3. 描述总体影响

### 政策分析：加税

首先分析对 IS 曲线的影响。对于任一点 B，税收从 $$T$$ 增加到 $$T'$$，由上文知，曲线左移。

对于 LM 曲线，没有变化，税收是一个不出现的变量。

第二步，IS曲线向左移动，引起均衡点向左下方移动：$$Y$$ 减少到 $$Y'$$ ，利率 $$i$$ 减少到 $$i'$$，经济沿着LM曲线移动。

第三步，描述总体影响：税收增加引起可支配收入减少，导致人们消费减少，产出收入减少，进而引起货币需求减少，利率下降。利率下降削弱但没有完全抵消高税收对商品需求的影响。

不过还有一个要素，投资是如何变化的？一般来说投资是由销售与利率共同决定的（政府赤字增加导致投资减少称为**投资被赤字挤出**，反之称为**投资被赤字挤入**）。

### 货币政策、经济活动与利率

货币供给增加称为货币扩张，货币供给减少称为货币紧缩。

### 政策分析：货币扩张

首先分析对 IS 曲线的影响，M没有出现在IS关系中，因此IS曲线不移动

对于LM曲线，货币供给增加时LM曲线将按照我们在上面描述的一样向下移动，从 $$LM$$ 到 $$LM'$$，货币供给增加导致利率下降。

第二步，分析曲线，货币扩张使得LM曲线向下移动，经济沿着IS曲线移动，均衡点从 $$A$$ 移动到 $$A'$$，产出增加到 $$Y'$$，利率下降到 $$i'$$。

第三步，描述过程，货币供给增加导致利率下降，低利率导致投资增加并导致需求与产出增加。

### 政策组合

货币政策和财政政策的结合被称为**货币财政政策组合**，或者就称为**政策组合**。

### 政策分析：“经济过热”

用开篇提到的“疫情后经济过热”作为案例，在模型中进行演练：

#### 扩张阶段（IS 曲线右移）
*   **现象**：政府大额补贴（$$G \uparrow, T \downarrow$$）+ 财富效应（$$c_0 \uparrow$$）。
*   **模型**：IS 曲线大幅向右平移。
*   **结果**：产出 $$Y$$ 增加，同时利率 $$i$$ 面临上行压力。经济达到一个极高的 $$Y$$，超过了潜在生产能力（过热）。

#### 紧缩阶段（LM 曲线向上/平移）
*   **现象**：美联储为了抗通胀加息。
*   **模型**：LM 曲线向上平移（或央行提高目标利率线）。
*   **结果**：利率 $$i$$ 上升 $$\rightarrow$$ 投资 $$I$$ 下降 $$\rightarrow$$ 总需求 $$Z$$ 下降 $$\rightarrow$$ 产出 $$Y$$ 回落到正常水平，经济降温。

### 动态与政策组合

**为什么不能只靠货币政策，或者只靠财政政策？**

当政府使用扩张性财政政策（增加 $$G$$）时，产出增加会推高利率，进而抑制私人投资 $$I$$。这就是“财政扩张挤出了私人投资”，也就是我们提及的**挤出效应**。

在疫情期间，美国采取了“双扩张”（IS 右移 + LM 下移），导致了极大的需求爆发；而现在需要“双管齐下”的回归。必须要政策协同。

## 其他内容：拓展 IS-LM 模型

如果通胀率不为0，那么就会出现实际利率和名义利率的区分。

名义利率，实际账单上的利率；实际利率，一篮子货币的利率。

<svg width="800" height="600" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#ffffff" />
  <text x="350" y="40" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">This year</text>
  <text x="750" y="40" font-family="Arial, sans-serif" font-size="16" text-anchor="middle">Next year</text>
  <defs>
    <!-- 修改箭头为细箭头 -->
    <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="0" refY="2" orient="auto">
      <polygon points="0 0, 6 2, 0 4" fill="#333" />
    </marker>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#999;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#333;stop-opacity:1" />
    </linearGradient>
  </defs>
  <line x1="380" y1="35" x2="710" y2="35" stroke="url(#grad1)" stroke-width="3" marker-end="url(#arrowhead)" />
  <text x="50" y="140" font-family="Arial, sans-serif" font-size="16" fill="#333">Definition of</text>
  <text x="50" y="160" font-family="Arial, sans-serif" font-size="16" fill="#333">the real rate:</text>
  <path d="M 200 110 Q 210 145 200 180" fill="none" stroke="#ccc" stroke-width="1" />
  <rect x="230" y="100" width="550" height="100" fill="#f9e6e6" />
  <rect x="260" y="120" width="160" height="60" fill="#b01e28" />
  <text x="340" y="157" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">1 good</text>
  <text x="500" y="125" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Goods</text>
  <!-- 修改为细箭头 -->
  <line x1="440" y1="145" x2="560" y2="145" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" />
  <rect x="580" y="120" width="180" height="60" fill="#b01e28" />
  <text x="670" y="157" font-family="Times New Roman, serif" font-size="18" font-style="italic" font-weight="bold" fill="white" text-anchor="middle">
    (1 + r<tspan dy="5" font-size="12">t</tspan><tspan dy="-5">) goods</tspan>
  </text>
  <!-- 修改为细箭头 -->
  <line x1="710" y1="200" x2="710" y2="230" stroke="#b01e28" stroke-width="3" marker-end="url(#arrowhead)" />
  <g transform="translate(600, 260)">
    <text x="0" y="0" font-family="Times New Roman, serif" font-size="20" font-style="italic" font-weight="bold">
      (1 + r<tspan dy="5" font-size="14">t</tspan><tspan dy="-5">) =</tspan>
    </text>
    <g transform="translate(70, -25)">
      <text x="50" y="15" font-family="Times New Roman, serif" font-size="18" font-style="italic" font-weight="bold" text-anchor="middle">
        (1 + i<tspan dy="5" font-size="12">t</tspan><tspan dy="-5">) P</tspan><tspan dy="5" font-size="12">t</tspan>
      </text>
      <line x1="0" y1="22" x2="100" y2="22" stroke="black" stroke-width="1" />
      <text x="50" y="45" font-family="Times New Roman, serif" font-size="18" font-style="italic" font-weight="bold" text-anchor="middle">
        P<tspan dy="-8" font-size="12">e</tspan><tspan dy="8" dx="-5" font-size="12">t+1</tspan>
      </text>
    </g>
  </g>
  <!-- 修改为细箭头 -->
  <line x1="710" y1="330" x2="710" y2="305" stroke="#b01e28" stroke-width="3" marker-end="url(#arrowhead)" />
  <text x="50" y="440" font-family="Arial, sans-serif" font-size="16" fill="#333">Derivation of</text>
  <text x="50" y="460" font-family="Arial, sans-serif" font-size="16" fill="#333">the real rate:</text>
  <path d="M 200 370 Q 210 445 200 520" fill="none" stroke="#ccc" stroke-width="1" />
  <rect x="230" y="340" width="550" height="100" fill="#f9e6e6" />
  <rect x="230" y="440" width="550" height="100" fill="#e8ecf8" />
  <rect x="260" y="360" width="160" height="60" fill="#b01e28" />
  <text x="340" y="397" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="white" text-anchor="middle">1 good</text>
  <!-- 修改为细箭头 -->
  <line x1="340" y1="420" x2="340" y2="435" stroke="#8a96d1" stroke-width="3" marker-end="url(#arrowhead)" />
  <rect x="260" y="460" width="160" height="60" fill="#3e599b" />
  <text x="340" y="497" font-family="Times New Roman, serif" font-size="18" font-style="italic" font-weight="bold" fill="white" text-anchor="middle">
    P<tspan dy="5" font-size="12">t</tspan><tspan dy="-5"> dollars</tspan>
  </text>
  <rect x="580" y="460" width="180" height="60" fill="#3e599b" />
  <text x="670" y="497" font-family="Times New Roman, serif" font-size="18" font-style="italic" font-weight="bold" fill="white" text-anchor="middle">
    (1 + i<tspan dy="5" font-size="12">t</tspan><tspan dy="-5">) P</tspan><tspan dy="5" font-size="12">t</tspan><tspan dy="-5"> dollars</tspan>
  </text>
  <!-- 修改为细箭头 -->
  <line x1="440" y1="490" x2="560" y2="490" stroke="url(#grad1)" stroke-width="2" marker-end="url(#arrowhead)" />
  <!-- 修改为细箭头 -->
  <line x1="670" y1="460" x2="670" y2="445" stroke="#b01e28" stroke-width="3" marker-end="url(#arrowhead)" />
  <rect x="580" y="360" width="180" height="60" fill="#b01e28" />
  <g transform="translate(670, 385)">
    <g transform="translate(-40, -15)">
      <text x="40" y="10" font-family="Times New Roman, serif" font-size="14" font-style="italic" font-weight="bold" fill="white" text-anchor="middle">
        (1 + i<tspan dy="3" font-size="10">t</tspan><tspan dy="-3">) P</tspan><tspan dy="3" font-size="10">t</tspan>
      </text>
      <line x1="0" y1="14" x2="80" y2="14" stroke="white" stroke-width="1" />
      <text x="40" y="28" font-family="Times New Roman, serif" font-size="14" font-style="italic" font-weight="bold" fill="white" text-anchor="middle">
        P<tspan dy="-6" font-size="10">e</tspan><tspan dy="6" dx="-3" font-size="10">t+1</tspan>
      </text>
    </g>
    <text x="50" y="12" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="white">goods</text>
  </g>
  <text x="500" y="365" font-family="Arial, sans-serif" font-size="14" text-anchor="middle">Goods</text>
  <!-- 修改为细箭头 -->
  <line x1="440" y1="385" x2="560" y2="385" stroke="#333" stroke-width="2" marker-end="url(#arrowhead)" />
</svg>

由

$$
1+r_{t'}=(1+i_{t}) \frac{P_{t}}{P^e_{t+1}}
$$

和 

$$
\pi^e_{t+1}=P^e_{t+1}-R_{t}
$$

得到 

$$
r_{t}\approx i_{t}-\pi^e_{t+1}
$$

### 风险溢价

我们知道投资者面对风险时需要风险溢价来面对风险。私营机构面对这种风险，就要基于调整后的利率来进行选择。风险溢价主要取决于：

1. 违约风险
2. 风险厌恶的程度

$$
1+r_{t}=(1-p_{t})(1+r_{t}^F)+p_{t}\times {0}=(1-p_{t})(1+r_{t}+x_{t})
$$

所以溢价的程度就是 

$$
x_{t}=\frac{p_{t}}{1-p_{t}}(1+r_{t})
$$

### IS-LM 的问题

金融冲击，利率在经济衰退与增长时的变化会怎么移动IS-LM模型？

我们需要先对公式进行一次修正**。在引入风险溢价（$$x$$）和预期通胀（$$\pi^e$$）后，模型发生了微妙的变化：

*   **IS 关系（实际经济支出）**：

$$
Y = C(Y - T) + I(Y, \underbrace{i - \pi^e}_{r} + x) + G
$$

投资取决于**借贷利率（Borrowing Rate）**，即 $$r + x$$。

*   **LM 关系（货币政策）**：

    $$
    r = \bar{r}
    $$

    现代央行直接设定**政策利率** $$r$$。

---

#### 金融冲击

利率在经济衰退与增长时如何移动模型，最经典的案例就是**金融危机（Financial Crisis）**。

A. 冲击源：风险溢价 $$x$$ 激增
假设发生金融震荡（如房地产泡沫破裂、银行倒闭），即便央行没有改变政策利率 $$r$$：
1.  **违约概率 $$p$$ 上升** $$\rightarrow$$ 根据的公式，**风险溢价 $$x$$ 大幅上升**。
2.  **借贷成本上升**：虽然 $$r$$ 没变，但企业和个人面对的实际成本 $$r + x$$ 飙升。
3.  **投资 $$I$$ 下降**。

B. 曲线移动：IS 曲线左移
这种冲击虽然发生在金融市场，但它在 $$r-Y$$ 图中表现为 **IS 曲线的左移**。

<svg width="600" height="450" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
      <path d="M0,0 L0,6 L9,3 z" fill="red" />
    </marker>
  </defs>
  <!-- 坐标轴 -->
  <line x1="60" y1="380" x2="60" y2="40" stroke="black" stroke-width="2" />
  <line x1="60" y1="380" x2="550" y2="380" stroke="black" stroke-width="2" />
  <text x="40" y="50" font-family="Arial" font-size="14">Real Interest rate, r</text>
  <text x="520" y="410" font-family="Arial" font-size="14">Output, Y</text>
  <!-- LM 曲线 (水平) -->
  <line x1="60" y1="200" x2="500" y2="200" stroke="blue" stroke-width="3" />
  <text x="510" y="205" font-family="Arial" font-size="14" fill="blue" font-weight="bold">LM (r = r̄)</text>
  <!-- 原始 IS 曲线 -->
  <line x1="150" y1="80" x2="450" y2="350" stroke="black" stroke-width="2.5" />
  <text x="460" y="340" font-family="Arial" font-size="14">IS (x)</text>
  <!-- 移动后的 IS 曲线 (左移) -->
  <line x1="80" y1="80" x2="380" y2="350" stroke="red" stroke-width="2.5" stroke-dasharray="5,5" />
  <text x="280" y="370" font-family="Arial" font-size="14" fill="red">IS (x' > x)</text>
  <!-- 移动箭头 -->
  <line x1="320" y1="230" x2="250" y2="230" stroke="red" stroke-width="2" marker-end="url(#arrow)" />
  <!-- 均衡点 -->
  <circle cx="283" cy="200" r="4" fill="red" />
  <text x="270" y="190" font-family="Arial" font-size="12">A'</text>
  <circle cx="316" cy="200" r="4" fill="black" />
  <text x="320" y="190" font-family="Arial" font-size="12">A</text>
</svg>

即使央行保持利率不变，金融系统的功能障碍也会导致经济衰退（$$Y$$ 下降）。

---

### 政策利率 借贷利率

在金融市场拓展模型中，最重要的直觉是：**央行决定的利率（Policy Rate）不等于企业付出的利率（Borrowing Rate）。**

*   **Policy Rate ($$r$$)**：由央行 LM 曲线决定。
*   **Borrowing Rate ($$r+x$$)**：决定 IS 曲线中投资的部分。

**金融危机的本质**，就是由于 $$x$$ 暴涨，导致无论央行如何降低 $$r$$，企业面对的 $$r+x$$ 依然居高不下，从而导致经济停滞。

[^1]: 这可以被建模为：$$C = c_0 + c_1(Y-T) + c_2(\text{Wealth})$$这意味着即使收入 $$Y$$ 没变，只要房子和股票涨了，消费 $$C$$ 也会增加，从而导致 IS 曲线右移。这正是 2021-2022 年美国经济表现如此强劲的关键原因。
