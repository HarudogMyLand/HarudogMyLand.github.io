(function() {
  var storageKey = 'blogTheme';
  var labels = {
    tutorial: 'Tutorial',
    source: 'Source',
    gov: 'Gov',
    marx: 'Archive',
    bare: 'Bare'
  };

  function isBlogPage() {
    return document.body.hasAttribute('data-blog-theme');
  }

  function setTheme(theme) {
    var defaultTheme = document.body.classList.contains('blog-post') ? 'tutorial' : 'source';
    var selectedTheme = labels[theme] ? theme : defaultTheme;
    var colorTheme = window.localStorage.getItem('theme');
    var themeToggle = document.getElementById('theme-toggle');

    document.body.setAttribute('data-blog-theme', selectedTheme);
    window.localStorage.setItem(storageKey, selectedTheme);

    if (selectedTheme === 'bare') {
      document.documentElement.removeAttribute('data-theme');
      document.documentElement.classList.remove('dark-mode');
      if (themeToggle) {
        themeToggle.hidden = true;
      }
    } else {
      if (colorTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
      } else {
        document.documentElement.removeAttribute('data-theme');
      }
      if (themeToggle) {
        themeToggle.hidden = false;
      }
    }

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
        var picker = choice.closest('details');
        if (picker) {
          picker.open = false;
        }
      });
    });
  });
})();
