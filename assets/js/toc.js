document.addEventListener('DOMContentLoaded', () => {
  const tocList = document.getElementById('toc-list');
  const headings = document.querySelectorAll('.main-content h1, .main-content h2, .main-content h3');

  if (!tocList || headings.length === 0) return;

  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = heading.textContent;
    a.href = `#${heading.id}`;
    li.style.paddingLeft = `${(parseInt(heading.tagName.charAt(1)) - 1) * 15}px`;
    li.appendChild(a);
    tocList.appendChild(li);
  });
});