---
title: "CO课程做什么"
date: 2026-07-31
excerpt: "北京航空航天大学的计算机系本科课程在许多学子眼中富有盛名，喜爱者赞不绝口，厌恶者亦恨不得将其中糟粕之处挫骨扬灰。而计算机系本科基础教育的三大课程之一，便是计算机组成原理，该课程是延续了数十年的老牌计算机体系结构课程，相信各位早有耳闻；比……"
tags:
  - CO
  - BUAA
columns:
  - computer-organization
---

## 前言

北京航空航天大学的计算机系本科课程在许多学子眼中富有盛名，喜爱者赞不绝口，厌恶者亦恨不得将其中糟粕之处挫骨扬灰。而计算机系本科基础教育的三大课程之一，便是计算机组成原理，该课程是延续了数十年的老牌计算机体系结构课程，相信各位早有耳闻；比起面向对象（OO）课程在LLM冲击下的危机局势，与操作系统（OS）更具迷惑性的课程路线，CO依然一以贯之，作为计算机基本知识的地位难以撼动。然而，北航对上机实验近乎病态的迷恋使得许多并不以体系结构为职业目标的学子苦不堪言，同时，单纯阅读 cscore 的指导网页**绝对不足**以充实同学们对计算机组成的知识学习。提供一些计算机组成的辅助资料自然是在所不辞之责任。

然而，笔者能力有限，而往届学长学姐们已将自己的心血贡献在自己的个人博客上，笔者若再次详细描述则是费力且愚钝的行为，又考虑到资料繁多，同学们亲力查找将耗费宝贵的时间。故将各位学长学姐的博客资料尽可能罗列在此，而对于学术性内容，只做出最基本的经验化分享。

历年来，许多学长学姐将自己的代码与学习资料存放在个人博客与 Github 上，包括但不限于：

- [一本书教你通关计组实验](https://kamonto.github.io/Kamonto_blog/2025/09/07/一本书教你通关计组实验（上）/#1.1)：2023级学生，2024级高级优秀助教 SuperKamonto 的全流程CO实况，内容之详尽无与伦比；
- [Lazyfish & chilly_river - The Hyacinth Story](https://lazyfish-lc.github.io/)：LazyFish 的笔记，提供非常优秀的上机回忆与课下实现记录，考前极其值得一看；
- [FlyingFlame's Blog - 记录技术、学习与生活](https://flyinglandlord.github.io/blog/)：FlyingLandlord...或者FlyingFlame的笔记，常看常新；
- [zhp的博客](https://pppphop.github.io/)：2024级学生 zhp 的博客，内容很多，可以当指导书来看，膜拜 zhp 对成绩有帮助，但学习笔记帮助更大；
- [Istina's Blog](https://istinaa.github.io/)：2024级学生 zja 的博客，哈哈哈；
- [北航计算机组成 | ROIFE BLOG](https://roife.github.io/series/buaa-co/)：Roife 的牢笔记，提供上机记录；

优秀教材与阅读资料推荐：

- Digital Design and Computer Architecture, H & H
- 软硬件接口

## 大纲

> 计算机组成课程结合主流计算机系统结构讲授计算机硬件系统组成、各部件结构、工作过程、工作原理，并以开发CPU为挑战性学习成果培养学生掌握基于模型的CPU开发方法，进而具备分析、设计和开发计算机硬件系统的基本能力。围绕CPU重构了计算机组成、数字逻辑、汇编语言3部分核心知识，剔除了部分重复、关联度低的知识，强化了RISC、流水线等现代CPU内容，并建设线上教学资源。

计算机组成原理课程的目的就是前往计算机科学研究（一般地）被认为最底层的抽象部分。你在集成环境中进行编程，程序转化为字节码或二进制码，由CPU逐条指令执行。

在这个过程中，我们称可执行二进制码其中可执行的部分就是跑在处理器中的指令，指令是计算机软硬件的接口，向软件提供了硬件功能的抽象，向硬件提供了功能实现的规范。<- 软件层面

指令取决于CPU的指令集，即使是对于相同的指令集，不同的计算机处理器所实现的组织和结构也是不同的，各种算法的实现，cache的组织形式等等，在不同的计算机中都是不同的。<- 指令集层面

硬件上计算机组织结构是由复杂的底层电路实现的，可分为组合逻辑和时序逻辑电路；组合逻辑和时序逻辑可以拆解为更小的单元，即门电路。<- 数字电路层面

门电路是由 NMOS 和 PMOS 晶体管互补构成的 CMOS 晶体管构成的。<- 模拟电路层面，涉及不深入

<img src="https://pic3.zhimg.com/v2-b4f4bb6832ad6d9c9d8754a47acc22e8_r.jpg" alt="img" style="zoom:50%;" />

你需要学习：

1. 底层硬件逻辑：理解硬件怎么工作，学习一门称作 Verilog 的硬件描述语言，学习配套的以状态机为核心的数学模型；
2. 软硬件接口：通过设计一个单周期流水线CPU与一个五步流水线CPU，理解硬件层面的计算机怎么工作
3. 底层软件逻辑：理解汇编语言，学习 Mips 指令集架构

课程设计了难度递进的“闯关式”实验体系，从简单的单周期CPU开始，逐步进阶到多周期，最终目标是设计出能支持50条指令的流水线CPU。

| 阶段   | 内容                     |
| ------ | ------------------------ |
| Co Pre | [学习预备知识](### Co Pre) |
| P0 | [Logisim工具链](### P0) |
| P1 | [ISE工具链](### P1) |
| P2 | [Mars](### P2) |
| P3 | [单周期流水线实现-I](### P3) |
| P4 | [单周期流水线实现-II](### P4) |
| P5 | [多周期流水线实现-I](### P5) |
| P6 | [多周期流水线实现-II](### P6) |
| P7 | [响应异常的CPU拓展](### P7) |

---

### Co Pre

[我出生了](https://mzh.moegirl.tw/我出生了)，Co Pre的目的在于学习工具链。CO课程使用的工具是（希望以后都是使用这个）：

- Xilinx ISE：Verilog HDL的集成环境IDE；
- Mars：Mips编程的模拟器；
- Logisim：一款图形化的数字逻辑电路设计与仿真工具；

如果暑假有时间，可以阅读 H & H 著 Digital Design and Computer Architecture，该教材的组织排版与世界许多主流教学大纲相近，苏黎世大学亦配备极佳的同名视频课程 DDCA。学习其至单周期流水线前的知识完全足以完成Co Pre。Co Pre不占分数，有学长称完全不做 Co Pre，乃至 P0-P2 挂掉对分数无所谓，我们不予考证。

推荐使用以下网站学习与练习 Verilog：

- [USTC VLab Verilog OJ | YAVG Group Presents](https://verilogoj.ustc.edu.cn/oj/)：中科大的开放OJ，但是有点怪怪的；
- [HDLBits](https://hdlbits.01xz.net/wiki/Main_Page)：个人认为没有比HDLBits更经典的 Verilog 练习网站了；

关于 Co Pre 详情见[Co Pre](copre.md)。

### P0

关于 Logisim，考察数字电路知识，Logisim的使用。该部分内容和 Co Pre 内容放在一起。

### P1

关于 Verilog，考察数字电路知识，ISE使用。该部分内容和 Co Pre 内容放在一起。

### P2

考察学生对于 Mips 编程的掌握程度，在上世纪五十年代，编写机器码被认为是优雅的，冯诺依曼最初（似乎）甚至反对开发 Speed Coding。人人皆是人肉编译器。

该部分内容和 Co Pre 内容放在一起。

内容不难，一般是使用 Mips 编写几道简单编程题，复杂的题目也会给参考的C源代码。P2之后很难再见到 Mips 编程，下次见到是期末考试，再下次见是操作系统课。

我在这一阶段的帖子，见：

- [关于一些想法与奇技淫巧](mips_p2_reflection.md)

### P3

开始接触单周期CPU，使用图形化的 Logisim。

### P4

开始接触单周期CPU，使用硬件描述语言 Verilog。

### P5

多周期CPU第一关，此后都是使用硬件描述语言 Verilog。

### P6

多周期CPU第二关，增加数条指令。

### P7

支持中断异常的CPU。

### 关于理论

很多同学在北航学习感受之一就是“理论与实践相分离”，实验上机与理论课完全像是两门课，也只有到了期末同学们复习计算机组成的理论知识的时候才会明白：“哦，此处的原理是如此！”云云。这是一件令人无比遗憾的事情。

在此希望新生们能够对计算机组成的理论知识保持重视，不要因为平时没有考察就放弃了了解。重难点可以等到期末再突破，但堆积必不能带来好结果。

- [北航co计算机组成理论复习 | anAilurus' Blog](https://anailurus.github.io/2026/02/13/co理论复习/)
- [计算机考研杂货铺](https://csgraduates.com/)
- [王道计算机组成原理bilibili](https://www.bilibili.com/video/BV1ps4y1d73V/)

## 关于自动化测试

近年来由于 AI Agent 的飞速发展，传统摸索的自动化测试思路似乎略显笨拙，不过依然具有参考作用。往届学长学姐的自动化测试的博客链接与一些仓库链接在此：

- [「BUAA CO」计组小白的自动化测试 | Squirrel7ang's Blog](https://squirrel7ang.github.io/2024/01/09/CO/AutoTest/)
- [Mistariano/BUAA-CO-Killer: 为北航计算机组成原理设计的CPU测试程序自动生成器](https://github.com/Mistariano/BUAA-CO-Killer)
- [单周期CPU全自动测试思路（Verilog） | ForeverYolo的博客](https://foreveryolo.top/posts/34987/index.html)
- [BUAA CO Toolkit - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=stone926.buaa-co-toolkit)
