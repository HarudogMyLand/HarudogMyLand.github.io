# Blog Theme Notes

博客首页 `/year-archive/` 现在有两套彼此独立的主题机制：

- 全站明暗色：由顶部导航的月亮/太阳按钮控制，落在 `html[data-theme="dark"]`。
- 博客排版主题：由 Blog 标题区域的 `Theme` 按钮控制，落在 `body[data-blog-theme="..."]`。

`Theme` 按钮只切换博客首页的 CSS 主题和排版方式，不负责明暗色。用户选择会写入 `localStorage.blogTheme`，下次进入博客页会自动恢复。

## Current Themes

### `source`

参考“芋道源码”这类古早源码解析博客：

- 技术索引感更强，适合代码笔记和教程目录。
- 主交互色为蓝色，避免荧光绿。
- 页面背景偏灰，内容区偏白。
- Guide 和 Columns 更像条目入口，密度较高。

### `gov`

参考政府门户网站：

- 信息门户式排版，标题层级清楚。
- 蓝色为主色，红色只作为标题前置强调。
- 留白更正式，模块关系更稳。
- 适合公告、归档、长列表阅读。

### `marx`

参考马克思主义文库式资料站：

- 早期文献库/档案站的排版气质。
- 使用 Tahoma、Times New Roman、宋体一类字体组合。
- 海军蓝链接、浅青色内容块、红色 hover 强调。
- 更像资料目录和文献索引。

## Files

- `_pages/year-archive.html`
  - 博客首页结构。
  - 年/月/日热力图切换。
  - 标签筛选。
  - 独立专栏渲染。
  - 博客排版主题切换脚本。
- `_data/blog_columns.yml`
  - 专栏定义。
  - 专栏标题、描述、图标和稳定 key。
- `_sass/layout/_blog.scss`
  - 博客文章阅读页样式。
  - 博客首页共享样式。
  - `body.blog-archive[data-blog-theme="..."]` 主题覆盖。
- `_layouts/archive.html`
  - 给博客首页增加 `blog-home-shell`。
  - 在 `blog_home: true` 时隐藏默认 archive 标题。
- `_layouts/default.html`
  - 给博客相关页面增加 `blog-post` / `blog-archive` body class。
  - 给博客首页提供默认 `data-blog-theme="source"`。

## Add A New Blog Theme

1. 在 `_pages/year-archive.html` 的 `blogThemes` 数组中增加一个主题：

```js
{ key: 'new-theme', label: 'New Theme' }
```

2. 在 `_sass/layout/_blog.scss` 中增加对应的作用域：

```scss
body.blog-archive[data-blog-theme="new-theme"] {
  --blog-home-bg: #ffffff;
  --blog-module-bg: #ffffff;
  --blog-text-muted: #666666;
  --blog-rule: #dddddd;
  --blog-accent: #005bac;
  --blog-accent-soft: rgba(0, 91, 172, 0.1);
  --blog-theme-font: Arial, sans-serif;
  --blog-theme-heading-font: Arial, sans-serif;
}
```

3. 只在同一个选择器作用域下添加组件覆盖，例如：

```scss
body.blog-archive[data-blog-theme="new-theme"] .blog-home__section-head {
  background: linear-gradient(to bottom, transparent calc(100% - 1px), #dddddd 0);
}
```

## Design Rules

- 新主题优先通过 CSS 变量、字体、色块、标题组织和间距建立差异。
- 尽量不要新增模块外框、圆角卡片边框或额外 wrapper。
- 博客排版主题不要写到 `html[data-theme="dark"]`，明暗色仍然是全站级功能。
- 新增主题时保持 `body.blog-archive[data-blog-theme="..."]` 作用域，避免影响文章正文页和其他页面。

## Columns

专栏和标签是两套不同系统：

- `tags`：用于 Posts 区域的标签筛选。
- `columns`：用于 Columns 区域的专栏收录。

一篇文章可以有 `Docker` 标签，但不一定进入 Docker 专栏；同样，一篇文章可以进入 `computer-organization` 专栏，而不需要拥有同名 tag。

### Add A Column

1. 在 `_data/blog_columns.yml` 中添加专栏：

```yml
- key: computer-organization
  title: Computer Organization
  description: Architecture, memory, operating systems, and low-level CS notes.
  icon: fas fa-microchip
```

2. 在文章 front matter 中显式收录：

```yml
columns:
  - computer-organization
```

3. 博客首页会自动把该文章收入对应专栏。点击专栏会跳转到该专栏的第一篇文章。

专栏 key 应保持稳定，建议只使用小写字母、数字和短横线。
