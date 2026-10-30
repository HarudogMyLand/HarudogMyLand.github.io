---
title: "宏观经济学-劳动力市场与自然失业率"
date: 2026-06-18
excerpt: "在中期，经济倾向于向与自然失业率对应的产出水平回归"
tags:
  - Economics
  - Macroeconomics
columns:
  - macroeconomics
mathjax: true
---

> 在中期，经济倾向于向与自然失业率对应的产出水平回归

劳动力市场是衡量经济健康状况的重要指标，其状况是通货膨胀率的主要驱动因素之一。

回顾一下劳动力的几个概念定义，失业率，就业率，劳动参与率等等。 

## 劳动力市场概况

在分析劳动力市场时，我们关注的是**人口、劳动力、就业与失业**之间的关系。

- **非劳动力** 既没有工作也不找工作的人。
- **劳动力：** 就业者 ($$N$$) + 失业者 ($$U$$)。
- **失业率：** 失业人数占劳动力的百分比，$$u = U/L$$。
- **参与率：** 劳动力占劳动年龄人口的比例。

对于失业率的理解，有一个经典例子，来自布兰查德德书：

> 假设一个机场挤满了乘客，一种原因可能是该机场非常繁忙，有许多飞机起飞和降落，而众多乘客也迅速出入于机场之间；另一种原因可能是坏天气延误了航班导致乘客滞留，乘客在等待天气转好。
> 在两种情况下乘客人数可能是相同的，但他们的情形却是完全不同的。在第二种情形的乘客多半会更沮丧。

<svg width="600" height="450" viewBox="0 0 600 450" xmlns="http://www.w3.org/2000/svg" style="background-color: white; font-family: sans-serif;">
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#000" />
    </marker>
  </defs>
  <circle cx="300" cy="120" r="50" fill="none" stroke="black" stroke-width="1.5" />
  <text x="300" y="115" text-anchor="middle" font-size="16">就业:</text>
  <text x="300" y="140" text-anchor="middle" font-size="16">132.4</text>
  <circle cx="200" cy="330" r="50" fill="none" stroke="black" stroke-width="1.5" />
  <text x="200" y="325" text-anchor="middle" font-size="16">失业: 8.4</text>
  <circle cx="400" cy="330" r="50" fill="none" stroke="black" stroke-width="1.5" />
  <text x="400" y="325" text-anchor="middle" font-size="16">非劳动力</text>
  <text x="400" y="350" text-anchor="middle" font-size="16">73.3</text>
  <path d="M 280,75 Q 300,20 320,75" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="300" y="45" text-anchor="middle" font-size="14">3.1</text>
  <path d="M 270,165 L 220,285" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="235" y="215" text-anchor="middle" font-size="14" transform="rotate(-65, 235, 215)">1.8</text>
  <path d="M 245,290 L 290,175" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="275" y="240" text-anchor="middle" font-size="14" transform="rotate(-65, 275, 240)">2.1</text>
  <path d="M 325,165 L 380,285" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="365" y="215" text-anchor="middle" font-size="14" transform="rotate(65, 365, 215)">3.6</text>
  <path d="M 355,290 L 310,175" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="325" y="240" text-anchor="middle" font-size="14" transform="rotate(65, 325, 240)">3.3</text>
  <path d="M 255,340 L 345,340" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="300" y="360" text-anchor="middle" font-size="14">1.9</text>
  <path d="M 345,320 L 255,320" fill="none" stroke="black" stroke-width="1" marker-end="url(#arrowhead)" />
  <text x="300" y="310" text-anchor="middle" font-size="14">1.8</text>
</svg>

这张图来自 Fleischman and Fallick 编制的计算序列，数据来自于 http://www.federalreserve.gov/econresdata/researchdata.htm

值得注意的是，流入非劳动力的人口非常巨大，同时非劳动力流入劳动力市场的流量亦不可忽视。这说明非劳动力市场中的个体并非不参与生产，布兰查德将其称为“丧失信心的“工人，如果有明显的劳动机会，他们会参与生产。因此就业率有时比失业率更为客观。

然而，我们依然按照传统将失业率作为测量劳动力市场的指标。

## 工资决定：工人视角

在讨论了失业之后，我们来研究工资决定以及工资和失业的关系。

工资并不是简单由供需曲线交点决定的，而是通过**集体谈判**或**个体议价**达成的[^2]。但是，虽然各国工资制度差异显著，也有一些共同影响因素。工人必须拿到**保留工资**，类似于保留价格，工人就业必须要有劳动的报酬。同时，失业率越高的情况下，工资一般越低。

### 工资决定方程

$$W = P^e F(u, z)$$

- **$$W$$ (名义工资)：** 雇员拿到的货币工资。
- **$$P^e$$ (预期价格水平)：** 工人关心的是**实际工资** ($$W/P$$)。由于合同通常是预先签订的，所以取决于对未来价格的预期。[^5]
- **$$u$$ (失业率)：** 失业率越高，工人的议价能力（Bargaining Power[^3]）越低，工资越低。
- **$$z$$ (结构性变量)：** 包含所有影响工资的其他因素（如失业保险、最低工资法、工会保护）。$$z$$ 增加，工资上升。

工人的议价能力取决于公司找到劳动力的成本与工人自己求职的成本，所以，失业率上升的时候公司的劳动力市场充裕，工人议价能力下降。

## 价格决定：公司视角

公司并非不愿意支付高于保留工资的工资，高工资可以吸引员工工作[^4]。但是设定工资必须与公司商品的价格挂钩。价格决定于公司的成本，又取决于生产函数：

$$Y=AN$$

其中 $$Y$$ 是产出，$$A$$ 是劳动生产率，$$N$$ 是雇佣就业，我们假定劳动是唯一生产要素，而资本等要素不在本模型之列。

假设生产函数简化为 $$Y = AN$$（简化为 1，长期的时候会继续讨论 $$A$$ 的变动 ），则边际成本就等于工资 $$W$$（非常重要！）。

由于企业通常具有一定的市场势力[^1]，会在成本基础上加价：

$$P = (1 + m)W$$

- **$$m$$ (Mark-up)：** 价格加成。如果市场竞争激烈，$$m$$ 就会降低；如果是垄断市场，$$m$$ 就会升高，这和微观经济学中的理论是一致的。
- **由此推导出的实际工资：** $$\frac{W}{P} = \frac{1}{1+m}$$

### 自然失业率：均衡视角

自然失业率一点也不“自然”[^6]。它不是由自然法则决定的，而是由经济结构决定的。它本质上是指当人们对价格的**预期完全正确**（$$P^e = P$$）时的均衡失业率水平。

在劳动力市场中，工资合同通常是基于对未来的**预期价格 ($$P^e$$)** 签订的,工人可能会猜错价格（比如通胀比预想的高），此时失业率会偏离自然率。中长期内，人们会调整预期，错误会消失。因此，自然失业率被视为经济在中期**倾向于回归的平均水平。

当**工资设定 (WS)** 与 **价格设定 (PS)** 相等时，市场达到均衡。

- **WS 关系：** $$\frac{W}{P} = F(u, z)$$
- **PS 关系：** $$\frac{W}{P} = \frac{1}{1+m}$$

自然失业率方程：

$$F(u_n, z) = \frac{1}{1+m}$$

这个方程决定了自然失业率与 $$z$$ ,$$m$$ 的关系。其中均衡的 $$u_{m}$$ 失业率称为**自然失业率**。改变 $$z,m$$ 就会相应地影响 $$u_{m}$$ 的动态平衡。例如，增加失业救济金发放：

<svg width="800" height="520" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景 -->
  <rect width="800" height="520" fill="white"/>
  <!-- 坐标轴（原点在左下） -->
  <line x1="120" y1="420" x2="120" y2="80" stroke="#000" stroke-width="2"/>
  <line x1="120" y1="420" x2="720" y2="420" stroke="#000" stroke-width="2"/>
  <!-- 坐标轴箭头 -->
  <polygon points="120,60 114,74 126,74" fill="#000"/>
  <polygon points="740,420 726,414 726,426" fill="#000"/>
  <!-- 坐标轴文字 -->
  <text x="40" y="260" transform="rotate(-90 40,260)" font-size="16">
    实际工资 W/P
  </text>
  <text x="680" y="460" font-size="16">
    失业率 u
  </text>
  <!-- PS 水平线 -->
  <line x1="120" y1="260" x2="720" y2="260" stroke="#000" stroke-width="2"/>
  <text x="730" y="265" font-size="14">PS</text>
  <!-- WS 曲线（明确经过 A） -->
  <!-- A = (300,260) -->
  <path d="M200 180
           C 250 220, 280 245, 300 260
           C 360 300, 460 360, 620 400"
        fill="none" stroke="#888" stroke-width="2"/>
  <text x="630" y="405" font-size="14" fill="#888">WS</text>
  <!-- WS' 曲线（明确经过 A'） -->
  <!-- A' = (420,260) -->
  <path d="M260 130
           C 330 200, 380 235, 420 260
           C 500 310, 600 350, 700 380"
        fill="none" stroke="#000" stroke-width="2.5"/>
  <text x="710" y="385" font-size="14">WS′</text>
  <!-- A 点 -->
  <circle cx="300" cy="260" r="4" fill="#000"/>
  <text x="285" y="245" font-size="14">A</text>
  <!-- A' 点 -->
  <circle cx="420" cy="260" r="4" fill="#000"/>
  <text x="405" y="245" font-size="14">A′</text>
  <!-- 垂直虚线到 x 轴 -->
  <line x1="300" y1="260" x2="300" y2="420"
        stroke="#000" stroke-dasharray="6,6"/>
  <line x1="420" y1="260" x2="420" y2="420"
        stroke="#000" stroke-dasharray="6,6"/>
  <!-- u_n 与 u_n' -->
  <text x="285" y="445" font-size="14">uₙ</text>
  <text x="405" y="445" font-size="14">uₙ′</text>
  <!-- WS 上移箭头 -->
  <line x1="260" y1="190" x2="260" y2="150" stroke="#000" stroke-width="2"/>
  <polygon points="260,140 254,152 266,152" fill="#000"/>
  <!-- 标题 -->
  <text x="400" y="40" text-anchor="middle"
        font-size="18" font-weight="bold">
    失业救济金和自然失业率
  </text>
</svg>

救济金的增加导致 $$z$$ 的增加，在给定失业率的情况下，增加了工资，工资制定曲线向上移动。即：在既定失业率下，失业救济金增加导致实际工资增加，高失业率促使实际工资回到企业愿意支付的水平。

另一个例子是反托拉斯立法，也就是针对 $$m$$ 做文章。反垄断法的严格执行将会给予市场寡头当头一棒，迫使其降低 $$m$$ 的值。因此，自然失业率将会下降。

<svg width="800" height="520" viewBox="0 0 800 520" xmlns="http://www.w3.org/2000/svg">
  <!-- 背景 -->
  <rect width="800" height="520" fill="white"/>
  <!-- 坐标轴（原点在左下） -->
  <line x1="120" y1="420" x2="120" y2="80" stroke="#000" stroke-width="2"/>
  <line x1="120" y1="420" x2="720" y2="420" stroke="#000" stroke-width="2"/>
  <!-- 坐标轴箭头 -->
  <polygon points="120,60 114,74 126,74" fill="#000"/>
  <polygon points="740,420 726,414 726,426" fill="#000"/>
  <!-- 坐标轴文字 -->
  <text x="35" y="260" transform="rotate(-90 35,260)" font-size="16">
    实际工资 W/P
  </text>
  <text x="680" y="460" font-size="16">
    失业率 u
  </text>
  <!-- PS 水平线 -->
  <line x1="120" y1="240" x2="720" y2="240" stroke="#000" stroke-width="2"/>
  <text x="730" y="245" font-size="14">PS</text>
  <!-- PS' 水平线 -->
  <line x1="120" y1="300" x2="720" y2="300" stroke="#000" stroke-width="2"/>
  <text x="730" y="305" font-size="14">PS′</text>
  <!-- WS 曲线（穿过 A 与 A'） -->
  <path d="
    M 240 100
    C 270 170, 290 215, 300 240
    C 340 285, 390 295, 420 300
    C 520 330, 620 360, 700 390
  "
        fill="none" stroke="#000" stroke-width="2.5"/>
  <text x="710" y="395" font-size="14">WS</text>
  <!-- A 点 -->
  <circle cx="300" cy="240" r="4" fill="#000"/>
  <text x="285" y="225" font-size="14">A</text>
  <!-- A' 点 -->
  <circle cx="420" cy="300" r="4" fill="#000"/>
  <text x="405" y="285" font-size="14">A′</text>
  <!-- 垂直虚线 -->
  <line x1="300" y1="240" x2="300" y2="420"
        stroke="#000" stroke-dasharray="6,6"/>
  <line x1="420" y1="300" x2="420" y2="420"
        stroke="#000" stroke-dasharray="6,6"/>
  <!-- u_n 与 u_n' -->
  <text x="285" y="445" font-size="14">uₙ</text>
  <text x="405" y="445" font-size="14">uₙ′</text>
  <!-- 左侧工资标注（向左微调，避免与坐标轴重合） -->
  <text x="60" y="245" font-size="14">1/(1+m)</text>
  <text x="60" y="305" font-size="14">1/(1+m′)</text>
  <!-- 向下箭头（价格加成上升） -->
  <line x1="500" y1="255" x2="500" y2="285" stroke="#000" stroke-width="2"/>
  <polygon points="500,295 494,283 506,283" fill="#000"/>
  <!-- 标题 -->
  <text x="400" y="40" text-anchor="middle"
        font-size="18" font-weight="bold">
    价格加成和自然失业率
  </text>
</svg>

$$z,m$$ 都是结构性经济变量，所以 $$u_{n}$$ 更应该称为结构性失业率，不过至今该名称都没有被普遍采用。

### 失业、就业与产出

自然就业水平反映了自然失业均衡时的就业水平：$$N=L(1-u_{m})$$考虑到我们假定的生产函数 $$Y=AN$$有 $$Y_{n}=N_{n}=L(1-u_{n})$$
### 中期

需要注意，我们的理论已经进入了经济发展的中期时间，但是为什么我们不像前几章短期研究中一样，考虑货币政策，财政政策？为什么消费者信心之类的因素不影响自然产出？

因为我们的假设是在中期中实现的，没有理由认为，短期内价格水平能够稳定，也没有理由认为短期内就能做好工资的预测。短期内决定产出的变动的因素依然是货币政策，财政政策等等。

中期经济研究对短期的启示是，短期内不太可能出现严重的系统性错误。例如，产出率严重偏离自然产出率，失业率严重偏离了自然失业率，这通常意味着经济危机，经济爆发，或者统计出错了。

[^1]: 详见微观经济学垄断势力

[^2]: 在美国集体谈判作用极其有限，不到10%的工人能够通过集体谈判确定工资，剩下的主要是雇主确定或者个体谈判

[^3]: Bargain，到底是工人展示自己的能力还是把自己商品呢？恐怕只有商品才能 Bargain 吧！

[^4]: 参考微观经济学要素市场

[^5]: 然而，短期内大多数工人都是根据当下情况进行工资设定。只有到了中期才会逐步调整预期工资

[^6]: 因为自然主要特指某些常数，常量或者外生量。
