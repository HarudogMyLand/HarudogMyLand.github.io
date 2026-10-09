(function() {
  // Page text comes from _data/blog_i18n.yml via #archive-hub-i18n.
  var text = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    weekdays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    countTitle: '{key}: {count} posts',
    start: 'Start',
    now: 'Now',
    allPosts: 'All posts',
    emptyRange: 'No posts in this range.',
    collapse: 'Collapse Calendar',
    expand: 'Expand Calendar'
  };

  document.addEventListener('DOMContentLoaded', function() {
    var textEl = document.getElementById('archive-hub-i18n');
    if (textEl) {
      try {
        Object.assign(text, JSON.parse(textEl.textContent));
      } catch (error) {}
    }

    var root = document.querySelector('[data-archive-hub]');
    var dataEl = document.getElementById('archive-post-data');
    if (!root || !dataEl) {
      return;
    }

    var posts = [];
    try {
      posts = JSON.parse(dataEl.textContent);
    } catch (error) {
      posts = [];
    }
    posts.sort(function(a, b) {
      return b.date.localeCompare(a.date);
    });

    var modeButtons = root.querySelectorAll('[data-archive-mode]');
    var panels = root.querySelectorAll('[data-archive-panel]');

    function activateMode(button, moveFocus) {
      var mode = button.getAttribute('data-archive-mode');
      root.setAttribute('data-current-mode', mode);
      modeButtons.forEach(function(peer) {
        var active = peer === button;
        peer.classList.toggle('is-active', active);
        peer.setAttribute('aria-selected', active ? 'true' : 'false');
        peer.setAttribute('tabindex', active ? '0' : '-1');
      });
      panels.forEach(function(panel) {
        var active = panel.getAttribute('data-archive-panel') === mode;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });
      if (moveFocus) {
        button.focus();
      }
    }

    modeButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        activateMode(button, false);
      });
      button.addEventListener('keydown', function(event) {
        var buttons = Array.prototype.slice.call(modeButtons);
        var currentIndex = buttons.indexOf(button);
        var nextIndex = currentIndex;
        if (event.key === 'ArrowRight') {
          nextIndex = (currentIndex + 1) % buttons.length;
        } else if (event.key === 'ArrowLeft') {
          nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
        } else if (event.key === 'Home') {
          nextIndex = 0;
        } else if (event.key === 'End') {
          nextIndex = buttons.length - 1;
        } else {
          return;
        }
        event.preventDefault();
        activateMode(buttons[nextIndex], true);
      });
    });

    var categoryCards = root.querySelectorAll('[data-archive-category]');
    var categoryPanels = root.querySelectorAll('[data-archive-category-panel]');
    var categoryPrev = root.querySelector('[data-category-prev]');
    var categoryNext = root.querySelector('[data-category-next]');
    var categorySearch = root.querySelector('[data-category-search]');
    var categoryTagToggle = root.querySelector('[data-category-tag-toggle]');
    var categoryTags = root.querySelector('[data-category-tags]');
    var categoryTagButtons = root.querySelectorAll('[data-category-tag]');
    var activeCategoryIndex = 0;
    var activeCategoryTag = 'all';

    function applyCategoryFilters() {
      var activePanel = root.querySelector('.archive-category-panel.is-active');
      if (!activePanel) {
        return;
      }
      var term = categorySearch ? categorySearch.value.trim().toLowerCase() : '';
      var items = activePanel.querySelectorAll('[data-category-post]');
      var emptyFilter = activePanel.querySelector('[data-category-filter-empty]');
      var visibleCount = 0;

      items.forEach(function(item) {
        var haystack = item.getAttribute('data-search') || '';
        var tags = (item.getAttribute('data-tags') || '').split('|');
        var matchesSearch = !term || haystack.indexOf(term) >= 0;
        var matchesTag = activeCategoryTag === 'all' || tags.indexOf(activeCategoryTag) >= 0;
        var visible = matchesSearch && matchesTag;
        item.hidden = !visible;
        if (visible) {
          visibleCount += 1;
        }
      });

      if (emptyFilter) {
        emptyFilter.hidden = visibleCount > 0 || items.length === 0;
      }
    }

    function activateCategory(index) {
      if (!categoryCards.length) {
        return;
      }
      activeCategoryIndex = Math.max(0, Math.min(categoryCards.length - 1, index));
      var activeCard = categoryCards[activeCategoryIndex];
      var key = activeCard.getAttribute('data-archive-category');

      categoryCards.forEach(function(peer, peerIndex) {
        var active = peer === activeCard;
        var offset = peerIndex - activeCategoryIndex;
        peer.classList.toggle('is-active', active);
        peer.classList.toggle('is-before', offset < 0);
        peer.classList.toggle('is-after', offset > 0);
        peer.style.setProperty('--card-offset', offset);
        peer.setAttribute('aria-expanded', active ? 'true' : 'false');
      });

      categoryPanels.forEach(function(panel) {
        var active = panel.getAttribute('data-archive-category-panel') === key;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
      });

      applyCategoryFilters();

      activeCard.scrollIntoView({
        behavior: window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'nearest',
        inline: 'center'
      });
    }

    categoryCards.forEach(function(card, index) {
      card.addEventListener('click', function() {
        activateCategory(index);
      });
    });

    if (categoryPrev) {
      categoryPrev.addEventListener('click', function() {
        activateCategory(activeCategoryIndex - 1);
      });
    }

    if (categoryNext) {
      categoryNext.addEventListener('click', function() {
        activateCategory(activeCategoryIndex + 1);
      });
    }

    activateCategory(0);

    if (categorySearch) {
      categorySearch.addEventListener('input', applyCategoryFilters);
    }

    if (categoryTagToggle && categoryTags) {
      categoryTagToggle.addEventListener('click', function() {
        var collapsed = categoryTags.classList.toggle('is-collapsed');
        categoryTagToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      });
    }

    categoryTagButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        activeCategoryTag = button.getAttribute('data-category-tag') || 'all';
        categoryTagButtons.forEach(function(peer) {
          peer.classList.toggle('is-active', peer === button);
        });
        applyCategoryFilters();
      });
    });

    var postsByDate = posts.reduce(function(map, post) {
      if (!map[post.date]) {
        map[post.date] = [];
      }
      map[post.date].push(post);
      return map;
    }, {});

    var years = posts.map(function(post) {
      return post.date.slice(0, 4);
    }).filter(function(year, index, list) {
      return list.indexOf(year) === index;
    }).sort().reverse();

    var yearSelect = root.querySelector('[data-archive-year]');
    var calendar = root.querySelector('[data-archive-calendar]');
    var calendarShell = root.querySelector('[data-calendar-shell]');
    var calendarToggle = root.querySelector('[data-calendar-toggle]');
    var rangeTitle = root.querySelector('[data-archive-range-title]');
    var startInput = root.querySelector('[data-archive-start]');
    var endInput = root.querySelector('[data-archive-end]');
    var rangeReset = root.querySelector('[data-archive-range-reset]');
    var timeline = root.querySelector('[data-archive-timeline]');

    function pad(value) {
      return value < 10 ? '0' + value : String(value);
    }

    function escapeHtml(value) {
      return String(value || '').replace(/[&<>"']/g, function(character) {
        return {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;'
        }[character];
      });
    }

    function renderTimeline() {
      if (!timeline || !rangeTitle) {
        return;
      }
      var startDate = startInput && startInput.value ? startInput.value : '';
      var endDate = endInput && endInput.value ? endInput.value : '';
      var filteredPosts = posts.filter(function(post) {
        if (startDate && post.date < startDate) {
          return false;
        }
        if (endDate && post.date > endDate) {
          return false;
        }
        return true;
      });

      if (startDate || endDate) {
        rangeTitle.textContent = (startDate || text.start) + ' - ' + (endDate || text.now);
      } else {
        rangeTitle.textContent = text.allPosts;
      }

      if (!filteredPosts.length) {
        timeline.innerHTML = '<div class="archive-timeline__empty">' + escapeHtml(text.emptyRange) + '</div>';
        return;
      }

      timeline.innerHTML = filteredPosts.map(function(post) {
        return '<article class="archive-timeline__item">' +
          '<time datetime="' + escapeHtml(post.date) + '">' + escapeHtml(post.date) + '</time>' +
          '<div class="archive-timeline__body">' +
          '<h3><a href="' + escapeHtml(post.url) + '">' + escapeHtml(post.title) + '</a></h3>' +
          '<p>' + escapeHtml(post.excerpt || '') + '</p>' +
          '<span>' + escapeHtml((post.tags || []).slice(0, 4).join(' / ')) + '</span>' +
          '</div>' +
          '</article>';
      }).join('');
    }

    function renderCalendar(year) {
      if (!calendar) {
        return;
      }
      var monthNames = text.months;
      calendar.innerHTML = monthNames.map(function(monthName, monthIndex) {
        var first = new Date(Number(year), monthIndex, 1);
        var daysInMonth = new Date(Number(year), monthIndex + 1, 0).getDate();
        var leading = first.getDay();
        var cells = [];
        for (var blank = 0; blank < leading; blank += 1) {
          cells.push('<span class="archive-calendar__day archive-calendar__day--blank"></span>');
        }
        for (var day = 1; day <= daysInMonth; day += 1) {
          var dateKey = year + '-' + pad(monthIndex + 1) + '-' + pad(day);
          var count = postsByDate[dateKey] ? postsByDate[dateKey].length : 0;
          var level = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : 3;
          cells.push('<button type="button" class="archive-calendar__day" data-date="' + dateKey + '" data-level="' + level + '" title="' + escapeHtml(text.countTitle.replace('{key}', dateKey).replace('{count}', count)) + '">' + day + '</button>');
        }
        return '<section class="archive-calendar__month">' +
          '<h3>' + escapeHtml(monthName) + '</h3>' +
          '<div class="archive-calendar__weekdays">' + text.weekdays.map(function(day) { return '<span>' + escapeHtml(day) + '</span>'; }).join('') + '</div>' +
          '<div class="archive-calendar__grid">' + cells.join('') + '</div>' +
          '</section>';
      }).join('');

      calendar.querySelectorAll('[data-date]').forEach(function(dayButton) {
        dayButton.addEventListener('click', function() {
          calendar.querySelectorAll('.archive-calendar__day.is-selected').forEach(function(selected) {
            selected.classList.remove('is-selected');
          });
          dayButton.classList.add('is-selected');
          if (startInput && endInput) {
            startInput.value = dayButton.getAttribute('data-date');
            endInput.value = dayButton.getAttribute('data-date');
          }
          renderTimeline();
        });
      });

      var firstDate = posts.filter(function(post) {
        return post.date.slice(0, 4) === year;
      }).map(function(post) {
        return post.date;
      }).sort().reverse()[0];
      if (firstDate) {
        var firstButton = calendar.querySelector('[data-date="' + firstDate + '"]');
        if (firstButton) {
          firstButton.classList.add('is-selected');
        }
      }
    }

    if (yearSelect && calendar) {
      if (!years.length) {
        years = [String(new Date().getFullYear())];
      }
      yearSelect.innerHTML = years.map(function(year) {
        return '<option value="' + year + '">' + year + '</option>';
      }).join('');
      yearSelect.addEventListener('change', function() {
        renderCalendar(yearSelect.value);
      });
      renderCalendar(yearSelect.value);
    }

    if (posts.length && startInput && endInput) {
      var minDate = posts[posts.length - 1].date;
      var maxDate = posts[0].date;
      startInput.min = minDate;
      startInput.max = maxDate;
      endInput.min = minDate;
      endInput.max = maxDate;
      startInput.value = minDate;
      endInput.value = maxDate;
      startInput.addEventListener('change', renderTimeline);
      endInput.addEventListener('change', renderTimeline);
    }

    if (rangeReset) {
      rangeReset.addEventListener('click', function() {
        if (posts.length && startInput && endInput) {
          startInput.value = posts[posts.length - 1].date;
          endInput.value = posts[0].date;
        }
        if (calendar) {
          calendar.querySelectorAll('.archive-calendar__day.is-selected').forEach(function(selected) {
            selected.classList.remove('is-selected');
          });
        }
        renderTimeline();
      });
    }

    if (calendarToggle && calendarShell) {
      calendarToggle.addEventListener('click', function() {
        var collapsed = calendarShell.classList.toggle('is-collapsed');
        calendarToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
        calendarToggle.querySelector('span').textContent = collapsed ? text.expand : text.collapse;
      });
    }

    renderTimeline();
  });
})();
