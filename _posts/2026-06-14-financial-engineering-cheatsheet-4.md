---
title: "远期与期货运用 · Cheat Sheet"
date: 2026-06-14
excerpt: "多头套保：担心价格上涨，锁定未来买入价格"
tags:
  - Finance
  - Financial Engineering
  - Derivatives
  - Cheat Sheet
columns:
  - financial-engineering
mathjax: true
---

## Cheat Sheet

1. 多头套保：担心价格上涨，锁定未来买入价格
2. 空头套保：担心价格下跌，锁定未来卖出价格

按远期市场上持有头寸划分。

完美套保：完全消除价格风险套保

不完美原因：存在**基差风险**和数量风险

基差风险：$$b=H-G$$，现货减去期货

期货多头：$$(H_0-H_1)+(G_1-G_0)=b_0-b_1$$

如果期货标的与现货标的为同种资产$$(H_1=S_1)$$，则$$H_1=S_1=G_1, b_1=0$$

这就是完美套保

套保策略

1. 选择远期合约种类
2. 选择合约到期日
3. 选择远期头寸方向
4. 确定远期合约交易数量

最优套保比的确定

套期保值比率$$\eta$$ = 套期保值头寸数量/被套保资产头寸数量

最小方差套保比：$$\Delta \pi = \eta \Delta G-\Delta H\Rightarrow =\rho_{HG} \frac{\sigma H}{\sigma G}=b$$

所以 $$N=b\frac{QH}{QG}=b'\frac{V_H}{V_G}$$，必须取整。
