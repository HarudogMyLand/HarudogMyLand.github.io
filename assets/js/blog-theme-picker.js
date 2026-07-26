(function() {
  var storageKey = 'blogTheme';
  var labels = {
    tutorial: 'Tutorial',
    bare: 'BARE'
  };

  function isBlogPage() {
    return document.body.classList.contains('blog-post') || document.body.classList.contains('blog-archive');
  }

  function setTheme(theme) {
    var selectedTheme = labels[theme] ? theme : 'tutorial';
    document.body.setAttribute('data-blog-theme', selectedTheme);
    window.localStorage.setItem(storageKey, selectedTheme);

    Array.prototype.forEach.call(document.querySelectorAll('[data-blog-theme-choice]'), function(choice) {
      choice.value = selectedTheme;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-blog-theme-label]'), function(label) {
      label.textContent = labels[selectedTheme];
    });

    document.dispatchEvent(new CustomEvent('blogthemechange', {
      detail: { theme: selectedTheme }
    }));
  }

  document.addEventListener('DOMContentLoaded', function() {
    if (!isBlogPage()) {
      return;
    }

    setTheme(window.localStorage.getItem(storageKey) || 'tutorial');
    Array.prototype.forEach.call(document.querySelectorAll('[data-blog-theme-choice]'), function(choice) {
      choice.addEventListener('change', function() {
        setTheme(choice.value);
      });
    });
  });
})();
