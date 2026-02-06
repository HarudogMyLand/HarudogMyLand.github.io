---
permalink: /markdown/
title: "Markdown"
author_profile: true
redirect_from: 
  - /md/
  - /markdown.html
---

This page is used as a reminder of the web config and file prompt.

## Web Config 

### Your Directory and Page

- Config: `_config.yml`
- Top Navigation: `_data/navigation.yml`
- Specail Pages: `_pages/`
- Common Pages: （` .md`  or ` .html`):
  - `_publications/`
  - `_portfolio/`
  - `_posts/`
  - `_teaching/`
  - `_talks/`
- Footer：`_includes/footer.html`
- Static file(PDF)：`/files/`
- Personal Picture( `_config.yml`): `images/profile.png`

## Web Building

- File should ends with `.md`extension name to use markdown, `.html` to use HTML
- In the  [Commit  List](https://github.com/academicpages/academicpages.github.io/commits/master)  of your repo, you may check the serve status:
  - ✅ Success | 🟠 Building | ❌ Errors | "Non-fig" Not Created
- Jekyll Kramdown supported（similar to GitHub Flavored Markdown）
-  [Jemoji](https://github.com/jekyll/jemoji) support emoji: :smile:as is listed in  [this passage](https://www.fabriziomusacchio.com/blog/2021-08-16-emojis_for_Jekyll/)。
- Script supported（like Google Analytics），as is showed in [Project Wiki](https://github.com/academicpages/academicpages.github.io/wiki/Adding-Google-Analytics)。
- Markdown and JSON cv supported, JSON format requires settings in  `_data/navigation.yml`

## Markdown Doc

The page use kramdown, where grammar shows a little differences, as is showed in  [kramdown doc](https://kramdown.gettalong.org/syntax.html)。

## MathJax Support

MathJax 3.0, where `$$...$$` and `\\[...\\]` are allowed to wrap formula, `\\(...\\)` to wrap inline formula(eg.  \\(a^2 + b^2 = c^2\\). 

Attention: Markdown Escape Character may infect MathJax, read [this method](https://math.codidact.com/posts/278763/278772#answer-278772) to rearrange.

### Format Example

- Heading: from `### H3` to `###### H6`
- Refference: `> Refference`
- List: Ordered/Inordered nested list
- Table: As is showed in the original passage
- Footnotes：`[^1]`  and  `[^1]: Note`
- Notice blanket：`{: .notice}`
- Button：Adding `.btn` class, enabling links

### Supported HTML labels

`<address>`, `<a>`, `<abbr>`, `<cite>`, `<code>`, `<details>`, `<em>`, `<ins>`, `<kbd>`, `<pre>`, `<q>`, `<strike>`, `<strong>`, `<sub>`, `<sup>`, `<var>` 

## Related Resources

- [Liquid Grammer](https://shopify.github.io/liquid/tags/control-flow/)
- [MathJax Doc](https://docs.mathjax.org/en/latest/)
- [HTML, MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML)

Original passage: [Markdown - Your Name / Site Title](https://academicpages.github.io/markdown/)

