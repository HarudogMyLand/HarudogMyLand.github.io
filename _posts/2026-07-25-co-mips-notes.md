---
title: "关于 MIPS 的一些闲话"
date: 2026-07-25
excerpt: "P2 MIPS 汇编课下参考资料与考察重点：内存访问、地址跳转等。"
tags:
  - CO
  - BUAA
  - MIPS
columns:
  - computer-organization
---

## 课下

### 关于MIPS

我个人非常喜欢的参考资料：

- [新加坡国立大学的手册](https://www.comp.nus.edu.sg/~cs2100/lect/MIPS_Reference_Data_page1.pdf)
- [MIPS Quick Tutorial](https://minnie.tuhs.org/CompArch/Resources/mips_quick_tutorial.html)

---

### MIPS程序考察重点

P2主要考察的内容分别是

1. 内存访问与数据
4. 地址跳转

是的，程序说到底就是做好一件事：组织好内存中的数据运算。也就是通过良好的循环结构与运算处理数据。

因此我们需要灵活正确访问数组，分支循环。

而堆栈栈帧的问题，说到底还是内存的处理，每次Caller调用Callee的时候记得保存保留寄存器即可(之后按顺序弹出)。

---

#### 要点1：关于MIPS的数组

语法回顾

```mips
.data
    array1: .word 1, 2, 3, 4    # word声明数组中的值，每个占用一个字
    array2: .space 120          # space向内存堆申请120字节的内存
    str: .asciiz "I love Mips"  # asciiz负责存储一个以"\0"结尾的字符串

# 感谢助教提醒
# 按字节存储的字符串最好放到最后，防止打乱字对齐

.eqv i $t0

.text
    # 回顾一些访问数组的方法
    li i, 0
    lw $t1, 0(array1)
    
    la $t2, array2
    lw $t3, 0($t2)

    lw $t4, array2($0)

```

使用数组的语法不难，难的是在一长串莫名其妙的MIPS代码中看出程序意图。

>今天我的代码只有上帝和我看得懂，明天，就只有上帝看得懂了。

胡乱写MIPS代码的话，很可能还没写完你和上帝就都看不懂了，总结综合助教建议和同学经验：

1. 最好多写注释
2. 最好先写伪代码或高级代码实现
3. 最好统一寄存器使用，尤其是`s`与`t`
4. 必须整型字对齐与字符串字节对齐
5. 如果上帝和你真看不懂了，善用图示

---

#### 要点2：关于MIPS循环的一个发现

助教和学长们的往年精华帖子中提及使用宏来快速编写`for`循环，然而**如何实现循环中不同的结束语句判断呢**？例如想要一个`for(...<=...)`又想要一个`for(...>=...)`，怎么办呢？

可以直接写到宏里面，告诉汇编器你想干什么

```mips
.macro for_begin(%cntReg, %conReg, %sLabel, %eLabel, %cmp)

%sLabel:
%cmp, %cntReg, %conReg, %eLabel

.end_macro

# 一个使用示例：
    for_begin($t0, $s0, L_START, L_END, bgt)
    for_end($t0, L_START, L_END)
```

实测可行，宏会被全部替换！

---

#### 悄悄：Visual Studio Code中编写MIPS

如何在Visual Studio Code中编写MIPS？似乎不太方便，而且没什么好处

MARS不同于ISE Xilinx，不提供关联到外部编辑器的能力。阅读MARS手册中IDE->Editor部分，有这样一段话：

> Editor: MARS includes two integrated text editors. The default editor, ......If you use an external editor, MARS provides a convenience setting that will automatically assemble a file as soon as it is opened. See the Settings menu.

`.asm`文件可以被外部编辑器打开，您只需要手动用外部编辑器（例如）VScode打开当前文件夹编写汇编文件。

笔者没有找到能够直接在VScode中运行MIPS代码的插件，可以设置MARS `settings` 中的 `assemble file upon opening` 为 `true` 。这样每次打开文件就会自动汇编；亦可以使用命令行在VScode中运行MARS(这个过程大概可以用一个`shell`脚本简化？)：

```shell
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        2025/10/22     16:40                conv
d-----        2025/10/22     16:38                full
d-----        2025/10/22     16:37                judge
d-----        2025/10/22     16:40                matrix

PS C:[pwd]> cd conv
PS C:[pwd]> java -jar "YOUR_MARS_PATH\Mars4_5.jar" conv.asm
MARS 4.5  Copyright 2003-2014 Pete Sanderson and Kenneth Vollmar
```

此种方法并无什么便携之处，在更合适的替代之前只能是脱裤子放屁。
