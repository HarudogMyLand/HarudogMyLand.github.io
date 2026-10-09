(function() {
  // Page text comes from _data/blog_i18n.yml via #blog-home-i18n.
  var text = {
    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    countTitle: '{key}: {count} posts',
    pause: 'Pause motion',
    resume: 'Resume motion',
    uncategorized: 'Uncategorized',
    hoverNode: 'Hover a node',
    focusNode: 'Focus or hover a node',
    searchPrefix: 'Search: '
  };

  function readText() {
    var el = document.getElementById('blog-home-i18n');
    if (!el) {
      return;
    }
    try {
      Object.assign(text, JSON.parse(el.textContent));
    } catch (error) {}
  }

  function pad(value) {
    return value < 10 ? '0' + value : String(value);
  }

  function heatLevel(count) {
    return Math.min(count, 4);
  }

  // Heatmaps are drawn from the visitor's current date so they stay accurate
  // between site builds. The month view steps by calendar month.
  function renderHeatmaps() {
    var root = document.querySelector('[data-blog-heatmap]');
    if (!root) {
      return;
    }
    var counts = {};
    (root.getAttribute('data-post-dates') || '').split(',').forEach(function(date) {
      if (!date) {
        return;
      }
      [date.slice(0, 4), date.slice(0, 7), date].forEach(function(key) {
        counts[key] = (counts[key] || 0) + 1;
      });
    });

    function cell(key, label, labeled) {
      var count = counts[key] || 0;
      var span = document.createElement('span');
      span.className = 'blog-heatmap__cell' + (labeled ? ' blog-heatmap__cell--labeled' : '');
      span.setAttribute('data-level', heatLevel(count));
      span.title = text.countTitle.replace('{key}', key).replace('{count}', count);
      if (labeled) {
        var b = document.createElement('b');
        var em = document.createElement('em');
        b.textContent = label;
        em.textContent = count;
        span.appendChild(b);
        span.appendChild(em);
      }
      return span;
    }

    var today = new Date();
    var year = today.getFullYear();
    var month = today.getMonth();
    var grids = {};
    Array.prototype.forEach.call(root.querySelectorAll('[data-heatmap-grid]'), function(grid) {
      grids[grid.getAttribute('data-heatmap-grid')] = grid;
      grid.innerHTML = '';
    });

    if (grids.year) {
      for (var y = year - 5; y <= year; y += 1) {
        grids.year.appendChild(cell(String(y), String(y), true));
      }
    }

    if (grids.month) {
      for (var offset = 11; offset >= 0; offset -= 1) {
        var monthDate = new Date(year, month - offset, 1);
        var monthKey = monthDate.getFullYear() + '-' + pad(monthDate.getMonth() + 1);
        grids.month.appendChild(cell(monthKey, text.months[monthDate.getMonth()], true));
      }
    }

    if (grids.day) {
      for (var dayOffset = 364; dayOffset >= 0; dayOffset -= 1) {
        var dayDate = new Date(year, month, today.getDate() - dayOffset);
        var dayKey = dayDate.getFullYear() + '-' + pad(dayDate.getMonth() + 1) + '-' + pad(dayDate.getDate());
        grids.day.appendChild(cell(dayKey, '', false));
      }
    }
  }

  document.addEventListener('DOMContentLoaded', function() {
    readText();
    renderHeatmaps();

    var buttons = Array.prototype.slice.call(document.querySelectorAll('.blog-tag-filter__button'));
    var rows = Array.prototype.slice.call(document.querySelectorAll('.blog-post-row'));
    var headings = Array.prototype.slice.call(document.querySelectorAll('.blog-year-heading'));
    var heatmapTabs = Array.prototype.slice.call(document.querySelectorAll('.blog-heatmap-tab'));
    var heatmapPanels = Array.prototype.slice.call(document.querySelectorAll('.blog-heatmap-panel'));
    var graphRoot = document.querySelector('[data-blog-graph]');

    function updateYearHeadings() {
      headings.forEach(function(heading) {
        var hasVisiblePost = false;
        var node = heading.nextElementSibling;
        while (node && !node.classList.contains('blog-year-heading')) {
          if (node.classList.contains('blog-post-row') && node.style.display !== 'none') {
            hasVisiblePost = true;
            break;
          }
          node = node.nextElementSibling;
        }
        heading.style.display = hasVisiblePost ? '' : 'none';
      });
    }

    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        var tag = button.getAttribute('data-blog-tag');

        buttons.forEach(function(item) {
          item.classList.toggle('is-active', item === button);
        });

        rows.forEach(function(row) {
          var tags = row.getAttribute('data-blog-tags') || '';
          row.style.display = tag === 'all' || tags.indexOf(tag + ' ') >= 0 ? '' : 'none';
        });

        updateYearHeadings();
      });
    });

    heatmapTabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        var view = tab.getAttribute('data-heatmap-view');
        heatmapTabs.forEach(function(item) {
          item.classList.toggle('is-active', item === tab);
          item.setAttribute('aria-pressed', item === tab ? 'true' : 'false');
        });
        heatmapPanels.forEach(function(panel) {
          panel.hidden = panel.getAttribute('data-heatmap-panel') !== view;
        });
      });
    });

    function initBlogGraph() {
      var dataEl = document.getElementById('blog-graph-data');
      if (!graphRoot || !dataEl) {
        return;
      }

      var data;
      try {
        data = JSON.parse(dataEl.textContent);
      } catch (error) {
        graphRoot.classList.add('is-empty');
        return;
      }

      var nodes = (data.nodes || []).map(function(node, index) {
        return Object.assign({}, node, { index: index });
      });
      var nodeById = {};
      nodes.forEach(function(node) {
        nodeById[node.id] = node;
      });

      var links = (data.links || []).filter(function(link) {
        return link.source && link.target && nodeById[link.source] && nodeById[link.target];
      }).map(function(link) {
        return Object.assign({}, link, {
          sourceNode: nodeById[link.source],
          targetNode: nodeById[link.target]
        });
      });

      var svg = graphRoot.querySelector('.blog-graph__canvas');
      var labelButton = graphRoot.querySelector('[data-graph-labels]');
      var pauseButton = graphRoot.querySelector('[data-graph-pause]');
      var resetButton = graphRoot.querySelector('[data-graph-reset]');
      var zoomInButton = graphRoot.querySelector('[data-graph-zoom-in]');
      var zoomOutButton = graphRoot.querySelector('[data-graph-zoom-out]');
      var searchInputs = Array.prototype.slice.call(document.querySelectorAll('[data-graph-search], [data-graph-search-mirror]'));
      var clusterName = graphRoot.querySelector('[data-graph-cluster-name]');
      if (!svg || nodes.length === 0) {
        graphRoot.classList.add('is-empty');
        return;
      }

      var ns = 'http://www.w3.org/2000/svg';
      var clusterColor = ['var(--graph-color-1)', 'var(--graph-color-2)', 'var(--graph-color-3)', 'var(--graph-color-4)', 'var(--graph-color-5)', 'var(--graph-color-6)', 'var(--graph-color-7)'];
      var searchTerm = '';
      var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var graphPaused = prefersReducedMotion;
      var zoom = {
        scale: 1,
        x: 0,
        y: 0
      };

      function createSvgElement(name, className) {
        var el = document.createElementNS(ns, name);
        if (className) {
          el.setAttribute('class', className);
        }
        return el;
      }

      var animationFrame = null;

      function updatePauseButton() {
        if (!pauseButton) {
          return;
        }
        pauseButton.textContent = graphPaused ? text.resume : text.pause;
        pauseButton.setAttribute('aria-pressed', graphPaused ? 'true' : 'false');
      }

      function render() {
        if (animationFrame) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = null;
        }
        var svgBox = svg.getBoundingClientRect();
        var width = Math.max(svgBox.width || graphRoot.clientWidth, 320);
        var height = width < 620 ? 340 : 420;
        var padding = width < 620 ? 28 : 46;
        var activeDrag = null;
        var frameCount = 0;
        svg.innerHTML = '';
        svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height);
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', height);

        var clusters = [];
        var clusterMap = {};
        nodes.forEach(function(node) {
          var key = node.cluster || 'uncategorized';
          if (!clusterMap[key]) {
            clusterMap[key] = {
              key: key,
              label: node.clusterLabel || key,
              nodes: [],
              color: clusterColor[clusters.length % clusterColor.length]
            };
            clusters.push(clusterMap[key]);
          }
          clusterMap[key].nodes.push(node);
        });

        var centerX = width / 2;
        var centerY = height / 2;
        var radiusX = Math.max(width / 2 - padding * 2.2, 64);
        var radiusY = Math.max(height / 2 - padding * 2.1, 52);

        clusters.forEach(function(cluster, index) {
          var angle = clusters.length === 1 ? -Math.PI / 2 : (Math.PI * 2 * index / clusters.length) - Math.PI / 2;
          cluster.x = clusters.length === 1 ? centerX : centerX + Math.cos(angle) * radiusX;
          cluster.y = clusters.length === 1 ? centerY : centerY + Math.sin(angle) * radiusY;
        });

        nodes.forEach(function(node, index) {
          var cluster = clusterMap[node.cluster || 'uncategorized'];
          if (typeof node.x !== 'number' || typeof node.y !== 'number') {
            var angle = Math.PI * 2 * (index + 1) / Math.max(nodes.length, 1);
            node.x = cluster.x + Math.cos(angle) * 28;
            node.y = cluster.y + Math.sin(angle) * 28;
          } else {
            node.x = Math.min(width - padding, Math.max(padding, node.x));
            node.y = Math.min(height - padding, Math.max(padding, node.y));
          }
          node.vx = node.vx || 0;
          node.vy = node.vy || 0;
          node.radius = 7 + Math.min(5, links.filter(function(link) {
            return link.source === node.id || link.target === node.id;
          }).length);
          node.color = cluster.color;
        });

        var linkLayer = createSvgElement('g', 'blog-graph__links');
        var nodeLayer = createSvgElement('g', 'blog-graph__nodes');
        var viewportLayer = createSvgElement('g', 'blog-graph__viewport');
        viewportLayer.appendChild(linkLayer);
        viewportLayer.appendChild(nodeLayer);
        svg.appendChild(viewportLayer);

        function updateZoomTransform() {
          viewportLayer.setAttribute('transform', 'translate(' + zoom.x + ' ' + zoom.y + ') scale(' + zoom.scale + ')');
        }

        function eventToWorld(event) {
          var point = svg.createSVGPoint();
          point.x = event.clientX;
          point.y = event.clientY;
          var svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
          return {
            x: (svgPoint.x - zoom.x) / zoom.scale,
            y: (svgPoint.y - zoom.y) / zoom.scale
          };
        }

        links.forEach(function(link) {
          var line = createSvgElement('line', 'blog-graph__link blog-graph__link--' + link.type);
          line.setAttribute('data-relation', link.label);
          link.element = line;
          linkLayer.appendChild(line);
        });

        nodes.forEach(function(node) {
          var anchor = createSvgElement('a', 'blog-graph__node-link');
          anchor.setAttributeNS('http://www.w3.org/1999/xlink', 'href', node.url);
          anchor.setAttribute('href', node.url);
          anchor.setAttribute('aria-label', node.title + ' - ' + node.clusterLabel);
          anchor.addEventListener('click', function(event) {
            if (node.wasDragged) {
              event.preventDefault();
              node.wasDragged = false;
            }
          });

          var group = createSvgElement('g', 'blog-graph__node');
          group.setAttribute('data-title', node.title.toLowerCase());
          group.setAttribute('data-cluster', (node.clusterLabel || '').toLowerCase());
          node.element = group;

          var title = createSvgElement('title');
          title.textContent = node.title + ' / ' + node.clusterLabel + ' / ' + node.date;
          group.appendChild(title);

          var circle = createSvgElement('circle');
          circle.setAttribute('r', node.radius);
          circle.style.setProperty('--graph-node-color', node.color);
          group.appendChild(circle);

          var text = createSvgElement('text', 'blog-graph__node-label');
          text.setAttribute('x', node.radius + 7);
          text.setAttribute('y', 4);
          text.textContent = node.title;
          group.appendChild(text);

          anchor.appendChild(group);
          nodeLayer.appendChild(anchor);

          group.addEventListener('mouseenter', function() {
            if (clusterName) {
              clusterName.textContent = node.clusterLabel || node.cluster || text.uncategorized;
            }
            graphRoot.classList.add('is-node-hovered');
            group.classList.add('is-hovered');
          });

          group.addEventListener('mouseleave', function() {
            graphRoot.classList.remove('is-node-hovered');
            group.classList.remove('is-hovered');
            if (clusterName) {
              clusterName.textContent = searchTerm ? text.searchPrefix + searchTerm : text.hoverNode;
            }
          });

          anchor.addEventListener('focus', function() {
            if (clusterName) {
              clusterName.textContent = node.clusterLabel || node.cluster || text.uncategorized;
            }
            graphRoot.classList.add('is-node-hovered');
            group.classList.add('is-hovered');
          });

          anchor.addEventListener('blur', function() {
            graphRoot.classList.remove('is-node-hovered');
            group.classList.remove('is-hovered');
            if (clusterName) {
              clusterName.textContent = searchTerm ? text.searchPrefix + searchTerm : text.focusNode;
            }
          });

          group.addEventListener('pointerdown', function(event) {
            if (event.button === 1) {
              return;
            }
            event.preventDefault();
            activeDrag = {
              node: node,
              pointerId: event.pointerId,
              startX: event.clientX,
              startY: event.clientY
            };
            node.isDragging = true;
            node.fx = node.x;
            node.fy = node.y;
            group.classList.add('is-dragging');
            group.setPointerCapture(event.pointerId);
            startSimulation();
          });

          group.addEventListener('pointermove', function(event) {
            if (!activeDrag || activeDrag.node !== node || activeDrag.pointerId !== event.pointerId) {
              return;
            }
            var transformed = eventToWorld(event);
            node.fx = Math.min(width - padding, Math.max(padding, transformed.x));
            node.fy = Math.min(height - padding, Math.max(padding, transformed.y));
            node.x = node.fx;
            node.y = node.fy;
            node.vx = 0;
            node.vy = 0;
            updateElements();
            if (Math.abs(event.clientX - activeDrag.startX) + Math.abs(event.clientY - activeDrag.startY) > 5) {
              node.wasDragged = true;
            }
          });

          group.addEventListener('pointerup', function(event) {
            if (!activeDrag || activeDrag.node !== node || activeDrag.pointerId !== event.pointerId) {
              return;
            }
            activeDrag = null;
            node.isDragging = false;
            node.userX = node.x;
            node.userY = node.y;
            node.userPlaced = true;
            node.fx = null;
            node.fy = null;
            group.classList.remove('is-dragging');
            group.releasePointerCapture(event.pointerId);
          });

          group.addEventListener('pointercancel', function(event) {
            activeDrag = null;
            node.isDragging = false;
            node.userX = node.x;
            node.userY = node.y;
            node.userPlaced = true;
            node.fx = null;
            node.fy = null;
            group.classList.remove('is-dragging');
            if (group.hasPointerCapture(event.pointerId)) {
              group.releasePointerCapture(event.pointerId);
            }
          });
        });

        function updateElements() {
          links.forEach(function(link) {
            link.element.setAttribute('x1', link.sourceNode.x);
            link.element.setAttribute('y1', link.sourceNode.y);
            link.element.setAttribute('x2', link.targetNode.x);
            link.element.setAttribute('y2', link.targetNode.y);
          });
          nodes.forEach(function(node) {
            node.element.setAttribute('transform', 'translate(' + node.x + ' ' + node.y + ')');
          });
        }

        function applySearch() {
          var term = searchTerm.trim().toLowerCase();
          graphRoot.classList.toggle('is-searching', !!term);
          nodes.forEach(function(node) {
            var haystack = [
              node.title,
              node.clusterLabel,
              node.date,
              (node.tags || []).join(' '),
              (node.columns || []).join(' ')
            ].join(' ').toLowerCase();
            node.isSearchMatch = !term || haystack.indexOf(term) >= 0;
            node.element.classList.toggle('is-search-match', node.isSearchMatch && !!term);
            node.element.classList.toggle('is-search-dimmed', !node.isSearchMatch && !!term);
          });
          links.forEach(function(link) {
            var active = !term || (link.sourceNode.isSearchMatch && link.targetNode.isSearchMatch);
            link.element.classList.toggle('is-search-dimmed', !active);
          });
          if (clusterName) {
            clusterName.textContent = term ? text.searchPrefix + searchTerm : text.hoverNode;
          }
        }

        function step() {
          animationFrame = null;
          if (graphPaused || document.hidden) {
            return;
          }
          var movement = 0;
          links.forEach(function(link) {
            var source = link.sourceNode;
            var target = link.targetNode;
            var dx = target.x - source.x;
            var dy = target.y - source.y;
            var distance = Math.sqrt(dx * dx + dy * dy) || 1;
            var sameCluster = source.cluster === target.cluster;
            var targetDistance = link.weight > 1 ? 92 : 142;
            if (!sameCluster) {
              targetDistance += 58;
            }
            var force = (distance - targetDistance) * 0.0024 * link.weight;
            var fx = dx / distance * force;
            var fy = dy / distance * force;
            if (!source.isDragging) {
              source.vx += fx;
              source.vy += fy;
            }
            if (!target.isDragging) {
              target.vx -= fx;
              target.vy -= fy;
            }
          });

          for (var i = 0; i < nodes.length; i += 1) {
            for (var j = i + 1; j < nodes.length; j += 1) {
              var a = nodes[i];
              var b = nodes[j];
              var dxRepel = b.x - a.x;
              var dyRepel = b.y - a.y;
              var distanceRepel = Math.sqrt(dxRepel * dxRepel + dyRepel * dyRepel) || 1;
              var sameNodeCluster = a.cluster === b.cluster;
              var minDistance = (a.radius || 8) + (b.radius || 8) + (sameNodeCluster ? 14 : 26);
              var overlapBoost = distanceRepel < minDistance ? (minDistance - distanceRepel) * 0.12 : 0;
              var repel = sameNodeCluster ? 1100 : 2800;
              var forceRepel = Math.min(sameNodeCluster ? 1.65 : 3.1, repel / (distanceRepel * distanceRepel) + overlapBoost);
              var rx = dxRepel / distanceRepel * forceRepel;
              var ry = dyRepel / distanceRepel * forceRepel;
              if (!a.isDragging) {
                a.vx -= rx;
                a.vy -= ry;
              }
              if (!b.isDragging) {
                b.vx += rx;
                b.vy += ry;
              }
            }
          }

          nodes.forEach(function(node) {
            var cluster = clusterMap[node.cluster || 'uncategorized'];
            if (node.isDragging) {
              node.x = node.fx;
              node.y = node.fy;
              return;
            }
            var clusterPull = node.userPlaced ? 0.0011 : 0.0028;
            node.vx += (cluster.x - node.x) * clusterPull;
            node.vy += (cluster.y - node.y) * clusterPull;
            if (node.userPlaced) {
              node.vx += (node.userX - node.x) * 0.0022;
              node.vy += (node.userY - node.y) * 0.0022;
            }
            node.vx += (centerX - node.x) * 0.00018;
            node.vy += (centerY - node.y) * 0.00018;
            node.vx *= 0.94;
            node.vy *= 0.94;
            movement += Math.abs(node.vx) + Math.abs(node.vy);
            node.x = Math.min(width - padding, Math.max(padding, node.x + node.vx));
            node.y = Math.min(height - padding, Math.max(padding, node.y + node.vy));
            if (node.x === padding || node.x === width - padding) {
              node.vx *= -0.24;
            }
            if (node.y === padding || node.y === height - padding) {
              node.vy *= -0.24;
            }
          });

          updateElements();
          frameCount += 1;
          if (frameCount < 480 && (frameCount < 120 || movement > 0.04)) {
            animationFrame = window.requestAnimationFrame(step);
          }
        }

        function startSimulation() {
          if (graphPaused || document.hidden || animationFrame) {
            return;
          }
          frameCount = 0;
          animationFrame = window.requestAnimationFrame(step);
        }

        updateElements();
        updateZoomTransform();
        applySearch();
        graphRoot.blogGraphApplySearch = applySearch;
        graphRoot.blogGraphStart = startSimulation;
        graphRoot.blogGraphAdjustZoom = function(factor) {
          var oldScale = zoom.scale;
          var nextScale = Math.min(2.4, Math.max(0.62, oldScale * factor));
          var centerPointX = width / 2;
          var centerPointY = height / 2;
          var worldX = (centerPointX - zoom.x) / oldScale;
          var worldY = (centerPointY - zoom.y) / oldScale;
          zoom.scale = nextScale;
          zoom.x = centerPointX - worldX * nextScale;
          zoom.y = centerPointY - worldY * nextScale;
          updateZoomTransform();
        };
        startSimulation();

        var isPanning = false;
        var panStart = {
          x: 0,
          y: 0,
          zoomX: 0,
          zoomY: 0
        };

        svg.onpointerdown = function(event) {
          if (event.target.closest && event.target.closest('.blog-graph__node-link')) {
            return;
          }
          if (event.button !== 0 && event.button !== 1) {
            return;
          }
          event.preventDefault();
          isPanning = true;
          panStart.x = event.clientX;
          panStart.y = event.clientY;
          panStart.zoomX = zoom.x;
          panStart.zoomY = zoom.y;
          svg.classList.add('is-panning');
          svg.setPointerCapture(event.pointerId);
        };

        svg.onpointermove = function(event) {
          if (!isPanning) {
            return;
          }
          event.preventDefault();
          zoom.x = panStart.zoomX + event.clientX - panStart.x;
          zoom.y = panStart.zoomY + event.clientY - panStart.y;
          updateZoomTransform();
        };

        svg.onpointerup = function(event) {
          if (!isPanning) {
            return;
          }
          isPanning = false;
          svg.classList.remove('is-panning');
          if (svg.hasPointerCapture(event.pointerId)) {
            svg.releasePointerCapture(event.pointerId);
          }
        };

        svg.onpointercancel = function(event) {
          isPanning = false;
          svg.classList.remove('is-panning');
          if (svg.hasPointerCapture(event.pointerId)) {
            svg.releasePointerCapture(event.pointerId);
          }
        };

        svg.onauxclick = function(event) {
          if (event.button === 1) {
            event.preventDefault();
          }
        };

        svg.onmousedown = function(event) {
          if (event.button === 1) {
            event.preventDefault();
          }
        };

        svg.onwheel = function(event) {
          event.preventDefault();
          var point = svg.createSVGPoint();
          point.x = event.clientX;
          point.y = event.clientY;
          var svgPoint = point.matrixTransform(svg.getScreenCTM().inverse());
          var oldScale = zoom.scale;
          var delta = event.deltaY < 0 ? 1.12 : 0.89;
          var nextScale = Math.min(2.4, Math.max(0.62, oldScale * delta));
          var worldX = (svgPoint.x - zoom.x) / oldScale;
          var worldY = (svgPoint.y - zoom.y) / oldScale;
          zoom.scale = nextScale;
          zoom.x = svgPoint.x - worldX * nextScale;
          zoom.y = svgPoint.y - worldY * nextScale;
          updateZoomTransform();
        };
      }

      if (labelButton) {
        labelButton.addEventListener('change', function() {
          graphRoot.classList.toggle('is-label-muted', !labelButton.checked);
        });
      }

      updatePauseButton();

      if (pauseButton) {
        pauseButton.addEventListener('click', function() {
          graphPaused = !graphPaused;
          if (graphPaused && animationFrame) {
            window.cancelAnimationFrame(animationFrame);
            animationFrame = null;
          }
          updatePauseButton();
          if (!graphPaused && graphRoot.blogGraphStart) {
            graphRoot.blogGraphStart();
          }
        });
      }

      if (resetButton) {
        resetButton.addEventListener('click', function() {
          zoom = { scale: 1, x: 0, y: 0 };
          nodes.forEach(function(node) {
            delete node.x;
            delete node.y;
            delete node.userX;
            delete node.userY;
            node.userPlaced = false;
            node.vx = 0;
            node.vy = 0;
          });
          render();
        });
      }

      if (zoomInButton) {
        zoomInButton.addEventListener('click', function() {
          if (graphRoot.blogGraphAdjustZoom) {
            graphRoot.blogGraphAdjustZoom(1.2);
          }
        });
      }

      if (zoomOutButton) {
        zoomOutButton.addEventListener('click', function() {
          if (graphRoot.blogGraphAdjustZoom) {
            graphRoot.blogGraphAdjustZoom(0.83);
          }
        });
      }

      if (searchInputs.length) {
        searchInputs.forEach(function(input) {
          input.addEventListener('input', function() {
            searchTerm = input.value;
            searchInputs.forEach(function(peer) {
              if (peer !== input) {
                peer.value = searchTerm;
              }
            });
            nodes.forEach(function(node) {
              if (node.isSearchMatch) {
                node.vx += (Math.random() - 0.5) * 0.9;
                node.vy += (Math.random() - 0.5) * 0.9;
              }
            });
            var currentApply = graphRoot.blogGraphApplySearch;
            if (currentApply) {
              currentApply();
            }
            if (graphRoot.blogGraphStart) {
              graphRoot.blogGraphStart();
            }
          });
        });
      }

      render();
      window.addEventListener('resize', function() {
        window.clearTimeout(graphRoot.blogGraphResizeTimer);
        graphRoot.blogGraphResizeTimer = window.setTimeout(render, 160);
      });
      document.addEventListener('visibilitychange', function() {
        if (!document.hidden && !graphPaused && graphRoot.blogGraphStart) {
          graphRoot.blogGraphStart();
        }
      });
    }

    initBlogGraph();
    updateYearHeadings();
  });
})();
