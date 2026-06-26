---
title: 'How I Added Columns To My Blog'
date: 2026-06-26
excerpt: "A short note on the new blog column system, its implementation, and how to use it."
tags:
  - Blog
  - Jekyll
  - Frontend
columns:
  - writing-lab
---

博客首页改版，我给 `Blog` 页面加了一个新的 **Columns** 模块。设计参考了CSDN或者知乎的专栏设置。tag 是文章的关键词，而专栏更是一系列文章集合。

## 改了啥

博客首页现在有四块主要内容：

1. 顶部标题区域。
2. 热力图，可以切换 Year、Month、Day。
3. Guide 入口，沿用原来 Guide 页面的四个方向。
4. Posts 与 Columns。

这样设计以后，文章可以被多个系统同时组织：它既可以被 tag 搜到，也可以被专栏收录。

## 技术栈

没有引入新的大型框架，主要使用了 Jekyll 站点原本就有的技术：

- **Jekyll**：负责静态站点生成。
- **YAML Front Matter**：给文章声明 `tags` 和 `columns`。
- **Jekyll Data Files**：用 `_data/blog_columns.yml` 维护专栏列表。
- **Liquid**：在博客首页读取专栏配置，并筛选属于某个专栏的文章。
- **SCSS**：实现博客首页、主题切换、暗色适配和专栏卡片样式。
- **Vanilla JavaScript**：处理 tag 筛选、热力图视图切换、博客排版主题切换。

这里最关键的是 Jekyll Data Files 和 Liquid。

专栏本身写在：

```text
_data/blog_columns.yml
```

博客首页会通过：

```liquid
site.data.blog_columns
```

读取所有专栏配置。

然后用 Liquid 的 `where_exp` 找到显式加入该专栏的文章：

```liquid
{% assign column_posts = site.posts | where_exp: "post", "post.columns contains column.key" %}
```

遍历所有文章，只保留 `post.columns` 里包含当前专栏 `key` 的文章。

## How To Add A Column

如果要新增一个专栏，比如 `Computer Organization`，只需要编辑：

```text
_data/blog_columns.yml
```

然后加入：

```yml
- key: computer-organization
  title: Computer Organization
  description: Architecture, memory, OS, and low-level CS notes.
  icon: fas fa-microchip
```

字段含义：

- `key`：专栏的稳定 ID，文章会用它来引用专栏。
- `title`：页面上显示的专栏标题。
- `description`：专栏暂无文章时显示的说明。
- `icon`：Font Awesome 图标 class。

`key` 最好只用小写英文、数字和短横线。它一旦被文章引用，就不应该轻易改名。

## How To Add A Post To A Column

打开任意一篇 `_posts` 下的 Markdown 文件，在 front matter 里添加：

```yml
columns:
  - computer-organization
```

完整例子：

```yml
---
title: 'Death of C Disk'
date: 2026-03-10
excerpt: "Docker炸了我的C盘"
tags:
  - 博客
  - Docker
columns:
  - systems-tools
  - computer-organization
---
```

一篇文章可以加入多个专栏。这样它会同时出现在多个专栏入口下。

## Why This Matters

博客一开始只有几篇文章时，tag 足够用了。但文章数量变多以后，tag 会越来越像一堆松散的关键词。专栏的作用，是把这些文章重新组织成可以阅读的路线。

希望未来的博客不是一串时间倒序的碎片，而是一组持续生长的笔记。

这次的 Columns 模块，就是朝这个方向迈出的一小步。
