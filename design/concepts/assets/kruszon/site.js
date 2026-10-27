// Kruszon — wspólny skrypt podstron: palety, okruszki, przeloty ciastek, koszyk (pamiętany między stronami), menu, godziny.
(function () {
  var reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var store = { get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} } };

  // ---------- palety: przełącznik widoczny tylko przy ?pal w adresie ----------
  var PALS = { malina: "#e5446d", pistacja: "#8fb35a", lukier: "#8fb6dc", karmel: "#ef8a2a" };
  if (/[?&]pal=/.test(location.search)) {
    var sw = document.createElement("nav"); sw.className = "pal-switch"; sw.setAttribute("aria-label", "Palety kolorów");
    Object.keys(PALS).forEach(function (k) {
      var a = document.createElement("a"); a.href = "?pal=" + k + location.hash; a.style.background = PALS[k]; a.title = k; a.setAttribute("aria-label", "Paleta " + k);
      if (document.documentElement.dataset.pal === k) a.setAttribute("aria-current", "true");
      sw.appendChild(a);
    });
    document.body.appendChild(sw);
    // zachowaj paletę w linkach między podstronami
    document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(function (a) { var h = a.getAttribute("href"); a.setAttribute("href", h.replace(/(\.html)(#.*)?$/, "$1?pal=" + document.documentElement.dataset.pal + "$2")); });
  }

  // ---------- okruszki ----------
  document.querySelectorAll("[data-crumbs]").forEach(function (box, bi) {
    var n = +box.dataset.crumbs, html = "", cs = ["var(--crumb-a)", "var(--crumb-b)", "var(--soft)", "var(--crumb-b)"];
    for (var i = 0; i < n; i++) {
      var s = (i * 37 + bi * 11) % 100, x = (i * 53 + bi * 29) % 100, y = (i * 71 + bi * 17) % 100;
      html += '<svg aria-hidden="true" style="left:' + x + "%;top:" + y + "%;--s:" + (8 + (s % 22)) + "px;--c:" + cs[i % 4] + ";--rot:" + s * 3.6 + "deg;--k:" + (0.2 + (s % 7) / 10) + '"><use href="#cr' + (1 + (i % 3)) + '"/></svg>';
    }
    box.innerHTML = html;
  });

  // ---------- przeloty: data-fly="x0 y0 x1 y1 r0 r1" w % sekcji, środek obrazka jedzie po prostej ----------
  var flyers = [].slice.call(document.querySelectorAll("[data-fly]")).map(function (el) {
    var v = el.dataset.fly.split(/\s+/).map(Number);
    return { el: el, sec: el.closest("[data-fly-box], section, .flight") || el.parentElement, v: v };
  });
  function place(f, p) {
    var r = f.sec.getBoundingClientRect(), v = f.v, w = f.el.offsetWidth, h = f.el.offsetHeight;
    var x = (v[0] + (v[2] - v[0]) * p) / 100 * r.width - w / 2, y = (v[1] + (v[3] - v[1]) * p) / 100 * r.height - h / 2;
    var rot = v[4] + (v[5] - v[4]) * p;
    if (f.cx === undefined || reduce) { f.cx = x; f.cy = y; f.cr = rot; } else { f.cx += (x - f.cx) * 0.1; f.cy += (y - f.cy) * 0.1; f.cr += (rot - f.cr) * 0.1; }
    f.el.style.transform = "translate(" + f.cx.toFixed(1) + "px," + f.cy.toFixed(1) + "px) rotate(" + f.cr.toFixed(1) + "deg)";
  }

  // ---------- rozsypane drobiny: kawałki czekolady, kruszonki i pył cukru pudru ----------
  // data-scatter="czek:6 krusz:8 cukier:3" na pudełku bez tekstu; data-scatter-x="0-20,80-100" zawęża pas w poziomie.
  // Rozkład równomierny: pudełko dzielone na siatkę komórek, każdy kawałek trafia do innej komórki z losowym przesunięciem.
  // Ruch: paralaksa zależna od głębokości, obrót przy przewijaniu i powolne unoszenie się; wszystko wygładzane (inercja).
  var BITS = { czek: 9, krusz: 12 }, bits = [];
  document.querySelectorAll("[data-scatter]").forEach(function (box, bi) {
    var seed = bi * 97 + 13, R = function () { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
    var bands = (box.dataset.scatterX || "0-100").split(",").map(function (b) { return b.split("-").map(Number); });
    var span = bands.reduce(function (a, b) { return a + b[1] - b[0]; }, 0);
    var toX = function (u) { var acc = u * span; for (var k = 0; k < bands.length; k++) { var w = bands[k][1] - bands[k][0]; if (acc <= w) return bands[k][0] + acc; acc -= w; } return bands[bands.length - 1][1]; };
    var specs = box.dataset.scatter.split(/\s+/).map(function (x) { var kv = x.split(":"); return { kind: kv[0], n: +kv[1] }; });
    var total = specs.reduce(function (a, b) { return a + b.n; }, 0), ratio = Math.max(0.6, (box.offsetWidth * span / 100) / Math.max(1, box.offsetHeight));
    var cols = Math.max(1, Math.round(Math.sqrt(total * ratio))), rows = Math.ceil(total / cols), cells = [];
    for (var c = 0; c < cols * rows; c++) cells.push(c);
    for (var c2 = cells.length - 1; c2 > 0; c2--) { var r2 = Math.floor(R() * (c2 + 1)), t2 = cells[c2]; cells[c2] = cells[r2]; cells[r2] = t2; }
    var ci = 0, cell = function () { var c3 = cells[ci++ % cells.length]; return { x: toX(((c3 % cols) + 0.15 + R() * 0.7) / cols), y: 6 + ((Math.floor(c3 / cols) + 0.15 + R() * 0.7) / rows) * 88 }; };
    var layer = document.createElement("div"); layer.className = "scatter"; layer.setAttribute("aria-hidden", "true"); box.appendChild(layer);
    specs.forEach(function (sp) {
      for (var k = 0; k < sp.n; k++) {
        var pos = cell(), depth = 0.2 + R() * 0.8, el;
        if (sp.kind === "cukier") {
          el = document.createElement("div"); el.className = "dust"; var html = "";
          for (var d = 0; d < 80; d++) { var a = R() * Math.PI * 2, r = Math.pow(R(), 1.6) * 110, sz = 1 + R() * 2.8; html += '<i style="left:' + (Math.cos(a) * r).toFixed(1) + "px;top:" + (Math.sin(a) * r * 0.75).toFixed(1) + "px;width:" + sz.toFixed(1) + "px;height:" + sz.toFixed(1) + "px;opacity:" + (0.35 + R() * 0.6).toFixed(2) + '"></i>'; }
          el.innerHTML = html;
        } else {
          el = new Image(); el.alt = ""; el.className = "bit"; el.src = "assets/kruszon/gen/bits/" + sp.kind + "-" + (1 + Math.floor(R() * BITS[sp.kind])) + ".webp";
          el.style.width = ((sp.kind === "czek" ? 24 : 16) + depth * (sp.kind === "czek" ? 62 : 44)).toFixed(0) + "px";
          if (depth < 0.4) el.style.filter = "blur(" + ((0.4 - depth) * 6).toFixed(1) + "px) drop-shadow(0 6px 6px rgb(52 28 23 / .15))";
          el.style.zIndex = depth > 0.7 ? 2 : 0;
        }
        el.style.left = pos.x.toFixed(1) + "%"; el.style.top = pos.y.toFixed(1) + "%";
        layer.appendChild(el);
        bits.push({ el: el, box: box, depth: depth, rot: R() * 360, spin: (R() - 0.5) * 160, ph: R() * 6.28, sp: 0.4 + R() * 0.6, amp: 6 + depth * 14, cy: 0, cr: null });
      }
    });
  });
  // jedna pętla animacji: cel liczony z przewijania i czasu, pozycja dojeżdża do celu z wygładzeniem
  var running = false;
  function loop(now) {
    var vh = innerHeight, t = now / 1000, any = false;
    bits.forEach(function (b) {
      var r = b.box.getBoundingClientRect(); if (r.bottom < -300 || r.top > vh + 300) return; any = true;
      var p = Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height)));
      var ty = (r.top + r.height / 2 - vh / 2) * b.depth * -0.55 + (reduce ? 0 : Math.sin(t * b.sp + b.ph) * b.amp);
      var tr = b.rot + b.spin * p + (reduce ? 0 : Math.sin(t * b.sp * 0.7 + b.ph) * 8);
      if (b.cr === null) { b.cy = ty; b.cr = tr; } else { b.cy += (ty - b.cy) * 0.09; b.cr += (tr - b.cr) * 0.09; }
      b.el.style.transform = "translate3d(0," + b.cy.toFixed(1) + "px,0) rotate(" + b.cr.toFixed(1) + "deg)";
    });
    requestAnimationFrame(loop);
  }
  function placeBits() {}
  if (bits.length) requestAnimationFrame(loop);
  var ticking = false;
  function frame() {
    ticking = false;
    var vh = innerHeight;
    document.documentElement.style.setProperty("--sy", (scrollY * 0.25).toFixed(1));
    placeBits();
    flyers.forEach(function (f) {
      var r = f.sec.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      place(f, Math.min(1, Math.max(0, (vh - r.top) / (vh + r.height))));
    });
  }
  if (reduce) flyers.forEach(function (f) { place(f, 0.5); });
  else { (function tick() { frame(); requestAnimationFrame(tick); })(); }

  // ---------- liczby rosną ----------
  document.querySelectorAll("[data-countup]").forEach(function (cu) {
    if (reduce || !("IntersectionObserver" in window)) return;
    var target = +cu.dataset.countup, fmt = cu.dataset.plain ? String : function (n) { return n.toLocaleString("pl-PL"); };
    new IntersectionObserver(function (en, o) {
      if (!en[0].isIntersecting) return; o.disconnect();
      var t0 = performance.now();
      (function step(now) { var p = Math.min(1, (now - t0) / 1400), e = 1 - Math.pow(1 - p, 3); cu.textContent = fmt(Math.round(target * e)); if (p < 1) requestAnimationFrame(step); })(t0);
    }, { threshold: 0.4 }).observe(cu);
  });

  // ---------- menu na telefonie ----------
  var mb = document.querySelector("[data-menu-btn]"), sheet = document.querySelector("[data-sheet]");
  if (mb && sheet) {
    var setM = function (o) { sheet.toggleAttribute("data-open", o); mb.setAttribute("aria-expanded", String(o)); document.documentElement.style.overflow = o ? "hidden" : ""; };
    mb.addEventListener("click", function () { setM(true); sheet.querySelector(".close").focus(); });
    sheet.querySelector(".close").addEventListener("click", function () { setM(false); mb.focus(); });
    sheet.addEventListener("click", function (e) { if (e.target.closest("a")) setM(false); });
  }

  // ---------- witryna ----------
  var P = window.KRUSZON_PRODUCTS = [
    { id: "sernik", k: "torty", n: "Sernik z kruszonką", w: "kawałek 0,15 kg", p: 10, img: "sernik.webp", badge: "Hit", d: "Na twarogu z Łowicza, na kruchym spodzie, z grubą warstwą maślanej kruszonki.", al: "mleko, jaja, gluten" },
    { id: "truskawkowy", k: "torty", n: "Tort truskawkowy", w: "kawałek 0,16 kg", p: 14, img: "tort-truskawkowy.webp", badge: "Nowość", d: "Biszkopt, śmietanka, prażone truskawki w środku i świeże na wierzchu.", al: "mleko, jaja, gluten" },
    { id: "czekoladowy", k: "torty", n: "Tort czekoladowy", w: "kawałek 0,16 kg", p: 14, img: "tort-czekoladowy.webp", d: "Trzy warstwy biszkoptu kakaowego, krem czekoladowy i lustrzana polewa.", al: "mleko, jaja, gluten, soja" },
    { id: "babka", k: "torty", n: "Babka marmurkowa", w: "cała, 0,8 kg", p: 36, img: "babka.webp", d: "Waniliowo-kakaowa, wilgotna, oprószona cukrem pudrem.", al: "gluten, mleko, jaja" },
    { id: "kremowka", k: "ciastka", n: "Kremówka", w: "1 szt., 0,14 kg", p: 9, img: "kremowka.webp", badge: "Hit", d: "Ciasto francuskie na maśle i krem budyniowy z prawdziwą wanilią.", al: "gluten, mleko, jaja" },
    { id: "tartaletka", k: "ciastka", n: "Tartaletka z truskawkami", w: "1 szt., 0,12 kg", p: 13, img: "tartaletka.webp", d: "Kruchy spód, krem waniliowy, truskawki i siekane pistacje.", al: "gluten, mleko, jaja, pistacje" },
    { id: "makaroniki", k: "ciastka", n: "Makaroniki", w: "3 szt.: malina, pistacja, wanilia", p: 16, img: "makaroniki.webp", badge: "Nowość", d: "Z mąki migdałowej, nadziewane konfiturą, kremem pistacjowym i waniliowym.", al: "migdały, pistacje, jaja, mleko" },
    { id: "paczek", k: "paczki", n: "Pączek z różą", w: "1 szt., 0,09 kg", p: 4.5, img: "paczek.webp", badge: "Hit", d: "Z konfiturą z płatków róży gotowaną latem, w cukrze pudrze.", al: "gluten, mleko, jaja" },
    { id: "przekroj", k: "paczki", n: "Pączek z konfiturą", w: "1 szt., 0,09 kg", p: 5, img: "paczek-przekroj.webp", d: "Z konfiturą wiśniową, nadziewany ręcznie, dużo nadzienia.", al: "gluten, mleko, jaja" },
    { id: "drozdzowka", k: "paczki", n: "Drożdżówka z kruszonką", w: "1 szt., 0,12 kg", p: 6.5, img: "drozdzowka.webp", d: "Nasza nazwa w jednym ciastku: dużo kruszonki, mało ciasta.", al: "gluten, mleko, jaja" },
  ];
  var zl = window.KRUSZON_ZL = function (v) { return (Math.round(v * 100) / 100).toLocaleString("pl-PL", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 }) + " zł"; };
  var CAT = { torty: "Ciasta i torty", ciastka: "Ciastka", paczki: "Pączki i drożdżowe" };
  var cart = {}; try { cart = JSON.parse(store.get("kruszon-cart") || "{}") || {}; } catch (e) {}

  document.querySelectorAll("[data-products]").forEach(function (list) {
    var lim = +list.dataset.limit || 99, cat = list.dataset.cat, full = list.hasAttribute("data-full");
    P.filter(function (x) { return !cat || x.k === cat; }).slice(0, lim).forEach(function (x) {
      var li = document.createElement("li"); li.className = "prod"; li.dataset.k = x.k;
      li.innerHTML = (x.badge ? '<span class="badge">' + x.badge + "</span>" : "") +
        '<div class="ph"><img class="cut" src="assets/kruszon/gen/' + x.img + '" alt="' + x.n + '" loading="lazy"></div>' +
        '<p class="k">' + CAT[x.k] + "</p><h3>" + x.n + '</h3><p class="w">' + x.w + "</p>" +
        (full ? '<p class="d">' + x.d + '</p><p class="al">Alergeny: ' + x.al + "</p>" : "") +
        '<div class="bot"><span class="pr">' + zl(x.p) + '</span><button type="button" class="add" aria-label="Dodaj do koszyka: ' + x.n + '"><svg aria-hidden="true"><use href="#cart"/></svg></button></div>';
      li.querySelector(".add").addEventListener("click", function (e) { add(x.id, 1); var b = e.currentTarget; b.classList.add("ok"); setTimeout(function () { b.classList.remove("ok"); }, 900); });
      list.appendChild(li);
    });
  });
  var fwrap = document.querySelector("[data-filters]");
  if (fwrap) {
    var fbtn = fwrap.querySelectorAll("button");
    var filter = function (f) { fbtn.forEach(function (b) { b.setAttribute("aria-pressed", String(b.dataset.f === f)); }); document.querySelectorAll("[data-products] .prod").forEach(function (li) { li.hidden = f !== "all" && li.dataset.k !== f; }); };
    fbtn.forEach(function (b) { b.addEventListener("click", function () { filter(b.dataset.f); history.replaceState(null, "", "#" + b.dataset.f); }); });
    var h = location.hash.slice(1); if (CAT[h]) filter(h);
  }

  var lines = document.querySelector("[data-lines]"), totalEl = document.querySelector("[data-total]"), count = document.querySelector("[data-count]"), cbtn = document.querySelector("[data-cart-open]");
  function add(id, d) { cart[id] = Math.max(0, (cart[id] || 0) + d); if (!cart[id]) delete cart[id]; store.set("kruszon-cart", JSON.stringify(cart)); render(); if (d > 0 && cbtn) { cbtn.classList.remove("pop"); void cbtn.offsetWidth; cbtn.classList.add("pop"); } }
  function render() {
    if (!lines) return;
    var tot = 0, n = 0; lines.innerHTML = "";
    Object.keys(cart).forEach(function (id) {
      var x = P.find(function (p) { return p.id === id; }); if (!x) return; var q = cart[id]; tot += q * x.p; n += q;
      var li = document.createElement("li");
      li.innerHTML = '<img src="assets/kruszon/gen/' + x.img + '" alt=""><div><b>' + x.n + "</b><small>" + zl(x.p) + ' / szt.</small></div><div class="qty"><button type="button" aria-label="Mniej">−</button><span>' + q + '</span><button type="button" aria-label="Więcej">+</button></div>';
      var bs = li.querySelectorAll("button"); bs[0].addEventListener("click", function () { add(id, -1); }); bs[1].addEventListener("click", function () { add(id, 1); });
      lines.appendChild(li);
    });
    totalEl.textContent = zl(tot); count.textContent = n; document.querySelector("[data-empty]").hidden = n > 0; document.querySelector("[data-msg]").textContent = "";
  }
  var drawer = document.querySelector("[data-drawer]"), scrim = document.querySelector("[data-scrim]");
  if (drawer) {
    var open = function (o) { drawer.toggleAttribute("data-open", o); scrim.toggleAttribute("data-open", o); drawer.setAttribute("aria-hidden", String(!o)); if (o) drawer.querySelector(".x").focus(); };
    cbtn.addEventListener("click", function () { open(true); });
    drawer.querySelector("[data-cart-close]").addEventListener("click", function () { open(false); cbtn.focus(); });
    scrim.addEventListener("click", function () { open(false); });
    addEventListener("keydown", function (e) { if (e.key === "Escape" && drawer.hasAttribute("data-open")) { open(false); cbtn.focus(); } });
    drawer.querySelector("[data-checkout]").addEventListener("click", function () {
      var m = drawer.querySelector("[data-msg]");
      if (!Object.keys(cart).length) { m.textContent = "Najpierw dodaj coś do koszyka."; return; }
      m.textContent = "Odłożone na dziś: " + drawer.querySelector("[data-pick]").value + ". Podaj przy ladzie numer K-" + (100 + Math.floor(Math.random() * 900)) + ".";
      cart = {}; store.set("kruszon-cart", "{}"); setTimeout(render, 2600);
    });
    render();
  }

  // ---------- czy cukiernia jest otwarta ----------
  var now = new Date(), wd = (now.getDay() + 6) % 7, hh = now.getHours() + now.getMinutes() / 60;
  document.querySelectorAll("[data-shop]").forEach(function (el) {
    var d = el.dataset.shop.split(",")[wd], s = el.querySelector("span");
    if (d === "closed") { s.textContent = "Dziś zamknięte"; return; }
    var a = d.split("-").map(Number);
    if (hh >= a[0] && hh < a[1]) { el.setAttribute("data-on", ""); s.textContent = "Otwarte do " + a[1] + ":00"; }
    else s.textContent = hh < a[0] ? "Dziś otwieramy o " + a[0] + ":00" : "Już zamknięte, jutro od rana";
  });
})();
