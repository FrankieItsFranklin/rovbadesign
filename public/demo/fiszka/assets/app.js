// Fiszka. Bez bibliotek.
// Menu, notatki, analityka (konsola), formularz demo z prefill, wejścia przy przewijaniu,
// wybór powodu wizyty, interaktywny schemat zębów, lupa „pod mikroskopem”, linia kroków, szukajka w cenniku.
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function track(name, label) { console.info('[analytics]', name, label || ''); }

  // ---------- Menu ----------
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav');
  var header = document.querySelector('.header');
  if (toggle && nav) {
    var label = toggle.querySelector('.nav-toggle__text');
    function setOpen(open) {
      if (open) nav.style.setProperty('--nav-top', header.getBoundingClientRect().bottom + 'px');
      nav.classList.toggle('is-open', open);
      document.body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      label.textContent = open ? 'Zamknij' : 'Menu';
      if (open) { var first = nav.querySelector('a'); if (first) first.focus(); }
    }
    toggle.addEventListener('click', function () { setOpen(!nav.classList.contains('is-open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) { setOpen(false); toggle.focus(); }
    });
    window.matchMedia('(min-width: 960px)').addEventListener('change', function () { setOpen(false); });
  }

  // ---------- Dolny pasek: ukryty, dopóki główny przycisk strony jest na ekranie ----------
  var bar = document.querySelector('[data-cta-bar]');
  var watched = document.querySelectorAll('[data-cta-watch]');
  if (bar && watched.length && 'IntersectionObserver' in window) {
    var visible = new Set();
    var barIo = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target); });
      bar.classList.toggle('is-hidden', visible.size > 0);
    });
    watched.forEach(function (el) { barIo.observe(el); });
  }

  // ---------- Strona główna: nagłówek jasnieje po zjechaniu ze zdjęcia ----------
  var heroEl = document.querySelector('.hero');
  if (heroEl && header && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (en) {
      header.classList.toggle('is-solid', !en[0].isIntersecting);
    }, { rootMargin: '-64px 0px 0px 0px' }).observe(heroEl);
  }

  // ---------- Analityka (konsola) ----------
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-event]');
    if (el) track(el.getAttribute('data-event'), el.getAttribute('data-label'));
  });

  // ---------- Wejścia przy przewijaniu ----------
  document.querySelectorAll('.reveal-list').forEach(function (list) {
    Array.prototype.forEach.call(list.children, function (li, i) { li.style.setProperty('--i', i); });
  });
  // Karty kartoteki: elementy sekcji wchodzą po kolei (nagłówek, tekst, karta), raz.
  document.querySelectorAll('main [data-tab] > .container, main [data-tab] > .container > .split').forEach(function (box) {
    var i = 0;
    Array.prototype.forEach.call(box.children, function (el) {
      if (el.classList.contains('split') || el.tagName === 'DIALOG') return;
      el.classList.add('reveal'); el.style.setProperty('--i', i++);
    });
  });
  var revealTargets = document.querySelectorAll('.reveal, .reveal-list, .chart');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.12 });
    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add('is-in'); });
  }

  // ---------- Z czym przychodzisz? ----------
  var triage = document.querySelector('[data-triage]');
  if (triage) {
    var chips = triage.querySelectorAll('[data-pick]');
    var cards = triage.querySelectorAll('[data-answer]');
    chips.forEach(function (chip) {
      chip.addEventListener('click', function () {
        var pick = chip.getAttribute('data-pick');
        chips.forEach(function (c) { c.setAttribute('aria-pressed', String(c === chip)); });
        cards.forEach(function (card) { card.hidden = card.getAttribute('data-answer') !== pick; });
        track('triage_select', pick);
      });
    });
  }

  // ---------- Hero: uśmiech → objaw → zapis ----------
  var smileBox = document.querySelector('[data-smile]');
  if (smileBox) {
    var SYM = {
      bol: { powod: 'bol', text: 'boli' },
      ukruszony: { powod: 'leczenie', text: 'ukruszony' },
      przebarwiony: { powod: 'estetyka', text: 'przebarwiony' },
      kontrola: { powod: 'przeglad', text: 'kontrola' }
    };
    var stages = smileBox.querySelectorAll('[data-stage]');
    // kolejność klawiatury = położenie na ekranie: górny rząd od lewej, potem dolny
    var teeth = Array.prototype.slice.call(smileBox.querySelectorAll('.st')).sort(function (a, b) {
      var ra = a.getBBox(), rb = b.getBBox();
      var rowA = +a.getAttribute('data-tooth') < 30 ? 0 : 1, rowB = +b.getAttribute('data-tooth') < 30 ? 0 : 1;
      return rowA - rowB || ra.x - rb.x;
    });
    var o = function (k) { return smileBox.querySelector('[data-out="' + k + '"]'); };
    var chosen = null; // { zab: '11' | '', name: '...' }
    function stage(name) {
      stages.forEach(function (st) { st.hidden = st.getAttribute('data-stage') !== name; });
    }
    function pick(zab, name) {
      chosen = { zab: zab, name: name };
      teeth.forEach(function (t) { t.setAttribute('aria-pressed', String(t.getAttribute('data-tooth') === zab)); });
      o('tooth').textContent = name;
      stage('symptom');
      track('smile_tooth', zab || 'tyl');
    }
    teeth.forEach(function (t, i) {
      t.addEventListener('click', function () { pick(t.getAttribute('data-tooth'), t.getAttribute('data-name')); });
      t.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowRight') next = i + 1;
        else if (e.key === 'ArrowLeft') next = i - 1;
        else if (e.key === 'ArrowDown') next = i + 10;
        else if (e.key === 'ArrowUp') next = i - 10;
        else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
        if (next === null) return;
        e.preventDefault();
        next = (next + teeth.length) % teeth.length;
        t.setAttribute('tabindex', '-1');
        teeth[next].setAttribute('tabindex', '0');
        teeth[next].focus();
      });
    });
    smileBox.querySelector('[data-back]').addEventListener('click', function () { pick('', 'Ząb z tyłu (trzonowy)'); });
    smileBox.querySelectorAll('[data-sym]').forEach(function (b) {
      b.addEventListener('click', function () {
        var key = b.getAttribute('data-sym');
        var sym = SYM[key];
        var q = 'powod=' + sym.powod + (chosen.zab ? '&zab=' + chosen.zab : '') + '&opis=' + key;
        o('summary').textContent = chosen.name + ': ' + sym.text + '.';
        o('link').href = 'kontakt.html?' + q + '#zapis';
        o('link').textContent = 'Umów wizytę z tym opisem';
        o('call').hidden = key !== 'bol';
        stage('go');
        track('smile_symptom', key);
      });
    });
    smileBox.querySelector('[data-reset]').addEventListener('click', function () {
      teeth.forEach(function (t) { t.setAttribute('aria-pressed', 'false'); });
      chosen = null;
      stage('pick');
      teeth[0].focus();
    });
  }

  // ---------- Schemat zębów (krok 2 formularza) ----------
  function initChart(chartBox) {
    var all = chartBox.querySelectorAll('.tooth');
    var zabInput = chartBox.querySelector('input[name="zab"]');
    var out = function (k) { return chartBox.querySelector('[data-out="' + k + '"]'); };
    function clear() {
      all.forEach(function (x) { x.setAttribute('aria-pressed', 'false'); });
      if (zabInput) zabInput.value = '';
      out('none').hidden = false;
      out('picked').hidden = true;
    }
    function select(n) {
      var t = chartBox.querySelector('.tooth[data-tooth="' + n + '"]');
      if (!t) return;
      all.forEach(function (x) { x.setAttribute('aria-pressed', String(x.getAttribute('data-tooth') === n)); });
      if (zabInput) zabInput.value = n;
      out('none').hidden = true;
      out('picked').hidden = false;
      out('num').textContent = n;
      out('name').textContent = t.getAttribute('data-name');
      track('tooth_select', n);
    }
    chartBox.querySelectorAll('.chart').forEach(function (svg) {
      var teeth = Array.prototype.slice.call(svg.querySelectorAll('.tooth'));
      var perRow = svg.classList.contains('chart--wide') ? 16 : 8;
      teeth.forEach(function (t, i) {
        t.setAttribute('aria-pressed', 'false');
        t.addEventListener('click', function () { select(t.getAttribute('data-tooth')); });
        t.addEventListener('keydown', function (e) {
          var next = null;
          if (e.key === 'ArrowRight') next = i + 1;
          else if (e.key === 'ArrowLeft') next = i - 1;
          else if (e.key === 'ArrowDown') next = i + perRow;
          else if (e.key === 'ArrowUp') next = i - perRow;
          else if (e.key === 'Home') next = 0;
          else if (e.key === 'End') next = teeth.length - 1;
          else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); t.dispatchEvent(new MouseEvent('click', { bubbles: true })); return; }
          if (next === null) return;
          e.preventDefault();
          next = Math.max(0, Math.min(teeth.length - 1, next));
          t.setAttribute('tabindex', '-1');
          teeth[next].setAttribute('tabindex', '0');
          teeth[next].focus();
        });
      });
    });
    return { select: select, clear: clear };
  }

  // ---------- Lupa „pod mikroskopem” ----------
  var lensBox = document.querySelector('[data-lens]');
  if (lensBox) {
    var svg = lensBox.querySelector('svg');
    var clip = svg.querySelector('.lens__clip');
    var bg = svg.querySelector('.lens__bg');
    var ring = svg.querySelector('.lens__ring');
    var detail = svg.querySelector('.lens__detail');
    var ZOOM = 1.7;
    function place(x, y) {
      [clip, bg, ring].forEach(function (c) { c.setAttribute('cx', x); c.setAttribute('cy', y); });
      detail.setAttribute('transform', 'translate(' + x + ' ' + y + ') scale(' + ZOOM + ') translate(' + -x + ' ' + -y + ')');
    }
    function toSvg(e) {
      var pt = svg.createSVGPoint();
      pt.x = e.clientX; pt.y = e.clientY;
      return pt.matrixTransform(svg.getScreenCTM().inverse());
    }
    var touched = false;
    var pos = { x: 232, y: 330 };
    var t0 = performance.now();
    function move(x, y) { pos.x = Math.max(40, Math.min(360, x)); pos.y = Math.max(60, Math.min(460, y)); place(pos.x, pos.y); }
    function stop() { if (!touched) { touched = true; track('lens_use'); } }
    // krótki pokaz ruchu (maks. 6 s), potem lupa czeka na użytkownika
    function drift(now) {
      var t = (now - t0) / 1000;
      if (touched || t > 6) return;
      move(200 + Math.sin(t * 0.8) * 60, 300 + Math.sin(t * 1.1) * 70);
      requestAnimationFrame(drift);
    }
    move(pos.x, pos.y); // lupa czeka na użytkownika, bez samoczynnego ruchu
    svg.setAttribute('tabindex', '0');
    svg.addEventListener('pointermove', function (e) { stop(); var p = toSvg(e); move(p.x, p.y); });
    svg.addEventListener('pointerdown', function (e) { stop(); var p = toSvg(e); move(p.x, p.y); });
    svg.addEventListener('keydown', function (e) {
      var d = e.shiftKey ? 40 : 15;
      var k = { ArrowLeft: [-d, 0], ArrowRight: [d, 0], ArrowUp: [0, -d], ArrowDown: [0, d] }[e.key];
      if (!k) return;
      e.preventDefault(); stop(); move(pos.x + k[0], pos.y + k[1]);
    });
  }

  // ---------- Linia kroków ----------
  var stepLine = document.querySelector('[data-steps]');
  if (stepLine) {
    var items = stepLine.querySelectorAll('li');
    var ticking = false;
    function update() {
      ticking = false;
      var r = stepLine.getBoundingClientRect();
      var vh = window.innerHeight;
      var p = Math.max(0, Math.min(1, (vh * 0.7 - r.top) / r.height));
      stepLine.style.setProperty('--p', reduce ? 1 : p.toFixed(3));
      items.forEach(function (li) {
        var lr = li.getBoundingClientRect();
        li.classList.toggle('is-on', reduce || lr.top < vh * 0.7);
      });
    }
    window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  }

  // ---------- Szukajka w cenniku ----------
  var search = document.querySelector('[data-price-search]');
  if (search) {
    var input = search.querySelector('input');
    var noRes = search.querySelector('.price-search__empty');
    var groups = document.querySelectorAll('.price-group');
    groups.forEach(function (g) {
      g.querySelectorAll('.price-list li, h2').forEach(function (el) { el.dataset.text = el.textContent.toLowerCase(); });
    });
    var timer;
    var initialQ = new URLSearchParams(location.search).get('q');
    setTimeout(function () { if (initialQ) { input.value = initialQ; input.dispatchEvent(new Event('input')); } });
    input.addEventListener('input', function () {
      var q = input.value.trim().toLowerCase();
      var any = false;
      groups.forEach(function (g) {
        var head = g.querySelector('h2').dataset.text.indexOf(q) !== -1;
        var shown = 0;
        g.querySelectorAll('.price-list li').forEach(function (li) {
          var hit = !q || head || li.dataset.text.indexOf(q) !== -1;
          li.classList.toggle('is-hidden', !hit);
          if (hit) shown++;
        });
        g.classList.toggle('is-hidden', shown === 0);
        if (shown) any = true;
      });
      noRes.hidden = any;
      var url = new URL(location.href);
      if (q) url.searchParams.set('q', q); else url.searchParams.delete('q');
      history.replaceState(null, '', url);
      clearTimeout(timer);
      if (q) timer = setTimeout(function () { track('price_search', q); }, 800);
    });
  }

  // ---------- Podnawigacja usług: aktywna pozycja ----------
  var subnav = document.querySelector('[data-subnav]');
  if (subnav && 'IntersectionObserver' in window) {
    var links = {};
    subnav.querySelectorAll('a').forEach(function (a) { links[a.getAttribute('href').slice(1)] = a; });
    var active = null;
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var a = links[en.target.id];
        if (!a || a === active) return;
        if (active) active.classList.remove('is-active');
        a.classList.add('is-active');
        active = a;
        a.closest('ul').scrollTo({ left: a.parentNode.offsetLeft - 16, behavior: reduce ? 'auto' : 'smooth' });
      });
    }, { rootMargin: '-35% 0px -60% 0px' });
    Object.keys(links).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  }

  // ---------- Formularz w 3 krokach ----------
  function initWizard(wiz, opts) {
    opts = opts || {};
    wiz.classList.add('js-wizard');
    var chartCtl = wiz.querySelector('[data-chart]') ? initChart(wiz.querySelector('[data-chart]')) : { select: function () {}, clear: function () {} };
    var submitBtn = wiz.querySelector('button[type="submit"]');
    var submitLabel = submitBtn.textContent;
    var steps = wiz.querySelectorAll('.wizard__step');
    var bars = wiz.querySelectorAll('.wizard__progress li');
    var count = wiz.querySelector('.wizard__count');
    var summary = wiz.querySelector('[data-summary]');
    var done = wiz.querySelector('.wizard__done');
    var REASON = { przeglad: 'Przegląd', bol: 'Ból zęba', leczenie: 'Leczenie', dziecko: 'Wizyta dziecka', brak: 'Brakujący ząb', estetyka: 'Estetyka, wybielanie', inne: 'Inne' };
    var step = 1;
    function reason() { var r = wiz.querySelector('input[name="powod"]:checked'); return r ? r.value : 'przeglad'; }
    function needsTooth() { return reason() === 'bol' || reason() === 'leczenie'; }
    function zab() { return wiz.querySelector('input[name="zab"]').value; }
    var lekInput = wiz.querySelector('input[name="lekarz"]');
    function summaryText() {
      return 'Powód: ' + REASON[reason()] + (zab() ? ', ząb ' + zab() : '') + (lekInput && lekInput.value ? ', lekarz: ' + lekInput.value : '');
    }
    function show(n, focus) {
      step = n;
      steps.forEach(function (f) { f.classList.toggle('is-current', +f.getAttribute('data-step') === n); });
      var skip = !needsTooth();
      bars.forEach(function (li) {
        var k = +li.getAttribute('data-for');
        li.classList.toggle('is-current', k === n);
        li.classList.toggle('is-done', k < n);
        li.classList.toggle('is-skipped', k === 2 && skip);
      });
      var pos = n;
      count.textContent = 'Krok ' + n + ' z 3' + (skip && n === 3 ? ' (krok „Ząb” pominięty, nie dotyczy)' : '');
      if (n === 3) {
        summary.innerHTML = '';
        summary.appendChild(document.createTextNode(summaryText()));
        var change = document.createElement('button');
        change.type = 'button'; change.textContent = 'Zmień';
        change.addEventListener('click', function () { show(1, true); });
        summary.appendChild(change);
      }
      if (focus) {
        var lg = wiz.querySelector('.wizard__step.is-current legend');
        lg.setAttribute('tabindex', '-1'); lg.focus({ preventScroll: true });
        if (opts.scroller) opts.scroller.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
        else wiz.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
      }
      track('booking_step', String(pos));
    }
    wiz.addEventListener('click', function (e) {
      if (e.target.closest('[data-next]')) show(step === 1 && !needsTooth() ? 3 : step + 1, true);
      if (e.target.closest('[data-prev]')) show(step === 3 && !needsTooth() ? 1 : step - 1, true);
      if (e.target.closest('[data-skip]')) {
        wiz.querySelector('input[name="zab"]').value = '';
        chartCtl.clear();
        track('tooth_skip');
        show(3, true);
      }
    });
    var started = false;
    wiz.addEventListener('input', function () { if (!started) { started = true; track('form_start'); } });
    var checks = [
      { el: wiz.querySelector('#f-name'), err: wiz.querySelector('#f-name-err') },
      { el: wiz.querySelector('#f-phone'), err: wiz.querySelector('#f-phone-err') },
      { el: wiz.querySelector('input[name="consent"]'), err: wiz.querySelector('#consent-err'), row: wiz.querySelector('#consent-row') }
    ];
    function validate() {
      var first = null;
      checks.forEach(function (c) {
        var bad = !c.el.checkValidity();
        c.el.setAttribute('aria-invalid', String(bad));
        c.err.hidden = !bad;
        if (c.row) c.row.classList.toggle('has-error', bad);
        if (bad && !first) first = c.el;
      });
      return first;
    }
    checks.forEach(function (c) {
      c.el.addEventListener(c.el.type === 'checkbox' ? 'change' : 'blur', function () {
        if (c.el.getAttribute('aria-invalid') === 'true') validate();
      });
    });
    wiz.addEventListener('submit', function (e) {
      e.preventDefault();
      var first = validate();
      if (first) { first.focus(); track('form_error', first.name); return; }
      var btn = submitBtn;
      btn.setAttribute('aria-busy', 'true');
      btn.textContent = 'Wysyłanie…';
      setTimeout(function () {
        track('form_submit', reason());
        var name = wiz.querySelector('#f-name').value.trim();
        steps.forEach(function (f) { f.classList.remove('is-current'); });
        wiz.querySelector('.wizard__progress').hidden = true;
        count.hidden = true;
        wiz.querySelector('[data-out="thanks-name"]').textContent = name ? ', ' + name : '';
        wiz.querySelector('[data-out="done-summary"]').textContent = summaryText() + '. Telefon: ' + wiz.querySelector('#f-phone').value;
        done.hidden = false;
        done.focus();
      }, 700);
    });

    var OPIS = { bol: 'boli', ukruszony: 'ukruszony', przebarwiony: 'przebarwiony', kontrola: 'kontrola' };
    var noteEl = wiz.querySelector('#f-note');

    function reset() {
      wiz.reset();
      chartCtl.clear();
      if (lekInput) lekInput.value = '';
      checks.forEach(function (c) { c.el.removeAttribute('aria-invalid'); c.err.hidden = true; if (c.row) c.row.classList.remove('has-error'); });
      wiz.querySelector('.wizard__progress').hidden = false;
      count.hidden = false;
      done.hidden = true;
      submitBtn.removeAttribute('aria-busy');
      submitBtn.textContent = submitLabel;
      started = false;
    }

    // Dane z linku: ?powod=bol&zab=36&opis=ukruszony&lekarz=2
    function applyParams(params, focus) {
      var p = params.get('powod');
      var lek = params.get('lekarz');
      var opis = params.get('opis');
      var z = params.get('zab');
      var validZ = z && /^[1-4][1-8]$/.test(z);
      if (opis && OPIS[opis] && noteEl) noteEl.value = (validZ ? 'Ząb ' + z : 'Ząb z tyłu') + ': ' + OPIS[opis];
      // Prototyp: imiona lekarzy to placeholdery; w produkcji slug → imię z danych
      if (lek && /^[0-9]{1,2}$/.test(lek) && lekInput) lekInput.value = '[lekarz ' + lek + ']';
      if (validZ) { p = p || 'bol'; chartCtl.select(z); }
      var radio = p && wiz.querySelector('input[name="powod"][value="' + p + '"]');
      if (radio) { radio.checked = true; show(needsTooth() && !validZ ? 2 : 3, focus); }
      else show(1, focus);
    }

    return { reset: reset, applyParams: applyParams };
  }

  // Formularz w treści strony (kontakt.html)
  var inlineWiz = document.querySelector('main > section [data-wizard]');
  if (inlineWiz) initWizard(inlineWiz).applyParams(new URLSearchParams(location.search), false);

  // ---------- Okno zapisu (dialog) na pozostałych stronach ----------
  var dialog = document.querySelector('[data-booking]');
  if (dialog && typeof dialog.showModal === 'function') {
    var dialogWiz = initWizard(dialog.querySelector('[data-wizard]'), { scroller: dialog });
    function openBooking(href, label) {
      dialogWiz.reset();
      var url = new URL(href, location.href);
      dialogWiz.applyParams(url.searchParams, false);
      dialog.showModal();
      document.documentElement.classList.add('booking-open');
      dialog.scrollTop = 0;
      var lg = dialog.querySelector('.wizard__step.is-current legend');
      if (lg) { lg.setAttribute('tabindex', '-1'); lg.focus(); }
      track('booking_open', label || '');
    }
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a[href*="kontakt.html"][href*="#zapis"]');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      if (nav && nav.classList.contains('is-open')) toggle.click();
      openBooking(a.getAttribute('href'), a.getAttribute('data-label'));
    });
    dialog.querySelector('[data-close]').addEventListener('click', function () { dialog.close(); });
    dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); });
    dialog.addEventListener('close', function () {
      document.documentElement.classList.remove('booking-open');
      track('booking_close');
    });
  }
})();
