// Small keyboard/ARIA helpers for the masthead.
(function() {
  // Escape closes any open <details> menu (language picker, blog style picker)
  // and returns focus to its summary.
  document.addEventListener('keydown', function(event) {
    if (event.key !== 'Escape') return;
    Array.prototype.forEach.call(document.querySelectorAll('details[open]'), function(details) {
      if (!details.matches('.language-picker, .blog-theme-picker')) return;
      details.open = false;
      var summary = details.querySelector('summary');
      if (summary && details.contains(document.activeElement)) summary.focus();
    });
  });

  // Clicking outside an open menu closes it.
  document.addEventListener('click', function(event) {
    Array.prototype.forEach.call(document.querySelectorAll('.language-picker[open], .blog-theme-picker[open]'), function(details) {
      if (!details.contains(event.target)) details.open = false;
    });
  });

  // The theme toggle is a link styled as a button (the greedy-nav plugin claims
  // every <button> in the masthead), so stop it navigating and let Space work.
  document.addEventListener('click', function(event) {
    if (event.target.closest && event.target.closest('.theme-toggle')) event.preventDefault();
  });
  document.addEventListener('keydown', function(event) {
    if (event.key !== ' ' || !event.target.matches || !event.target.matches('.theme-toggle')) return;
    event.preventDefault();
    event.target.click();
  });

  // Keep aria-expanded on the overflow menu button in sync with its state.
  document.addEventListener('DOMContentLoaded', function() {
    var navButton = document.querySelector('#site-nav > button');
    if (!navButton || !window.MutationObserver) return;
    new MutationObserver(function() {
      navButton.setAttribute('aria-expanded', navButton.classList.contains('close') ? 'true' : 'false');
    }).observe(navButton, { attributes: true, attributeFilter: ['class'] });
  });
})();
