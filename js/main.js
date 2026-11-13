document.addEventListener('DOMContentLoaded', function () {
  // Bilingual label for text built in JS (CSS shows the one matching the page language)
  function bi(en, zh) {
    return '<span data-l="en">' + en + '</span><span data-l="zh" lang="zh-CN">' + zh + '</span>';
  }

  // Language switch: English by default; ?lang=zh (or the nav button) shows Chinese
  var root = document.documentElement;
  var langBtn = document.querySelector('.nav-lang');
  function setLang(zh, updateUrl) {
    root.classList.toggle('zh', zh);
    root.lang = zh ? 'zh-CN' : 'en';
    if (langBtn) langBtn.setAttribute('aria-label', zh ? 'Switch to English (切换到英文)' : '切换到中文 (Switch to Chinese)');
    if (updateUrl && window.history && window.URL) {
      var url = new URL(window.location.href);
      if (zh) url.searchParams.set('lang', 'zh'); else url.searchParams.delete('lang');
      window.history.replaceState(null, '', url);
    }
  }
  setLang(root.classList.contains('zh'), false);
  if (langBtn) {
    langBtn.addEventListener('click', function () { setLang(!root.classList.contains('zh'), true); });
  }

  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        links.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Highlight the nav link for the section in view
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  if ('IntersectionObserver' in window && navLinks.length) {
    var byId = {};
    navLinks.forEach(function (a) { byId[a.getAttribute('href').slice(1)] = a; });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.remove('active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(byId).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) observer.observe(el);
    });
  }

  // Copy BibTeX
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = document.querySelector(btn.getAttribute('data-copy'));
      if (!target || !navigator.clipboard) return;
      var original = btn.innerHTML;
      navigator.clipboard.writeText(target.innerText.trim()).then(function () {
        btn.innerHTML = bi('Copied', '已复制');
        setTimeout(function () { btn.innerHTML = original; }, 1600);
      });
    });
  });

  // Collapse long author lists: <span class="authors" data-show="N">A, B, ..., Z.</span>
  document.querySelectorAll('.authors[data-show]').forEach(function (el) {
    var show = parseInt(el.getAttribute('data-show'), 10);
    var names = el.textContent.trim().replace(/\.$/, '').split(/,\s*/);
    if (!show || names.length <= show + 2) return;

    var rest = document.createElement('span');
    rest.className = 'authors-rest';
    rest.hidden = true;
    rest.textContent = ', ' + names.slice(show).join(', ') + '.';

    var etal = document.createElement('span');
    etal.textContent = ', et al.';

    var btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'authors-toggle';
    btn.setAttribute('aria-expanded', 'false');
    var collapsedLabel = bi('Show all ' + names.length + ' authors', '显示全部 ' + names.length + ' 位作者');
    btn.innerHTML = collapsedLabel;
    btn.addEventListener('click', function () {
      var open = rest.hidden;
      rest.hidden = !open;
      etal.hidden = open;
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.innerHTML = open ? bi('Show fewer', '收起') : collapsedLabel;
    });

    el.textContent = names.slice(0, show).join(', ');
    el.appendChild(rest);
    el.appendChild(etal);
    el.appendChild(document.createTextNode(' '));
    el.appendChild(btn);
  });
});
