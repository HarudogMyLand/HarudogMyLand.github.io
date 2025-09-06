---
permalink: /markdown/
title: "Markdown"
author_profile: true
redirect_from: 
  - /md/
  - /markdown.html
---

## 网页配置

### 核心文件/目录位置

- 基本配置：`_config.yml`
- 顶部导航栏配置：`_data/navigation.yml`
- 独立页面：`_pages/`
- 集合内容（支持 .md 或 .html）：
  - `_publications/`
  - `_portfolio/`
  - `_posts/`
  - `_teaching/`
  - `_talks/`
- 页脚：`_includes/footer.html`
- 静态文件（如 PDF）：`/files/`
- 个人头像（可在 `_config.yml` 中设置）：`images/profile.png`

## 网页显示渲染使用提示

- 使用 `.md` 扩展名以 Markdown 渲染，`.html` 则以 HTML 渲染。
- 在仓库的 [Commit 列表](https://github.com/academicpages/academicpages.github.io/commits/master) 可查看 GitHub 最近构建状态：
  - ✅ 成功 | 🟠 构建中 | ❌ 错误 | 无图标：未构建
- 支持 Jekyll Kramdown（类似 GitHub Flavored Markdown），可通过 [Jemoji](https://github.com/jekyll/jemoji) 使用部分表情符号:smile:。完整支持列表见 [此文章](https://www.fabriziomusacchio.com/blog/2021-08-16-emojis_for_Jekyll/)。
- 支持客户端脚本（如 Google Analytics），配置方法见 [项目 Wiki](https://github.com/academicpages/academicpages.github.io/wiki/Adding-Google-Analytics)。
- 简历支持 Markdown 或 JSON 格式，样式略有不同。使用 JSON 格式需在 `_data/navigation.yml` 中设置并默认隐藏。

## Markdown 使用指南

采用 kramdown 解析，语法与其他实现（如 GitHub）略有不同，完整规范见 [kramdown 文档](https://kramdown.gettalong.org/syntax.html)。

## MathJax 支持

默认支持 MathJax 3.0，可用 `$$...$$` 和 `\\[...\\]` 包裹显示公式，`\\(...\\)` 包裹行内公式（如 \\(a^2 + b^2 = c^2\\)）。注意 Markdown 转义字符可能影响公式渲染，可参考[此方法](https://math.codidact.com/posts/278763/278772#answer-278772)调整。

### 基础格式示例：

- 标题：`### H3` 至 `###### H6`
- 引用：`> 引用文本`
- 列表：支持有序/无序嵌套列表
- 表格：支持对齐与合并格式（见原文示例）
- 脚注：`[^1]` 与 `[^1]: 说明`
- 提示框：`{: .notice}`
- 按钮：添加 `.btn` class 增强链接样式

### 支持的 HTML 标签：

`<address>`、`<a>`、`<abbr>`、`<cite>`、`<code>`、`<details>`（可折叠区块）、`<em>`、`<ins>`、`<kbd>`、`<pre>`、`<q>`、`<strike>`、`<strong>`、`<sub>`、`<sup>`、`<var>` 等。

## 扩展资源

- [Liquid 语法](https://shopify.github.io/liquid/tags/control-flow/)
- [MathJax 文档](https://docs.mathjax.org/en/latest/)
- [HTML（超文本标记语言） | MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

详见原文：[Markdown - Your Name / Site Title](https://academicpages.github.io/markdown/)

