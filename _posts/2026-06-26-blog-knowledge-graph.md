---
title: 'Building an Obsidian-like Knowledge Graph for My Blog'
date: 2026-06-26
excerpt: "How the blog knowledge graph is generated, rendered, searched, zoomed, and connected to columns and tags."
tags:
  - Blog
  - Jekyll
  - JavaScript
  - Visualization
columns:
  - writing-lab
---

这次博客首页加入了一个 Obsidian-like 的 Knowledge Graph，用节点图展示文章之间的关系。

我希望它不是一个纯装饰模块，而是真的能表达博客结构：哪些文章属于同一个专栏，哪些文章共享标签，哪些主题之间有联系。

## 设计目标

这个图谱有几个目标：

- 节点代表博客文章。
- 相同专栏的文章更靠近。
- 不同专栏之间保持距离。
- 共享 tag 或 column 的文章之间连线。
- 节点可以拖动，但不会跑出画布边界。
- 图谱可以缩放，也可以用鼠标中键拖动画布视角。
- 搜索可以快速定位文章。

我没有使用 NLP 自动分类。原因是博客专栏不是模型猜出来的主题，而是我主动整理出来的阅读路径。也就是说，`columns` 是编辑判断，`tags` 是检索辅助。

## 数据来源

图谱数据来自 Jekyll 构建时已有的信息。

每篇文章的 front matter 里可以写：

```yaml
tags:
  - Blog
  - Jekyll
columns:
  - writing-lab
```

专栏定义放在：

```text
_data/blog_columns.yml
```

例如：

```yaml
- key: writing-lab
  title: Writing Lab
  description: Blogging workflow, Markdown, site maintenance, and publishing experiments.
  icon: fas fa-pen-nib
```

博客首页用 Liquid 遍历 `site.posts`，生成一段 JSON。节点大致包含：

```json
{
  "id": "/posts/2026/06/example/",
  "title": "Example Post",
  "url": "/posts/2026/06/example/",
  "date": "2026-06-26",
  "cluster": "writing-lab",
  "clusterLabel": "Writing Lab",
  "tags": ["Blog", "Jekyll"],
  "columns": ["writing-lab"]
}
```

边则由文章之间的共同关系生成：

- 如果两篇文章共享 column，生成强连接。
- 如果两篇文章共享 tag，生成弱连接。

## 聚类策略

聚类优先级是：

1. 使用文章 `columns` 的第一项。
2. 如果没有 `columns`，使用第一个 tag。
3. 如果都没有，放入 `Uncategorized`。

这样做的好处是稳定。专栏可以手动维护，tag 可以保持灵活，图谱不会因为自动分类结果变化而频繁漂移。

## 渲染方式

图谱没有引入 D3，而是使用原生 SVG 和少量 JavaScript。

主要元素：

- `line`：文章之间的关系边。
- `circle`：文章节点。
- `text`：文章标题 label。
- `g`：节点和图谱 viewport 的分组容器。

节点颜色来自 CSS 变量：

```scss
--graph-color-1: #58a6ff;
--graph-color-2: #f778ba;
--graph-color-3: #7ee787;
```

不同博客主题会覆盖这些变量，所以 Source、Gov、Archive 三套主题下，图谱颜色也会一起变化。

## 力导向布局

图谱使用一个简化版 force simulation。

每一帧主要做几件事：

1. 根据连线长度施加弹簧力。
2. 根据节点距离施加排斥力。
3. 同聚类节点受到轻微聚类中心吸引。
4. 不同聚类节点使用更强排斥力。
5. 节点位置被限制在 SVG 画布边界内。

节点之间不会完全自由乱跑，但也不会死死固定。拖动节点后，会记录一个 soft anchor：

```js
node.userX = node.x;
node.userY = node.y;
node.userPlaced = true;
```

之后节点仍然参与力导向计算，但会倾向于留在用户拖动后的位置附近。这样既保留图谱的动态性，也避免节点被立刻拉回原来的聚类中心。

## 拖动与缩放

节点拖动使用 Pointer Events：

```js
group.addEventListener('pointerdown', ...)
group.addEventListener('pointermove', ...)
group.addEventListener('pointerup', ...)
```

滚轮缩放作用在整个 SVG viewport 上。缩放状态由三个值维护：

```js
var zoom = {
  scale: 1,
  x: 0,
  y: 0
};
```

滚轮缩放时，会以鼠标所在位置为中心计算新的 transform。

当节点因为缩放或拖动看起来跑到视野外时，可以按住鼠标中键拖动画布。中键拖动只改变 `zoom.x` 和 `zoom.y`，相当于移动相机，而不是移动节点本身。

## 搜索功能

图谱有两个搜索入口：

- 顶部 Blog 标题区的搜索框。
- Knowledge Graph 工具栏内部的搜索框。

两个输入框同步。搜索范围包括：

- 文章标题。
- 日期。
- tag。
- column。
- 聚类名称。

搜索时，匹配节点高亮，不匹配节点和边淡化。这个功能比纯视觉浏览更实用，因为文章数量变多后，直接在图里找节点会变慢。

## 右侧 Inspector

鼠标悬浮到节点时，图谱右侧会显示该节点所属聚类：

```text
Cluster
Writing Lab
```

这个信息不放在节点旁边，是为了避免节点区域文字太拥挤。节点本身显示标题，右侧 inspector 显示聚类，分工更清楚。

## 为什么不用现成图库

D3、Cytoscape、vis-network 都可以做这件事。但这个博客是静态站点，我更想保持依赖简单。

当前实现只需要：

- Jekyll
- Liquid
- YAML
- SVG
- 原生 JavaScript
- SCSS

这让图谱和博客系统本身贴得更近，也方便以后按自己的需求微调。

## 后续想法

这个图谱后面还可以继续扩展：

- 从文章正文里的站内链接生成更高权重的边。
- 增加按 column 或 tag 单独过滤。
- 文章多起来后自动隐藏部分 label。
- 保存用户拖动后的节点位置。
- 给专栏节点增加汇总统计。

目前这个版本已经完成了最核心的目标：让博客不再只是一条时间线，而是变成一张可以探索的知识地图。
