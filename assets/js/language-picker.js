(function() {
  var defaultLanguage = 'EH';
  var languageLabels = {
    CN: '中文',
    EH: 'English',
    EN: 'English',
    DE: 'Deutsch',
    ES: 'Español',
    FR: 'Français',
    JP: '日本語',
    KR: '한국어',
    RU: 'Русский'
  };
  var languageHtml = {
    CN: 'zh-CN',
    EH: 'en',
    EN: 'en',
    DE: 'de',
    ES: 'es',
    FR: 'fr',
    JP: 'ja',
    KR: 'ko',
    RU: 'ru'
  };

  function readPreference() {
    try {
      return window.localStorage.getItem('siteLanguage');
    } catch (error) {
      return null;
    }
  }

  function writePreference(language) {
    try {
      window.localStorage.setItem('siteLanguage', language);
    } catch (error) {}
  }

  function normalizePath(value) {
    var path = String(value || '').split('#')[0].split('?')[0];
    if (/^[a-z][a-z0-9+.-]*:\/\//i.test(path)) {
      try {
        path = new URL(path).pathname;
      } catch (error) {}
    }
    path = path.replace(/\/+$/, '').replace(/\.[^./]+$/, '');
    var suffixMatch = path.match(/-([a-z0-9]{2,})$/i);
    var language = defaultLanguage;
    var hasLanguageSuffix = false;
    if (suffixMatch) {
      var candidate = suffixMatch[1].toUpperCase();
      if (suffixMatch[1] === suffixMatch[1].toUpperCase()) {
        language = candidate;
        hasLanguageSuffix = true;
        path = path.slice(0, suffixMatch.index);
      }
    }
    return {
      key: path.toLowerCase(),
      language: language,
      hasLanguageSuffix: hasLanguageSuffix
    };
  }

  function isHomepage(documentEntry) {
    return /(^|\/)index$/.test(documentEntry.sourceKey);
  }

  function parseTranslations(element) {
    try {
      return JSON.parse(element.getAttribute('data-nav-translations') || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function getTranslation(translations, language, fallback) {
    return translations[language] || translations[language.toLowerCase()] || fallback;
  }

  document.addEventListener('DOMContentLoaded', function() {
    var picker = document.querySelector('[data-language-picker]');
    if (!picker) {
      return;
    }

    var sourceInfo = normalizePath(picker.getAttribute('data-language-source'));
    var documents = Array.prototype.slice.call(picker.querySelectorAll('[data-language-document]')).map(function(element) {
      var source = normalizePath(element.getAttribute('data-language-path'));
      var url = normalizePath(element.getAttribute('href'));
      return {
        element: element,
        sourceKey: source.key,
        urlKey: url.key,
        language: source.language === defaultLanguage && url.language !== defaultLanguage ? url.language : source.language,
        hasLanguageSuffix: source.hasLanguageSuffix,
        url: element.getAttribute('href')
      };
    });

    var pageDocuments = documents.filter(function(documentEntry) {
      return documentEntry.sourceKey === sourceInfo.key;
    });
    var currentLanguage = sourceInfo.language;
    var currentDocument = pageDocuments.find(function(documentEntry) {
      return documentEntry.language === currentLanguage;
    });
    if (currentDocument) {
      currentLanguage = currentDocument.language;
    }

    var languageByCode = {};
    pageDocuments.forEach(function(documentEntry) {
      languageByCode[documentEntry.language] = documentEntry;
    });

    var siteLanguages = {};
    documents.forEach(function(documentEntry) {
      if (!documentEntry.hasLanguageSuffix) {
        return;
      }
      if (!siteLanguages[documentEntry.language] || isHomepage(documentEntry)) {
        siteLanguages[documentEntry.language] = documentEntry;
      }
    });
    if (!siteLanguages[currentLanguage]) {
      siteLanguages[currentLanguage] = languageByCode[currentLanguage] || null;
    }

    var options = picker.querySelector('[data-language-options]');
    var currentLabel = picker.querySelector('[data-language-current]');
    var availableLanguages = Object.keys(siteLanguages).sort(function(left, right) {
      if (left === defaultLanguage) return -1;
      if (right === defaultLanguage) return 1;
      return left.localeCompare(right);
    });

    if (!availableLanguages.length) {
      availableLanguages = [currentLanguage];
    }

    availableLanguages.forEach(function(language) {
      var documentEntry = languageByCode[language] || siteLanguages[language];
      var option = document.createElement('button');
      option.type = 'button';
      option.className = 'language-picker__option';
      option.dataset.languageOption = language;
      option.setAttribute('aria-pressed', language === currentLanguage ? 'true' : 'false');
      option.innerHTML = '<b></b><span></span>';
      option.querySelector('b').textContent = language;
      option.querySelector('span').textContent = languageLabels[language] || language;
      option.addEventListener('click', function() {
        writePreference(language);
        picker.open = false;
        if (documentEntry && documentEntry.url && documentEntry.url !== window.location.pathname) {
          window.location.href = documentEntry.url;
        }
      });
      options.appendChild(option);
    });

    if (currentLabel) {
      currentLabel.textContent = currentLanguage;
      currentLabel.title = languageLabels[currentLanguage] || currentLanguage;
    }

    var navLabels = document.querySelectorAll('[data-nav-label]');
    navLabels.forEach(function(label) {
      var link = label.closest('[data-language-link]');
      if (!link) return;
      label.textContent = getTranslation(parseTranslations(link), currentLanguage, link.getAttribute('data-nav-title') || label.textContent);
    });

    document.querySelectorAll('[data-language-link]').forEach(function(link) {
      var href = link.getAttribute('href') || '';
      if (/^[a-z][a-z0-9+.-]*:\/\//i.test(href)) return;
      var target = normalizePath(href);
      var translatedDocument = documents.find(function(documentEntry) {
        return documentEntry.urlKey === target.key && documentEntry.language === currentLanguage;
      });
      if (translatedDocument && translatedDocument.url) {
        link.setAttribute('href', translatedDocument.url);
      }
    });

    document.documentElement.lang = languageHtml[currentLanguage] || currentLanguage.toLowerCase();

    var preferredLanguage = readPreference();
    var preferredDocument = languageByCode[preferredLanguage];
    if (preferredDocument && preferredDocument.url && preferredLanguage !== currentLanguage && preferredDocument.url !== window.location.pathname) {
      window.location.replace(preferredDocument.url);
    }
  });
})();
